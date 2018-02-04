const tone = require('tone');
TESTER = document.getElementById('tester');

//funciones para el ploteo
let xpos = [];
let ypos = [];
fs = 48000;
ts = 1 / fs;

//get the sginal type to plot
document.getElementById('plot-button').addEventListener('click', function () {
    let signalType = document.getElementById('signal-selector').value;
    let freq = document.getElementById('freq-selector').value; 
    ypos=[];
    //choose the signal
    switch (signalType) {
        case 'sine':
            generateSine(freq);
            break;
        case 'cosine':
            generateCosine(freq);
            break;
        default:
            break;
    }
    //plot the generated points
    Plotly.purge(TESTER);
    Plotly.newPlot(TESTER, [{
        x: xpos,
        y: ypos
    }], {
        margin: {
            t: 0
        }
    });

});






/*oscilador*/
//var osc = new tone.Oscillator(440, "sine").toMaster();
///









//graficar senos y cosenos




function generateSine(freq) {
    for (let i = 0; i <= 1; i = i + ts) {
        ypos.push(Math.sin(2 * Math.PI * i * freq));
        xpos.push(i);
    }
}
function generateCosine(freq) {
    for (let i = 0; i <= 1; i = i + ts) {
        ypos.push(Math.cos(2 * Math.PI * i * freq));
        xpos.push(i);
    }
}