/**@type {{action: any, time: number}[]} */
var chapter_events = [];
var chapter_events_running = false;
var chapter_events_deltaTime = 0;
var pause_chapter_events = false;

function loadChapter(index=1) {
    switch (index) {
        case 1:
            setupchapter1();
            break;
        case 2:
            setupchapter2();
            break;
        case 3:
            setupchapter3();
            break;
        case 4:
            setupchapter4();
            break;
    
        default:
            break;
    }
}

function openDialog() {
    let container = document.getElementById("chapters-text-container");
    setDialogText("");
    container.style.maxHeight = "10vh";
}

function closeDialog() {
    let container = document.getElementById("chapters-text-container");
    setTimeout(() => {
        setDialogText("");
    }, 200);
    container.style.maxHeight = "0vh";
}

/**
 * set the chapter background to the given picture
 * @param {HTMLImageElement} img
 */
function setChapterBackground(img) {
    document.getElementById("chapters-background").style.backgroundImage = "url("+img.src+")";
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
            }, 30);
        }, i*550);
    }
}

function setupchapter1() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 0);
    addChapterEvents(()=>{setDialogText("J’avais 15 ans en 1939.")}, 400);
    addChapterEvents(()=>{setDialogText("Et bien-sûr, j'étais juif.")}, 2500);
    addChapterEvents(()=>{setDialogText("Nous vivions dans un pays antisémite, sous l’occupation allemande.")}, 4800);
    addChapterEvents(()=>{setDialogText("Notre ancienne maison nous fût prise par un chef de l'armée allemande, avec toutes les affaires que nous n'avions pas eu le temps de prendre.")}, 8100);
    addChapterEvents(()=>{setDialogText("Et nous, nous avons finis dans un ghetto.")}, 13800);
    addChapterEvents(()=>{
        addPopup("more-ghetto", "Les ghetto Juifs", "Plus d'information", {x:70,y:50}, "./doc/chapter_1/ghetto.html",
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.pause();pauseChapterEvents();},
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.play();resumeChapterEvents();}
        )
    }, 15700);
    addChapterEvents(()=>{setDialogText("C'était là, ou tout les juifs de la région étaient entassés.")}, 16400);
    addChapterEvents(()=>{setDialogText("Dans ce dernier, nous étions plusieurs familles dans la même chambre.")}, 19900);
    addChapterEvents(()=>{remPopup("more-ghetto");}, 22500);
    addChapterEvents(()=>{setDialogText("Nous avions très peu de place, mais on se disais que ça pouvais être pire.")}, 23300);
    addChapterEvents(()=>{setDialogText("De temps à autres, les soldats de la Gestapo patrouillaient dans le ghetto, à la recherche de juifs.")}, 26800);
    addChapterEvents(()=>{setDialogText("Nous savions que s’ils nous trouvaient chez nous, nous devrions quitter le ghetto pour aller à un autre endroit qui serait probablement pire.")}, 31700);
    addChapterEvents(()=>{setDialogText("Pour anticiper ce problème, nous avions construit une cachette en hauteur dans le grenier de cette maison.")}, 38100); 
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 38100);
    addChapterEvents(()=>{
        addPopup("more-cachettes", "Les cachettes juives", "Plus d'information", {x:20,y:50}, "./doc/chapter_1/cachettes.html",
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.pause();pauseChapterEvents();},
            ()=>{SOUNDS.CHAPTER_1.NARATIVE.play();resumeChapterEvents();}
        )
    }, 39500);
    addChapterEvents(()=>{setDialogText("Mais un soir de décembre, ils nous ont pris de cours.")}, 43000);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1); }, 44000);
    addChapterEvents(()=>{setDialogText("Sara, ma mère, n’a pas eu le temps de nous rejoindre lorsque la porte fût défoncée.")}, 46400);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 50000);
    addChapterEvents(()=>{setDialogText("Au moment où ils l’intérrogèrent, elle prétendit que mes frères, mon père et moi avions déjà quitté ce ghetto.")}, 51000);
    addChapterEvents(()=>{remPopup("more-cachettes");}, 52000);
    addChapterEvents(()=>{setDialogText("Nous sommes restés cachés toute la nuit.")}, 56900);
    addChapterEvents(()=>{setDialogText("Elle nous a sauvé la vie.")}, 59200);
    addChapterEvents(()=>{setDialogText("Puis, elle fût emmenée.")}, 60800);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_1);}, 60800);
    addChapterEvents(closeDialog, 64000);
    try {SOUNDS.CHAPTER_1.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_1.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_1.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter2() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_2); }, 0);
    addChapterEvents(()=>{setDialogText("La cachette était plutôt élaborée.")}, 550);
    addChapterEvents(()=>{setDialogText("Comme dit précédemment, nous l’avions aménagé au-dessus de notre grenier, il y a plusieurs mois, lorsque nous avons compris que nous pouvions être arrêtés à tout moment chez nous.")}, 2400);
    addChapterEvents(()=>{setDialogText("Nous avions créé un système d’alarme : une lampe s’allumait quand quelqu’un rentrait dans la maison.")}, 10900);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_2); }, 11800);
    addChapterEvents(()=>{setDialogText("Cependant, ma mère n’a pas réussi à se cacher à temps.")}, 15600);
    addChapterEvents(()=>{setDialogText("Les soldats l’ont emmené.")}, 18500);
    addChapterEvents(()=>{setDialogText("Plusieurs mois plus tard, les armées allemandes décidèrent de vider le ghetto, tous les juifs présents ont dû être déporté, nous y compris.")}, 21700);
    addChapterEvents(()=>{setDialogText("Encore une fois, nous avions réussi à anticiper la menace et sommes retournés dans notre grenier, pour y passer la nuit en attendant que la tempête passe.")}, 28900);
    addChapterEvents(()=>{setDialogText("Malheureusement, cette nuit, les ennemis sont revenus, et ont fouillé de fond en comble tout le ghetto pour dénicher tous les juifs.")}, 37500);
    addChapterEvents(()=>{setDialogText("Notre cachette n’étant pas infaillible nous avons été découverts et pour nous faire comprendre qu’ils ne faut pas leur désobéir, ils tuèrent Isaiah, mon frère aîné d’une balle dans la tête.")}, 44700);
    addChapterEvents(()=>{
        addPopup("more-gestapo", "Les arrestations de juifs", "Plus d'information", {x:15,y:45}, "./doc/chapter_2/gestapo.html",
            ()=>{SOUNDS.CHAPTER_2.NARATIVE.pause();pauseChapterEvents();},
            ()=>{SOUNDS.CHAPTER_2.NARATIVE.play();resumeChapterEvents();}
        )
    }, 45500);
    addChapterEvents(()=>{remPopup("more-gestapo");}, 52000);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_2); }, 54900);
    addChapterEvents(()=>{setDialogText("Nous avons été emmenés, puis mis dans des trains.")}, 54900);
    addChapterEvents(()=>{
        addPopup("more-trains", "Les exportations de juifs", "Plus d'information", {x:70,y:40}, "./doc/chapter_2/trains.html",
            ()=>{SOUNDS.CHAPTER_2.NARATIVE.pause();pauseChapterEvents();},
            ()=>{SOUNDS.CHAPTER_2.NARATIVE.play();resumeChapterEvents();}
        )
    }, 56000);
    addChapterEvents(()=>{setDialogText("Des wagons à bestiaux.")}, 57400);
    addChapterEvents(()=>{setDialogText("Nous étions serrés, affamés. Il faisait très froid. Et pour tout vous dire je pensais que j'allais y rester .")}, 58900);
    addChapterEvents(()=>{setDialogText("Après des jours de transport. Les portes se sont enfin ouvertes. Nous étions dans un camp de concentration dont je ne me souviens plus le nom.")}, 64800);
    addChapterEvents(()=>{remPopup("more-trains");}, 65200);
    addChapterEvents(()=>{nextBackground(CONSTANTS.CHAPTER_2); }, 65500);
    addChapterEvents(closeDialog, 75000);
    try {SOUNDS.CHAPTER_2.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_2.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_2.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter3() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("Texte pour le chapitre 3.")}, 200);
    addChapterEvents(closeDialog, 2000);
    try {SOUNDS.CHAPTER_3.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_3.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_3.EFFECT_INDEX = 0;
    startChapterEvents();
}

function setupchapter4() {
    clearChapterEvents();
    addChapterEvents(openDialog, 0);
    addChapterEvents(()=>{setDialogText("Texte pour le chapitre 4.")}, 200);
    addChapterEvents(closeDialog, 2000);
    try {SOUNDS.CHAPTER_4.NARATIVE.play();} catch (e) {}
    try {SOUNDS.CHAPTER_4.BACKGROUND.play();} catch (e) {}
    SOUNDS.CHAPTER_4.EFFECT_INDEX = 0;
    startChapterEvents();
}
    
function clearChapterEvents() {
    chapter_events = [];
    chapter_events_deltaTime = 0;
    SOUNDS.CHAPTER_1.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_2.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_3.EFFECT_INDEX = 0;
    SOUNDS.CHAPTER_4.EFFECT_INDEX = 0;
    PICTURES.CHAPTER_1.PIC_INDEX = 0;
    PICTURES.CHAPTER_2.PIC_INDEX = 0;
    PICTURES.CHAPTER_3.PIC_INDEX = 0;
    PICTURES.CHAPTER_4.PIC_INDEX = 0;
    document.getElementById("chapters-background").style.backgroundImage = "none";
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
    checkForChapterEvents();
}

function checkForChapterEvents() {
    if (!chapter_events_running) return;
    let index = 0;
    while (true) {
        if (index >= chapter_events.length) break;
        if (chapter_events[index].time <= chapter_events_deltaTime) {
            chapter_events[index].action();
            chapter_events.splice(0, 1);
            index++;
        }
        else break;
    }
    if (chapter_events.length == 0) chapter_events_running = false;
    chapter_events_deltaTime += 200;
    if (!pause_chapter_events) setTimeout(checkForChapterEvents, 200);
}

function pauseChapterEvents() {
    pause_chapter_events = true;
}
function resumeChapterEvents() {
    if (pause_chapter_events) {
        pause_chapter_events = false;
        checkForChapterEvents();
    }
}

function playEffect(chapter_number) {
    switch (chapter_number) {
        case CONSTANTS.CHAPTER_1:
            SOUNDS.CHAPTER_1.EFFECTS[SOUNDS.CHAPTER_1.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_2:
            SOUNDS.CHAPTER_2.EFFECTS[SOUNDS.CHAPTER_2.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_3:
            SOUNDS.CHAPTER_3.EFFECTS[SOUNDS.CHAPTER_3.EFFECT_INDEX++].play();
            break;
        case CONSTANTS.CHAPTER_4:
            SOUNDS.CHAPTER_4.EFFECTS[SOUNDS.CHAPTER_4.EFFECT_INDEX++].play();
            break;
    
        default:
            break;
    }
}

function nextBackground(chapter_number) {
    switch (chapter_number) {
        case CONSTANTS.CHAPTER_1:
            setChapterBackground(PICTURES.CHAPTER_1.PICS[PICTURES.CHAPTER_1.PIC_INDEX++]);
            if (PICTURES.CHAPTER_1.PIC_INDEX == PICTURES.CHAPTER_1.PICS.length)
                PICTURES.CHAPTER_1.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_2:
            setChapterBackground(PICTURES.CHAPTER_2.PICS[PICTURES.CHAPTER_2.PIC_INDEX++]);
            if (PICTURES.CHAPTER_2.PIC_INDEX == PICTURES.CHAPTER_2.PICS.length)
                PICTURES.CHAPTER_2.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_3:
            setChapterBackground(PICTURES.CHAPTER_3.PICS[PICTURES.CHAPTER_3.PIC_INDEX++]);
            if (PICTURES.CHAPTER_3.PIC_INDEX == PICTURES.CHAPTER_3.PICS.length)
                PICTURES.CHAPTER_3.PIC_INDEX = 0;
            break;
        case CONSTANTS.CHAPTER_4:
            setChapterBackground(PICTURES.CHAPTER_4.PICS[PICTURES.CHAPTER_4.PIC_INDEX++]);
            if (PICTURES.CHAPTER_4.PIC_INDEX == PICTURES.CHAPTER_4.PICS.length)
                PICTURES.CHAPTER_4.PIC_INDEX = 0;
            break;
    
        default:
            break;
    }
}