let {
    ipcRenderer,
    remote
} = require('electron');
let xpos;
let ypos;
ipcRenderer.on('input-received', (event, args) => {

    console.log('new window opened');

    TESTER = document.getElementById('tester');

    var timeTrace = {
        x: args.x,
        y: args.y,
        mode: 'lines'
    }

    var layout = {
        title: 'Dominio Temporal',
        xaxis: {
          title: 'Tiempo'
        },
        yaxis: {
          title: 'Amplitud'
        }
      };

    //plot the generated points
    Plotly.purge(TESTER);
    Plotly.newPlot(TESTER, [
       timeTrace
    ],layout);

});