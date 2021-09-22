/*
By: Brendan Luke
Date: September 21, 2021
Scope: note generation functions for guitar practice tool
*/

function SingleNote() {
    var string = Math.floor(Math.random() * 6); // which string note is on
    var fret = Math.floor(Math.random() * 15); // which fret note is on
    fretBoard = ["-------------","-------------","-------------","-------------","-------------","-------------"];
    if (fret > 9) { // add tab to fretboard
        fretBoard[string] = ("------").concat(fret,"-----");
    } else {
        fretBoard[string] = ("------").concat(fret,"------");
    }
    document.getElementById("tab").innerHTML = fretBoard[0].concat("<br>",fretBoard[1],"<br>",fretBoard[2],...
    "<br>",fretBoard[3],"<br>",fretBoard[4],"<br>",fretBoard[5]); // add fretboard to page
}

function MultiNote() {
    var numNotes = document.getElementById('numNotes').value; // input value
    if (parseInt(numNotes) > 7) { // too big input
        alert("Input number too large! (Max 7)");
    } else if (numNotes === "") { // empty input
        alert("No input number! (Max 7)");
    } else if (parseInt(numNotes) === 1) {
        SingleNote(); // just call SingleNote if numNotes is 1
    } else { // input between 2 and 7
        var string = new Array(parseInt(numNotes)); // which string note is on Array
        var fret = new Array(parseInt(numNotes)); // which fret note is on Array
        var stringCount = new Array(0,0,0,0,0,0); // count of notes on each string
        //fretBoard = ["-------------","-------------","-------------","-------------","-------------","-------------"]; // initialize fretboard

        for (i = 0; i < parseInt(numNotes)-1; i++) {
            string[i] = Math.floor(Math.random() * 6); // which string note is on
            fret[i] = Math.floor(Math.random() * 15); // which fret note is on
            stringCount[string[i]] = stringCount[string[i]] + 1; // count of notes on each string      
        }
    }
}

// which characters to place notes in (zero indexed)
const placementMask = [[5,7],             // 2 notes
                       [4,6,8],         // 3 notes
                       [3,5,7,9],       // 4 notes
                       [2,4,6,8,10],     // 5 notes
                       [1,3,5,7,9,11],   // 6 notes
                       [0,2,4,6,8,10,12]];  // 7 notes

var update = setInterval(SingleNote, 2000);

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