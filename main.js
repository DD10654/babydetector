//Variables
status1 = "";
object = [];
alert1 = "";

//Basic Functions
function preload() {
    alert1 = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        for (i = 0; i < object.length; i++) {
            percent = floor(object[i].confidence * 100);
            var d = random(100, 255);
            var e = random(100, 255);
            var f = random(100, 255);
            fill(d, e, f);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(d, e, f);
            strokeWeight(4);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label != "person") {
                play(alert1);
            }
        }
    }
}

// JS Code

function modelLoaded() {
    console.log("Model Loaded!")
    status1 = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    object = result;
}