/*
By: Brendan Luke
Date: March 31, 2022
Scope: note generation functions for guitar practice tool
*/

var numDashes = 21; // length of tab
var baseFret = Array(numDashes).fill('-').join(''); // can change number of dashs
var maxNotes = 8; // max # of notes for melody tab

function SingleNote() {
    var string = Math.floor(Math.random() * 6); // which string note is on
    var fret = Math.floor(Math.random() * 15); // which fret note is on

    fretBoard = [baseFret,baseFret,baseFret,baseFret,baseFret,baseFret];
    if (fret > 9) { // add note to tab
        fretBoard[string] = (Array((numDashes-1)/2).fill('-').join('')).concat(fret,Array((numDashes-1)/2-1).fill('-').join(''));
    } else {
        fretBoard[string] = (Array((numDashes-1)/2).fill('-').join('')).concat(fret,Array((numDashes-1)/2).fill('-').join(''));
    }
    document.getElementById("tab").innerHTML = fretBoard[0].concat("<br>",fretBoard[1],"<br>",fretBoard[2],...
    "<br>",fretBoard[3],"<br>",fretBoard[4],"<br>",fretBoard[5]); // add tab to page
}

function MultiNote() {
    var numNotes = document.getElementById('numNotes').value; // input value
    if (parseInt(numNotes) > maxNotes) { // too big input
        alert("Input number too large! (Max "+maxNotes.toString()+")");
    } else if (numNotes === "") { // empty input
        alert("No input number! (Max "+maxNotes.toString()+")");
    } else if (parseInt(numNotes) === 1) {
        SingleNote(); // just call SingleNote if numNotes is 1
    } else { // input between 2 and max
        var string = new Array(parseInt(numNotes)); // which string note is on Array
        var fret = new Array(parseInt(numNotes)); // which fret note is on Array

        // generate "melody"
        for (i = 0; i < parseInt(numNotes); i++) {
            string[i] = Math.floor(Math.random() * 6); // which string note is on
            fret[i] = Math.floor(Math.random() * 15); // which fret note is on     
        }

        // write to tab
        fretBoard = [baseFret,baseFret,baseFret,baseFret,baseFret,baseFret];
        for (i = 0; i < parseInt(numNotes); i++) {
            var idx = (i+1)*Math.floor(numDashes/(parseInt(numNotes)+1)); // index to put note on string line
            if (fret[i] > 9) { // add note to tab
                fretBoard[string[i]] = fretBoard[string[i]].substring(0,idx) + fret[i] + fretBoard[string[i]].substring(idx+2);
            } else {
                fretBoard[string[i]] = fretBoard[string[i]].substring(0,idx) + fret[i] + fretBoard[string[i]].substring(idx+1);
            }
        }
        document.getElementById("tab").innerHTML = fretBoard[0].concat("<br>",fretBoard[1],"<br>",fretBoard[2],...
        "<br>",fretBoard[3],"<br>",fretBoard[4],"<br>",fretBoard[5]); // add tab to page
    }
}

/*
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
const microphone = context.createMediaStreamSource(stream);
const filter = context.createBiquadFilter();
// microphone -> filter -> destination
microphone.connect(filter);
filter.connect(context.destination);
});
*/