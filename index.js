/**@type Float32Array */
var micro_buffer = [];
var loaded = false;
var elements_loaded = 0;
var max_element_loaded = 1;

var CONSTANTS = {
    VIEW_SELECT: 1,
    VIEW_CHAPTER: 2,
    CHAPTER_1: 3,
    CHAPTER_2: 4,
    CHAPTER_3: 5,
    CHAPTER_4: 6,
    RUNNING: 1,
    HIDER_X_TRANSITION: "left 1000ms linear, width 1000ms linear",
    HIDER_Y_TRANSITION: "none",
    DIALOG_TEXT_HEIGHT: 23,
    ANIMATION_DELAY: 210
};

var PARAMETERS = {
    FULLSCREEN: false
}

var SOUNDS = {
    CHAPTER_1: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_2: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_3: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
    CHAPTER_4: {
        NARATIVE: null,
        BACKGROUND: null,
        EFFECT_INDEX: 0,
        EFFECTS: []
    },
}

loadRessources();
window.onload = () => {
    setChoicesEnabled(false);
    //startAudioStream();
    changeViewTo(CONSTANTS.VIEW_SELECT);
}

window.addEventListener("keydown", ev => {
    if (!PARAMETERS.FULLSCREEN)
        openFullscreen(document.body);
    console.log("UwU: "+ev.key)
})

window.addEventListener("mousedown", ev => {
    if (!PARAMETERS.FULLSCREEN)
        openFullscreen(document.body);
})

/**
 * Change l'état de ma fenetre des choix
 * @param {boolean} state état de la fenetre des choix (true: ouverte, false: fermée)
 */
function setChoicesEnabled(state, title="Question", left="Choix 1", right="Choix 2") {
    let choicesDiv = document.getElementById("choices-container")
    if (state) {
        choicesDiv.style.display = "block";
        setTimeout(() => {
            choicesDiv.style.opacity = "1";
            choicesDiv.style.transform = "scale(1)";
        }, 20);
        document.getElementById("choices-title").innerHTML = title;
        document.getElementById("choices-left").innerHTML = left;
        document.getElementById("choices-right").innerHTML = right;
    } else {
        choicesDiv.style.opacity = "0";
        choicesDiv.style.transform = "scale(2)";
        setTimeout(()=>{choicesDiv.style.display = "none";}, 210);
    }
}

/**
 * Change l'état de ma fenetre des choix
 * @param {number} view_number état de la fenetre des choix (true: ouverte, false: fermée)
 */
function changeViewTo(view_number, chapter=0) {
    let selectDiv = document.getElementById("select-container");
    let chaptersDiv = document.getElementById("chapters-container");
    stopSounds()
    clearChapterEvents();
    switch (view_number) {
        case CONSTANTS.VIEW_CHAPTER:
            chaptersDiv.style.opacity = "1";
            chaptersDiv.style.transform = "scale(1)";
            selectDiv.style.opacity = "0";
            selectDiv.style.transform = "scale(0)";
            switch (chapter) {
                case CONSTANTS.CHAPTER_1:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_1;
                    loadChapter(1);
                    break;
                case CONSTANTS.CHAPTER_2:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_2;
                    loadChapter(2);
                    break;
                case CONSTANTS.CHAPTER_3:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_3;
                    loadChapter(3);
                    break;
                case CONSTANTS.CHAPTER_4:
                    CONSTANTS.RUNNING = CONSTANTS.CHAPTER_4;
                    loadChapter(4);
                    break;
            
                default:
                    break;
            }
            break;

        case CONSTANTS.VIEW_SELECT:
            CONSTANTS.RUNNING = CONSTANTS.VIEW_SELECT;
            selectDiv.style.opacity = "1";
            selectDiv.style.transform = "scale(1)";
            chaptersDiv.style.opacity = "0";
            chaptersDiv.style.transform = "scale(2)";
            break;

        default:
            break;
    }
}

function playSound(path="") {
    let a = new Audio()
    a.src = path;
    a.play();
}

function startAudioStream() {
    navigator.getUserMedia = navigator.getUserMedia ||     
    navigator.webkitGetUserMedia ||     
    navigator.mozGetUserMedia ||     
    navigator.msGetUserMedia;    
    navigator.getUserMedia({audio: true},     
    function (e) {
        // creates the audio context  
        window.AudioContext = window.AudioContext || window.webkitAudioContext;     
        context = new AudioContext();
        
        // creates an audio node from the microphone incoming stream
        mediaStream = context.createMediaStreamSource(e);
        
        var bufferSize = 2048;
        var numberOfInputChannels = 1;
        var numberOfOutputChannels = 1;
        if (context.createScriptProcessor) {
            recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        } else {
            recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        }
        recorder.onaudioprocess = function (e) {
            micro_buffer = new Float32Array(e.inputBuffer.getChannelData(0));
        }
        // we connect the recorder with the input stream
        mediaStream.connect(recorder);
        recorder.connect(context.destination);
    },
    function (e) {console.error(e);});
}

function getMicVolume() {
    let sum = 0;
    micro_buffer.forEach(sample => {sum += Math.abs(sample);});
    return sum / micro_buffer.length;
}

function stopSounds() {
    try {
        SOUNDS.CHAPTER_1.NARATIVE.pause();
        SOUNDS.CHAPTER_1.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_1.BACKGROUND.pause();
        SOUNDS.CHAPTER_1.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_1.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_2.NARATIVE.pause();
        SOUNDS.CHAPTER_2.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_2.BACKGROUND.pause();
        SOUNDS.CHAPTER_2.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_2.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_3.NARATIVE.pause();
        SOUNDS.CHAPTER_3.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_3.BACKGROUND.pause();
        SOUNDS.CHAPTER_3.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_3.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
    try {
        SOUNDS.CHAPTER_4.NARATIVE.pause();
        SOUNDS.CHAPTER_4.NARATIVE.currentTime = 0;
        SOUNDS.CHAPTER_4.BACKGROUND.pause();
        SOUNDS.CHAPTER_4.BACKGROUND.currentTime = 0;
        SOUNDS.CHAPTER_4.EFFECTS.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } catch (e) {}
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = true;
        });
    }
}
  
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen().then(()=>{
            PARAMETERS.FULLSCREEN = false;
        });
    }
}

function loadRessources() {
    max_element_loaded = 4;
    SOUNDS.CHAPTER_1.NARATIVE = new Audio("./resources/audio/chapter_1/narative.wav");
    SOUNDS.CHAPTER_1.NARATIVE.addEventListener("loadeddata", verifyLoading);
    let img = new Image(); img.src = "./resources/images/select/background.png";
    img.addEventListener("load", ()=>{
        document.getElementById("select-background").style.backgroundImage = "url(./resources/images/select/background.png)";
        verifyLoading();
    });
    img = new Image(); img.src = "./resources/images/select/foreground.png";
    img.addEventListener("load", ()=>{
        document.getElementById("select-foreground").style.backgroundImage = "url(./resources/images/select/foreground.png)";
        verifyLoading();
    });
    img = new Image(); img.src = "./resources/images/back.svg";
    img.addEventListener("load", ()=>{
        document.getElementById("back-button-div").style.backgroundImage = "url(./resources/images/back.svg)";
        verifyLoading();
    });
    animateLoading();
}

function verifyLoading() {
    elements_loaded++;
    document.getElementById("loading-bar-div").style.width = Math.round((elements_loaded/max_element_loaded)*100)+"%";
    console.log(document.getElementById("loading-bar-div").style.width)
    loaded = (elements_loaded == max_element_loaded);
}

function animateLoading() {
    try {
        document.getElementById("loading-text").style.transform = "translateY(10%)";
        setTimeout(() => {
            document.getElementById("loading-text").style.transform = "translateY(-10%)";
        }, 500);
    } catch (e) {}
    if (!loaded) setTimeout(animateLoading, 1000);
    else {
        try {
            document.getElementById("loading-page").style.left = window.innerWidth+"px";
            setTimeout(() => {
                document.getElementById("loading-page").style.display = "none";
            }, 200);
        } catch (e) {}
    }
}