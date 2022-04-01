/*
By: Brendan Luke
Date: March 30, 2022
Scope: FFT & Audio capture for guitar practice tool
*/

function FFT(audioChunk) {
    // initialize real output
    var real = new Array(parseInt(audioChunk.length/2)).fill(0);

    // perform DFT
    for (k = 0; k < parseInt(audioChunk.length/2); k++) {
        for (n = 0; n < audioChunk.length; n++) {
            real[k] = real[k] + Math.abs(Math.cos(2*Math.PI/audioChunk.length*k*n));
        } 
    }
    return real
}

// Test:
var n = 4096;
var y = new Array(n).fill(0);
var A = 3500;
var B = 220;
var C = 5900;
var fs = 48000; // sampling frequency (Hz)
var i = 0;

for (k = 0; k < n; k++) {
    y[k] = Math.sin(2*Math.PI*A*k/fs) + Math.sin(2*Math.PI*B*k/fs) + Math.sin(2*Math.PI*C*k/fs);
}

result = FFT(y);
var idx = y.reduce((a,b,i) => a[0] < b ? [b,i] : a, [Number.MIN_VALUE,-1]); // max y
console.log(idx);
console.log(idx[1]/n*fs);

function createChart(outData) {
    var ctx = document.getElementById('chart').getContext('2d');
    var freqs = [];
    for (i = 0; i < n; i++) {
        freqs[i] = "";
    }
    //console.log(freqs)
    //var freqs = Array.from(Array(n/2).keys());
    var myChart = new Chart(ctx, {
        type: 'line',
        //labels: [""],
        labels: freqs,
        data: {
            datasets: [{
                label: 'Gains',
                data: outData,
                backgroundColor: '#0D5198',
                borderColor: '#0D5198',
                borderWidth: 1.5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    ticks: {
                        display: false
                    }
                },
                y: {
                    type: 'logarithmic'
                }
            },
            plugins:{   
                legend: {
                    display: false
                }
            }
        },
        plugins: [plugin],
    });

    myChart.update();
    //console.log(myChart.data);
};

const plugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

function buttonForce() {
    createChart(result);
    let blobFile = new Blob([y], {type: 'text/plain'}); // creates new blob data type from 'csvString' string variable
    // below creates file and downloads it to user's computer
    var a = document.createElement("a"),
    url = URL.createObjectURL(blobFile);
    a.href = url;
    a.download = "Test.txt";
    document.body.appendChild(a);
    a.click();
    //setTimeout(console.log(myChart),2000);
};