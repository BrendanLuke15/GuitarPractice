/*
By: Brendan Luke
Date: September 21, 2021
Scope: note generation functions for guitar practice tool
*/

function SingleNote() {
    var string = Math.floor(Math.random() * 6); // which string note is on
    var fret = Math.floor(Math.random() * 15); // which fret note is on

    //console.log(string);

    fretBoard = ["-------------","-------------","-------------","-------------","-------------","-------------"];
    if (fret > 9) {
        fretBoard[string] = ("------").concat(fret,"-----");
    } else {
        fretBoard[string] = ("------").concat(fret,"------");
    }

    document.getElementById("tab").innerHTML = fretBoard[0].concat("<br>",fretBoard[1],"<br>",fretBoard[2],"<br>",fretBoard[3],"<br>",fretBoard[4],"<br>",fretBoard[5]);
}

function MultiNote() {
    var numNotes = document.getElementById('numNotes').value;
    if (parseInt(numNotes) > 7) {
        alert("Input number too large! (Max 7)");
    } else {
        var string = new Array(parseInt(numNotes)); // which string note is on Array
        var fret = new Array(parseInt(numNotes)); // which fret note is on Array

        for (i = 0; i < parseInt(numNotes)-1; i++) {
            string[i] = Math.floor(Math.random() * 6); // which string note is on
            fret[i] = Math.floor(Math.random() * 15); // which fret note is on                    
        }

        fretBoard = ["-------------","-------------","-------------","-------------","-------------","-------------"];


    }
    


    /*
    var string = Math.floor(Math.random() * 5); // which string note is on
    var fret = Math.floor(Math.random() * 14); // which fret note is on

    fretBoard = ["-------------","-------------","-------------","-------------","-------------","-------------"];
    fretBoard[string] = ("------").concat(fret,"------");

    document.getElementById("tab").innerHTML = fretBoard[0].concat("<br>",fretBoard[1],"<br>",fretBoard[2],"<br>",fretBoard[3],"<br>",fretBoard[4],"<br>",fretBoard[5]);
    */
}

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