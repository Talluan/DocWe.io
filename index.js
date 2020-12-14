const CONSTANTS = {
    VIEW_SELECT: 1,
    VIEW_CHAPTER: 2
};

/**
 * Change l'état de ma fenetre des choix
 * @param {boolean} state état de la fenetre des choix (true: ouverte, false: fermée)
 */
function setChoicesEnabled(state) {
    let choicesDiv = document.getElementById("choices-container")
    if (state) {
        choicesDiv.style.opacity = "1";
        choicesDiv.style.transform = "scale(1)";
    } else {
        choicesDiv.style.opacity = "0";
        choicesDiv.style.transform = "scale(2)";
    }
}

/**
 * Change l'état de ma fenetre des choix
 * @param {number} view_number état de la fenetre des choix (true: ouverte, false: fermée)
 */
function changeViewTo(view_number) {
    let selectDiv = document.getElementById("select-container");
    let chaptersDiv = document.getElementById("chapters-container");
    switch (view_number) {
        case CONSTANTS.VIEW_CHAPTER:
            chaptersDiv.style.opacity = "1";
            chaptersDiv.style.transform = "scale(1)";
            selectDiv.style.opacity = "0";
            selectDiv.style.transform = "scale(0)";
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