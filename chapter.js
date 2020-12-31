/**@type {{action: any, time: number}[]} */
var chapter_events = [];
var chapter_events_running = false;
var chapter_events_deltaTime = 0;

function loadChapter(index=1) {
    switch (index) {
        case 1:
            setupchapter1();
            break;
        case 2:
            //setupchapter2();
            break;
        case 3:
            //setupchapter3();
            break;
        case 4:
            //setupchapter4();
            break;
    
        default:
            break;
    }
}

function openDialog() {
    let container = document.getElementById("chapters-text-container");

    container.style.maxHeight = "10vh";
}

function closeDialog() {
    let container = document.getElementById("chapters-text-container");

    container.style.maxHeight = "0vh";
}

/**
 * set the chapter background to the given picture
 * @param {string} src 
 */
function setChapterBackground(src) {
    document.getElementById("chapters-background").style.backgroundImage = "url("+src+")";
} 

/**
 * Set the dialog text to the argument
 * @param {string} text 
 */
function setDialogText(text) {
    let container = document.getElementById("chapters-text-container");
    let content = document.getElementById("chapters-text-content");
    let hider_x = document.getElementById("chapters-text-hider-x");
    let hider_y = document.getElementById("chapters-text-hider-y");
    let bounds = container.getBoundingClientRect();
    let height = bounds.height;
    let width = bounds.width-12;
    setTimeout(()=>{content.innerHTML = text;}, 25);
    
    for (let i = 0; i < Math.ceil(height/CONSTANTS.DIALOG_TEXT_HEIGHT); i++) {
        setTimeout(() => {
            hider_x.style.transition = "none";
            hider_y.style.transition = "none";
            hider_x.style.left = "6px";
            hider_x.style.width = width+"px";
            hider_x.style.top = (i*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_x.style.height = (height-i*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_y.style.top = (i*CONSTANTS.DIALOG_TEXT_HEIGHT-height+(i+1)*CONSTANTS.DIALOG_TEXT_HEIGHT)+"px";
            hider_y.style.height = height+"px";
            setTimeout(() => {
                hider_x.style.transition = CONSTANTS.HIDER_X_TRANSITION;
                hider_y.style.transition = CONSTANTS.HIDER_Y_TRANSITION;
                hider_x.style.left = width.toString()+"px";
                hider_x.style.width = "0px";
            }, 50);
        }, i*1100);
    }
}

function setupchapter1() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("J’avais 15 ans en 1939.")}, 600);
    addChapterEvents(()=>{setDialogText("Nous vivions dans un pays antisémite, sous l’occupation allemande, dans le ghetto juif.")}, 3200);
    addChapterEvents(()=>{setDialogText("Séparés des autres.")}, 7700);
    addChapterEvents(()=>{setDialogText("Les soldats de la Gestapo patrouillaient dans le ghetto, à la recherche de gens comme nous.")}, 9200);
    addChapterEvents(()=>{setDialogText("Nous savions que s’ils nous trouvaient chez nous, nous devrions quitter la ville.")}, 13700);
    addChapterEvents(()=>{setDialogText("C’est ce qu’il s’est passé.")}, 17900);
    addChapterEvents(()=>{setDialogText("Un soir de décembre, ils ont sonné.")}, 19600);
    addChapterEvents(()=>{setDialogText("Nous nous sommes alors réfugiés dans notre cachette au grenier. ")}, 21800);
    addChapterEvents(()=>{setDialogText("Mais ma mère n’a pas eu le temps de nous rejoindre lorsque la porte a été défoncée.")}, 24700);
    addChapterEvents(()=>{setDialogText("Lorsqu’ils l’ont interrogée, elle a prétendu que mes frères, mon père et moi avions quitté la ville.")}, 28920);
    addChapterEvents(()=>{setDialogText("Nous sommes restés cachés. ")}, 34600);
    addChapterEvents(()=>{setDialogText("Elle nous a sauvé la vie.")}, 36800);
    addChapterEvents(()=>{setDialogText("Puis elle a été emmenée.")}, 38200);
    addChapterEvents(closeDialog, 41000);
    SOUNDS.CHAPTER_1.NARATIVE.play();
    startChapterEvents();
}
    
function clearChapterEvents() {
    chapter_events = [];
    chapter_events_deltaTime = 0;
}

/**
 * Adds a new event to the chapter event queue
 * @param {any} action 
 * @param {number} time 
 */
function addChapterEvents(action, time) {
    chapter_events.push({action: action, time: time});
}

function startChapterEvents() {
    chapter_events_running = true;
    checkForChapterEvents(200);
}

function checkForChapterEvents(deltaTime) {
    if (!chapter_events_running) return;
    if (chapter_events[0].time <= chapter_events_deltaTime) {
        chapter_events[0].action();
        chapter_events.splice(0, 1);
    }
    if (chapter_events.length == 0) chapter_events_running = false;
    chapter_events_deltaTime+=deltaTime;
    setTimeout(checkForChapterEvents, deltaTime, deltaTime);
}