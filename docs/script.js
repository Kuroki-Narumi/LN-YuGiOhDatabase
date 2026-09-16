
function Initialize() {
    CreateMenu();
    document.querySelectorAll("div.common").forEach(AddInnerHtml);
}

async function CreateMenu(){
    const response = await fetch("common/menu.html");
    const menu = document.createElement("div");
    menu.className = "menu";
    menu.innerHTML = await response.text();
    menu.querySelectorAll("details").forEach((element) => {
        const id = element.id;
        if (id){
            if (window.sessionStorage[id] === "true"){
                element.open = true;
            }
            element.ontoggle = () => { window.sessionStorage[id] = element.open; };
        }
    });
    document.body.appendChild(menu);
}

/**
 * 
 * @param {Element} element
 * @param {string} ifnone 
 */
function AddInnerHtml(element, ifnone){

    if (element){
        /** @type{Attr} */
        const attr = element.attributes["src"];
        const url = attr ? attr.value : ifnone;
        if (url){
            fetch(url)
            .then(r => r.text())
            .then(d => element.innerHTML = d);
        }
    }
}

function Initialize_Head(){
    document.title = "YuGiOh Database";
    document.head.appendChild(CreateFavicon());
    document.head.appendChild(CreateCssLink("../../livre_noir.css"));
    document.head.appendChild(CreateCssLink("style.css"));
}

function CreateFavicon(){
    const link = document.createElement("link");
    link.rel = "shortcut icon";
    link.href = "favicon.ico";
    return link;
}

/**
 * 
 * @param {string} href 
 * @returns 
 */
function CreateCssLink(href){
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    return link;
}

Initialize();
