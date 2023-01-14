prediction1 = ""
prediction2 = ""

Webcam.attach('#camera');

Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90,
});


function takeSnapshot() {
    Webcam.snap(function (dataURI) {
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + dataURI + '"/>';
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NjzGytCiU/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}
function speak() {
    var synth = window.speechSynthesis;
    var data1 = "The first Prediction is" + prediction1;
    var data2 = "The second Prediction is" + prediction2;
    var utter = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utter);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("emotion1").innerHTML = prediction1;
        document.getElementById("emotion2").innerHTML = prediction2;

        speak();
        if (prediction1 == "happy") {
            document.getElementById("emoji1").innerHTML = "&#128522;";
        }
        if (prediction1 == "sad") {
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if (prediction1 == "angry") {
            document.getElementById("emoji1").innerHTML = "&#128545;";
        }


        if (prediction2 == "happy") {
            document.getElementById("emoji2").innerHTML = "&#128522;";
        }
        if (prediction2 == "sad") {
            document.getElementById("emoji2").innerHTML = "&#128532;";
        }
        if (prediction2 == "angry") {
            document.getElementById("emoji2").innerHTML = "&#128545;";
        }
    }
}