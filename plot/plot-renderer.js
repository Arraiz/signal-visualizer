let {
    ipcRenderer,
    remote
} = require('electron');
let xpos;
let ypos;
ipcRenderer.on('input-received', (event, args) => {

    console.log('new window opened');

    //time domain plotting
    TESTER = document.getElementById('tester');
    TESTER_FREQ = document.getElementById('testerFreq');

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

    //freciancy domain plot
    let X = Array.from(Array(args.Y.length), (_,x) => x);
    console.log(X);
   
    args.Y.length
    var timeTrace2 = {
        x: X,
        y: args.Y,
        mode: 'lines'
    }

    var layout2 = {
        title: 'Dominio Frecuencia',
        xaxis: {
          title: 'Frecuencia',
          range: [0,500],
        
        },
        yaxis: {
          title: 'Amplitud'
        }
      };



    Plotly.purge(TESTER_FREQ);
    Plotly.newPlot(TESTER_FREQ, [
       timeTrace2
    ],layout2);
});