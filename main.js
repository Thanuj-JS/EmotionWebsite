prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:400,
    height:325,
    image_format: 'png',
    png_quality:100
});

    camera = document.getElementById('camera');

Webcam.attach( '#camera' )

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+ data_uri +'"/>';
    });
}
    console.log("ml5.js version :", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LhsM5eo94/model.json', modelLoaded);

function modelLoaded()
{
    console.log("MODELLOADED");
}

function check(){
    image = document.getElementById('captured_image')
    classifier.classify(image, gotResult)
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }else{
        console.log(results)
        document.getElementById('r_e_m1').innerHTML = results[0].label
        document.getElementById('r_e_m2').innerHTML = results[1].label
        prediction_1 = results[0].label
        prediction_2 = results[1].label
        speak()

        if (results[0].label == 'Happy'){
            document.getElementById('update_emoji').innerHTML = "&#128522;"
        }
        if (results[0].label == 'Sad'){
            document.getElementById('update_emoji').innerHTML = "&#128532;"
        }
        if (results[0].label == 'Angry'){
            document.getElementById('update_emoji').innerHTML = '&#128545;'
        }
        
        if (results[1].label == 'Happy'){
            document.getElementById('update_emoji_2').innerHTML = "&#128522;"
        }
        if (results[1].label == 'Sad'){
            document.getElementById('update_emoji_2').innerHTML = "&#128532;"
        }
        if (results[1].label == 'Angry'){
            document.getElementById('update_emoji_2').innerHTML = '&#128545;'
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = 'The first prediction is' + prediction_1;
    speak_data_2 = 'The second prediction is' + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}