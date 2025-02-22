module.exports = {
  description: 'https://github.com/chartjs/chartjs-plugin-annotation/issues/589',
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            line: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: 'dynamic label',
                enabled: false
              },
              enter({chart, element}) {
                element.options.label.enabled = true;
                chart.draw();
              },
              leave({chart, element}) {
                element.options.label.enabled = false;
                chart.draw();
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true,
    async run(chart) {
      const el = window.getAnnotationElements(chart)[0];
      await window.triggerMouseEvent(chart, 'mousemove', el.getCenterPoint());
      await window.triggerMouseEvent(chart, 'mousemove', {x: 1, y: 1});
    }
  }
};
