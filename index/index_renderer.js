const tone = require('tone');
TESTER = document.getElementById('tester');

/*VOY A TITULAR A ESTE SCRIPT "COMO REESCRIBIR TODAS LAS FUNCIONES QUE TIENE HECHAS MATLAB Y COMO LAS 
ECHAS DE MENOS CUANDO LAS TIENES QUE HACER TODAS A MANO..."*/

//funciones para el ploteo

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
    let xpos = [];
    let ypos = [];
    for (let i = 0; i < toolbars.length; i++) {
        let tempx = [];
        let tempy = [];
        let signal = [];
        console.log(toolbars[i].getElementsByClassName('signal-selector')[0].value)
        console.log(toolbars[i].getElementsByClassName('freq-selector')[0].value)
        signalType = toolbars[i].getElementsByClassName('signal-selector')[0].value;
        freq = toolbars[i].getElementsByClassName('freq-selector')[0].value

        //see if sine or cosine
        switch (signalType) {
            case 'seno':
                generateSine(freq, tempx, tempy);
                break;
            case 'cosine':
                generateCosine(freq);
                break;
            default:
                break;
        }
        ypos = addSignal(ypos, tempy);
        xpos = tempx;

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









function addSignal(sa, sb) {
    total = [];
    if (sa.length == 0) {
        sa = sb;
        total = sa;
        console.log("vacio");

    } else {
        console.log("sumando");
        for (let i = 0; i < sb.length; i++) {
            sa[i] = sb[i] + sa[i];
        }
        total = sa;
    }

    return (total);
}



function generateSine(freq, xpos, ypos) {
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
    let toolbar = '<div class="toolbar">\
    <select class="signal-selector">\
        <option value="Seno" selected="selected">\
            <p>Seno</p>\
        </option>\
        <option value="Coseno">\
            <p>coseno</p>\
        </option>\
        <option value="Otro">\
            <p>otro</p>\
        </option>\
    </select>\
    <input class="freq-selector" type="number" name="freq(Hz)" />\
    <button class="btn btn-primary btn-sm delete-btn">x</button>\
    <!-- input(type="range", name="freqSlider",min="1",max="100")-->'

    let parentDiv = document.getElementById('selector');
    let div = document.createElement('div')
    div.className = 'toolbar'
    div.innerHTML = toolbar;
    parentDiv.appendChild(div);
}