var CONSTANTS = {
    VIEW_SELECT: 1,
    VIEW_CHAPTER: 2,
    CHAPTER_1: 3,
    CHAPTER_2: 4,
    CHAPTER_3: 5,
    CHAPTER_4: 6,
    HIDER_X_TRANSITION: "left 1200ms ease, width 1200ms ease",
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

window.onload = () => {
    loadRessources();
    setChoicesEnabled(false);
    changeViewTo(CONSTANTS.VIEW_SELECT);
}

window.addEventListener("keydown", ev => {
    if (!PARAMETERS.FULLSCREEN)
        openFullscreen(document.body);
    console.log(ev.key)
    if (ev.key == "Delete")
        changeViewTo(CONSTANTS.VIEW_SELECT);
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
    switch (view_number) {
        case CONSTANTS.VIEW_CHAPTER:
            chaptersDiv.style.opacity = "1";
            chaptersDiv.style.transform = "scale(1)";
            selectDiv.style.opacity = "0";
            selectDiv.style.transform = "scale(0)";
            switch (chapter) {
                case CONSTANTS.CHAPTER_1:
                    loadChapter(1);
                    break;
                case CONSTANTS.CHAPTER_2:
                    loadChapter(2);
                    break;
                case CONSTANTS.CHAPTER_3:
                    loadChapter(3);
                    break;
                case CONSTANTS.CHAPTER_4:
                    loadChapter(4);
                    break;
            
                default:
                    break;
            }
            break;

        case CONSTANTS.VIEW_SELECT:
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

function getMicVolume() {
    
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
    SOUNDS.CHAPTER_1.NARATIVE = new Audio("./resources/audio/chapter_1/narative.wav");
}