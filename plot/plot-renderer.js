let {
    ipcRenderer,
    remote
} = require('electron');

ipcRenderer.on('plot-info', function (event, args) {
    console.log(args);

    
})
/*
TESTER = document.getElementById('tester');

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