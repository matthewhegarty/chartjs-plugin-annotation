import {Chart} from 'chart.js';
import {clipArea, unclipArea, isObject, isArray} from 'chart.js/helpers';
import {handleEvent, hooks, updateListeners} from './events';
import {adjustScaleRange, verifyScaleOptions} from './scale';
import {updateElements, resolveType} from './elements';
import {annotationTypes} from './types';
import {requireVersion} from './helpers';
import {name, version} from '../package.json';

const chartStates = new Map();

export default {
  id: 'annotation',

  version,

  /* TODO: enable in v2
  beforeRegister() {
    requireVersion('chart.js', '3.7', Chart.version);
  },
  */

  afterRegister() {
    Chart.register(annotationTypes);

    // TODO: Remove this check, warning and workaround in v2
    if (!requireVersion('chart.js', '3.7', Chart.version, false)) {
      console.warn(`${name} has known issues with chart.js versions prior to 3.7, please consider upgrading.`);

      // Workaround for https://github.com/chartjs/chartjs-plugin-annotation/issues/572
      Chart.defaults.set('elements.lineAnnotation', {
        callout: {},
        font: {},
        padding: 6
      });
    }
  },

  afterUnregister() {
    Chart.unregister(annotationTypes);
  },

  beforeInit(chart) {
    chartStates.set(chart, {
      annotations: [],
      elements: [],
      visibleElements: [],
      listeners: {},
      listened: false,
      moveListened: false
    });
  },

  beforeUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    const annotations = state.annotations = [];

    let annotationOptions = options.annotations;
    if (isObject(annotationOptions)) {
      Object.keys(annotationOptions).forEach(key => {
        const value = annotationOptions[key];
        if (isObject(value)) {
          value.id = key;
          annotations.push(value);
        }
      });
    } else if (isArray(annotationOptions)) {
      annotations.push(...annotationOptions);
    }
    verifyScaleOptions(annotations, chart.scales);
  },

  afterDataLimits(chart, args) {
    const state = chartStates.get(chart);
    adjustScaleRange(chart, args.scale, state.annotations.filter(a => a.display && a.adjustScaleRange));
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
    state.visibleElements = state.elements.filter(el => !el.skip && el.options.display);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options.clip);
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options.clip);
  },

  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options.clip);
  },

  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options.clip);
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'pointX', 'pointY', 'labelX', 'labelY', 'labelWidth', 'labelHeight', 'radius'],
        type: 'number'
      },
    },
    clip: true,
    dblClickSpeed: 350, // ms
    drawTime: 'afterDatasetsDraw',
    label: {
      drawTime: null
    }
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop),
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[resolveType(opts.type)].id}`,
    },
  },

  additionalOptionScopes: ['']
};

function draw(chart, caller, clip) {
  const {ctx, chartArea} = chart;
  const {visibleElements} = chartStates.get(chart);

  if (clip) {
    clipArea(ctx, chartArea);
  }

  drawElements(ctx, visibleElements, caller);
  drawSubElements(ctx, visibleElements, caller);

  if (clip) {
    unclipArea(ctx);
  }

  visibleElements.forEach(el => {
    if (!('drawLabel' in el)) {
      return;
    }
    const label = el.options.label;
    if (label && label.enabled && label.content && (label.drawTime || el.options.drawTime) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

function drawElements(ctx, elements, caller) {
  for (const el of elements) {
    if (el.options.drawTime === caller) {
      el.draw(ctx);
    }
  }
}

function drawSubElements(ctx, elements, caller) {
  for (const el of elements) {
    if (isArray(el.elements)) {
      drawElements(ctx, el.elements, caller);
    }
  }
}
