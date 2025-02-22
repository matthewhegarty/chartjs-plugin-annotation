module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100
        },
        y: {
          display: true,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            l0: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '0%',
                backgroundColor: 'black',
                content: '0%',
                enabled: true
              }
            },
            l1: {
              type: 'line',
              scaleID: 'y',
              value: 10,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '10%',
                backgroundColor: 'black',
                content: '10%',
                enabled: true
              }
            },
            l2: {
              type: 'line',
              scaleID: 'y',
              value: 20,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '20%',
                backgroundColor: 'black',
                content: '20%',
                enabled: true
              }
            },
            l3: {
              type: 'line',
              scaleID: 'y',
              value: 30,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '30%',
                backgroundColor: 'black',
                content: '30%',
                enabled: true
              }
            },
            l4: {
              type: 'line',
              scaleID: 'y',
              value: 40,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '40%',
                backgroundColor: 'black',
                content: '40%',
                enabled: true
              }
            },
            l5: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '50%',
                backgroundColor: 'black',
                content: '50%',
                enabled: true
              }
            },
            l6: {
              type: 'line',
              scaleID: 'y',
              value: 60,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '60%',
                backgroundColor: 'black',
                content: '60%',
                enabled: true
              }
            },
            l7: {
              type: 'line',
              scaleID: 'y',
              value: 70,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '70%',
                backgroundColor: 'black',
                content: '70%',
                enabled: true
              }
            },
            l8: {
              type: 'line',
              scaleID: 'y',
              value: 80,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '80%',
                backgroundColor: 'black',
                content: '80%',
                enabled: true
              }
            },
            l9: {
              type: 'line',
              scaleID: 'y',
              value: 90,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '90%',
                backgroundColor: 'black',
                content: '90%',
                enabled: true
              }
            },
            l10: {
              type: 'line',
              scaleID: 'y',
              value: 100,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '100%',
                backgroundColor: 'black',
                content: '100%',
                enabled: true
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
