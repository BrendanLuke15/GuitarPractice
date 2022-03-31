/*
By: Brendan Luke
Date: September 21, 2021
Scope: note generation functions for guitar practice tool
*/

var numDashes = 19; // length of tab
var baseFret = Array(numDashes).fill('-').join(''); // can change number of dashs

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
    if (parseInt(numNotes) > 6) { // too big input
        alert("Input number too large! (Max 6)");
    } else if (numNotes === "") { // empty input
        alert("No input number! (Max 6)");
    } else if (parseInt(numNotes) === 1) {
        SingleNote(); // just call SingleNote if numNotes is 1
    } else { // input between 2 and 6
        var string = new Array(parseInt(numNotes)); // which string note is on Array
        var fret = new Array(parseInt(numNotes)); // which fret note is on Array
        var stringCount = new Array(0,0,0,0,0,0); // count of notes on each string

        // generate "melody"
        for (i = 0; i < parseInt(numNotes); i++) {
            string[i] = Math.floor(Math.random() * 6); // which string note is on
            fret[i] = Math.floor(Math.random() * 15); // which fret note is on
            stringCount[string[i]] = stringCount[string[i]] + 1; // count of notes on each string      
        }
        console.log(string);
        console.log(fret);

        // write to tab
        fretBoard = [baseFret,baseFret,baseFret,baseFret,baseFret,baseFret];
        var stringIndex = new Array(1,1,1,1,1,1); // keep track of notes on each string
        for (i = 0; i < parseInt(numNotes); i++) {
            var idx = stringIndex[string[i]]*Math.floor(numDashes/(stringCount[string[i]]+1)); // index to put note on string line
            console.log(idx);
            if (fret[i] > 9) { // add note to tab
                fretBoard[string[i]] = fretBoard[string[i]].substring(0,idx-1) + fret[i] + fretBoard[string[i]].substring(0,idx+2);
            } else {
                fretBoard[string[i]] = fretBoard[string[i]].substring(0,idx-1) + fret[i] + fretBoard[string[i]].substring(0,idx+1);
            }
            stringIndex[string[i]] = stringIndex[string[i]] + 1; // increment string index
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