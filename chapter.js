function loadChapter(index=1) {
    switch (index) {
        case 1:
            setupchapter1()
            break;
        case 2:
            //SOUNDS.CHAPTER_2.NARATIVE.play();
            break;
        case 3:
            //SOUNDS.CHAPTER_3.NARATIVE.play();
            break;
        case 4:
            //SOUNDS.CHAPTER_4.NARATIVE.play();s
            break;
    
        default:
            break;
    }
}

function openDialog() {
    let container = document.getElementById("chapters-text-container");

    container.style.display = "block";
    container.style.maxHeight = "10vh";
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
    content.innerHTML = text;
    let bounds = container.getBoundingClientRect();
    let height = bounds.height;
    let width = bounds.width;
    
    for (let i = 0; i < Math.ceil(height/CONSTANTS.DIALOG_TEXT_HEIGHT); i++) {
        setTimeout(() => {
            hider_x.style.transition = "none";
            hider_y.style.transition = "none";
            hider_x.style.left = "0px";
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
            }, 100);
        }, i*1400);
    }
}

function closeDialog() {
    let container = document.getElementById("chapters-text-container");

    container.style.maxHeight = "0vh";
    setTimeout(()=>{container.style.display = "none";}, CONSTANTS.ANIMATION_DELAY);
}

function setupchapter1() {
    SOUNDS.CHAPTER_1.NARATIVE.play();
    openDialog()
    setTimeout(()=>{setDialogText("J’avais 15 ans en 1939.")}, 550);
    setTimeout(()=>{setDialogText("Nous vivions dans un pays antisémite, sous l’occupation allemande, dans le ghetto juif.")}, 3240);
    setTimeout(()=>{setDialogText("Séparés des autres.")}, 7710);
    setTimeout(()=>{setDialogText("Les soldats de la Gestapo patrouillaient dans le ghetto, à la recherche de gens comme nous.")}, 9160);
    setTimeout(()=>{setDialogText("Nous savions que s’ils nous trouvaient chez nous, nous devrions quitter la ville.")}, 13700);
    setTimeout(()=>{setDialogText("C’est ce qu’il s’est passé.")}, 17920);
    setTimeout(()=>{setDialogText("Un soir de décembre, ils ont sonné.")}, 19550);
    setTimeout(()=>{setDialogText("Nous nous sommes alors réfugiés dans notre cachette au grenier. ")}, 21760);
    setTimeout(()=>{setDialogText("Mais ma mère n’a pas eu le temps de nous rejoindre lorsque la porte a été défoncée.")}, 24690);
    setTimeout(()=>{setDialogText("Lorsqu’ils l’ont interrogée, elle a prétendu que mes frères, mon père et moi avions quitté la ville.")}, 28920);
    setTimeout(()=>{setDialogText("Nous sommes restés cachés. ")}, 34570);
    setTimeout(()=>{setDialogText("Elle nous a sauvé la vie.")}, 36840);
    setTimeout(()=>{setDialogText("Puis elle a été emmenée.")}, 38190);
    setTimeout(closeDialog, 41000);
}