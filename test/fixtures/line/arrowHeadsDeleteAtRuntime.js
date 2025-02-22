module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: 0,
          max: 10
        },
        y: {
          display: true,
          min: 0,
          max: 10
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 8,
              yMax: 8,
              borderColor: 'blue',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove start'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.start;
                chart.draw();
              }
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 5,
              yMax: 5,
              borderColor: 'purple',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove end'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.end;
                chart.draw();
              }
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 2,
              yMax: 2,
              borderColor: 'red',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove start and end'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.start;
                delete element.options.arrowHeads.end;
                chart.draw();
              }
            }
          ]
        }
      }
    }
  },
  options: {
    spriteText: true,
    async run(chart) {
      const elements = window.getAnnotationElements(chart);
      await window.triggerMouseEvent(chart, 'click', elements[0].getCenterPoint());
      await window.triggerMouseEvent(chart, 'click', elements[1].getCenterPoint());
      await window.triggerMouseEvent(chart, 'click', elements[2].getCenterPoint());
    }
  }
};
