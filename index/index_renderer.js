const tone = require('tone');
TESTER = document.getElementById('tester');


var osc = new tone.Oscillator(440, "sine").toMaster();
console.log(osc.frequency)

//graficar senos y cosenos


Plotly.plot( TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], { 
    margin: { t: 0 } } );



