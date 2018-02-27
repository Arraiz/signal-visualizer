const Tone = require('tone');
let {
    ipcRenderer,
    remote
} = require('electron');
let main = remote.require("./main.js");
const ft = require('fourier-transform');

TESTER = document.getElementById('tester');

/*VOY A TITULAR A ESTE SCRIPT "COMO REESCRIBIR TODAS LAS FUNCIONES QUE TIENE HECHAS MATLAB Y COMO LAS 
ECHAS DE MENOS CUANDO LAS TIENES QUE HACER TODAS A MANO..."*/

//librosa python

//funciones para el ploteo

fs = 48000;
ts = 1 / fs;




//canal render->main r2m
ipcRenderer.send('r2m', 'test');


//add signals button
document.getElementById('add-graphic').addEventListener('click', function () {

    addToolbar();
    createDeleteBtns();
});




//for multiple plots

//delete signal in selection
let delete_btns = document.getElementsByClassName('delete-btn');
for (let i = 0; i < delete_btns.length; i++) {

    delete_btns[i].addEventListener('click', function () {

        delete_btns[i].parentElement.nodeName

    });
}


//get the play button for play tones
document.getElementById('play-button').addEventListener('click', function () {

    var osc = new Tone.Oscillator(440, "sine").toMaster().start();

});




//get the sginal type to plot
document.getElementById('plot-button').addEventListener('click', function () {

    let toolbars = document.getElementsByClassName('toolbar');

    let xpos = [];
    let ypos = [];
    let amplitud
    let fase_inicial
    let spectrum;

    for (let i = 0; i < toolbars.length; i++) {
        let tempx = [];
        let tempy = [];
        signalType = toolbars[i].getElementsByClassName('signal-selector')[0].value;
        freq = toolbars[i].getElementsByClassName('freq-selector')[0].value
        amplitud = toolbars[i].getElementsByClassName('amp-selector')[0].value;
        fase_inicial = toolbars[i].getElementsByClassName('phase-selector')[0].value;
        //see if sine or cosine
        switch (signalType) {
            case 'Seno':
                generateSine(freq, tempx, tempy, amplitud, fase_inicial);
                break;
            case 'Coseno':
                generateCosine(freq, tempx, tempy, amplitud, fase_inicial);
                break;
            default:
                break;
        }
        ypos = addSignal(ypos, tempy);
        //fftest
        //ajustar factor de escala        
        xpos = tempx;


    }
    //calculamos la FFT



    fillArray = new Array(65536 - fs).fill(0);
    let yposT = ypos.concat(fillArray);
    spectrum = ft(yposT);

    console.log(spectrum.length);
    console.log(spectrum);



    //enviamos los datos para una nueva grafica
    ipcRenderer.send('c1', {
        x: xpos,
        y: ypos,
        Y: spectrum
    });


});

function addSignal(sa, sb) {
    total = [];
    if (sa.length == 0) {
        sa = sb;
        total = sa;

    } else {
        for (let i = 0; i < sb.length; i++) {
            sa[i] = sb[i] + sa[i];
        }
        total = sa;
    }

    return (total);
}



function generateSine(freq, xpos, ypos, amplitud, fase_inicial) {
    for (let i = 0; i < 1 * fs; i = i + 1) {
        ypos.push(amplitud * Math.sin(2 * Math.PI * i * (freq / fs) + fase_inicial * Math.PI));
        xpos.push(i);
    }


}

function generateCosine(freq, xpos, ypos, amplitud, fase_inicial) {
    for (let i = 0; i < 1; i = i + ts) {
        ypos.push(amplitud * Math.cos(2 * Math.PI * i * freq + fase_inicial * Math.PI));

    }
}

function createDeleteBtns() {
    let delete_btns = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < delete_btns.length; i++) {
        delete_btns[i].addEventListener('click', function () {
            delete_btns[i].parentElement.parentElement.remove();
        });
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
    <input class="freq-selector" type="number" name="freq(Hz)" placeholder="Frecuencia en HZ"/>\
    <input class="amp-selector" type="number" name="Amplitude" placeholder="Amplitud"/>\
    <input class="phase-selector" type="number" name="fase inicial" placeholder="fase inicial"/>\
    <button class="btn btn-primary btn-sm delete-btn">x</button>'

    let parentDiv = document.getElementById('selector');
    let div = document.createElement('div')
    div.className = 'toolbar'
    div.innerHTML = toolbar;
    parentDiv.appendChild(div);
}