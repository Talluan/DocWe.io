/**@type {{div: HTMLDivElement, id: string}[]} */
let popup_list = [];

/**
 * adds a new popup on screen
 * @param {string} popup_id 
 * @param {string} popup_title 
 * @param {string} popup_desc
 * @param {{x: number, y: number}} popup_position position in percent (example: {x: 50, y: 50})
 */
function addPopup(popup_id, popup_title, popup_desc, popup_position) {
    let new_popup = {div: document.createElement("div"), id: popup_id};
    new_popup.div.classList.add("popup-div");
    new_popup.div.style.left = popup_position.x+"%";
    new_popup.div.style.top = popup_position.y+"%";
    let title = document.createElement("p");
    title.classList.add("popup-title")
    title.innerHTML = popup_title;
    let desc = document.createElement("p");
    desc.classList.add("popup-desc")
    desc.innerHTML = popup_desc;
    new_popup.div.appendChild(title);
    new_popup.div.appendChild(desc);
    document.getElementById("popup-container").appendChild(new_popup.div);
    popup_list.push(new_popup);
}
/**removes the popup with popup_id as id*/
function remPopup(popup_id) {
    for (let i = 0; i < popup_list.length; i++) {
        if (popup_list[i].id == popup_id) {
            popup_list[i].div.classList.add("remove-popup");
            setTimeout(() => {
                popup_list[i].div.remove();
                popup_list.splice(i, 1);
            }, 500);
            break;
        }
    }
}
/**removes all the popups*/
function remAllPopups(popup_id) {
    for (let i = 0; i < popup_list.length; i++) {
        popup_list[i].div.classList.add("remove-popup");
        setTimeout(() => {
            popup_list[0].div.remove();
            popup_list.splice(0, 1);
        }, 500);
    }
}