const tone = require('tone');
TESTER = document.getElementById('tester');

//funciones para el ploteo
let xpos = [];
let ypos = [];
fs = 48000;
ts = 1 / fs;

//continuar desde añadir mas de una funcion al plot (sumar funciones)

//add signals button
document.getElementById('add-graphic').addEventListener('click', function () {

    addToolbar();

});


//for multiple plots




//get the sginal type to plot
document.getElementById('plot-button').addEventListener('click', function () {

    let toolbars = document.getElementsByClassName('toolbar');
    console.log(toolbars);
    for (let i = 0; i < toolbars.length; i++) {
        console.log(toolbars[i].getElementsByClassName('signal-selector')[0].value)
        console.log(toolbars[i].getElementsByClassName('freq-selector')[0].value)
    }


    /*
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
    */

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


function addToolbar() {
    let toolbar = '<select class="signal-selector">\
<option value="sine">Seno</option>\
<option value="cosine">Coseno</option>\
<option value="other">Otro</option>\
</select>\
<input type="number" name="freq(Hz)" class="freq-selector">'

    let parentDiv = document.getElementById('selector');
    let div = document.createElement('div')
    div.className = 'toolbar'
    div.innerHTML = toolbar;
    parentDiv.appendChild(div);
}