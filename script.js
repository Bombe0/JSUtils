// The result depends on both rate and view port.
function getRelativePositionOf(xpath, rate) {
    var ele = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var posX = ele.getBoundingClientRect().x;
    var posY = ele.getBoundingClientRect().y;
    var docWidth = document.body.getBoundingClientRect().width;
    var docHeight = document.body.getBoundingClientRect().height;
    console.log("element: " + posX + "---" + posY)
    console.log("doc: " + docWidth + "---" + docHeight)
    rPos = "";
    if (posY > 0 && posY <= rate * docHeight) {
        rPos += "Top";
    }
    if (posY >= ((docHeight / 2) - ((rate / 2) * docHeight)) && posY <= ((docHeight / 2) + ((rate / 2) * docHeight))) {
        rPos += "Mid";
    }
    if (posY >= (1 - rate) * docHeight && posX <= docHeight) {
        rPos += "Bot";
    }
    if (posX >= 0 && posX <= (rate / 2) * docWidth) {
        rPos += " Left";
    }
    if (posX >= ((docWidth / 2) - ((rate / 2) * docWidth)) && posX <= ((docWidth / 2) + ((rate / 2) * docWidth))) {
        if (rPos != "Mid") {
            rPos += " Mid";
        }
    }
    if (posX >= (1 - rate) * docWidth && posX <= docWidth) {
        rPos += " Right";
    }
    console.log(rPos);
    return rPos;
}
return getRelativePositionOf("//*[@title='Information']", 0.3);

// search from chrome history then remove all of them

const timer = ms => new Promise(res => setTimeout(res, ms))
ele = document.querySelector('history-app').shadowRoot.querySelector('history-list')
while (true) {
    await timer(1000)
    items = document.querySelector('history-app').shadowRoot.querySelector('history-list').shadowRoot.querySelectorAll('history-item')
    for (let i = 0; i < items.length; i++) {
        item = items.item(i)
        item.shadowRoot.querySelector('cr-checkbox').click();
        if (item.hasAttribute("is-card-end")) {
            break;
        }
    }
    await timer(500)
    document.querySelector("#history-app").shadowRoot.querySelector("#toolbar").shadowRoot.querySelector("cr-toolbar-selection-overlay").querySelector("cr-button").click()
    await timer(500)
    document.querySelector("#history-app").shadowRoot.querySelector("#history").shadowRoot.querySelector("cr-dialog > div > cr-button.action-button").click()
    await timer(1500)
    searchResult = document.querySelector('history-app').shadowRoot.querySelector('history-list').shadowRoot.querySelector('#no-results')
    if (!searchResult.hasAttribute('hidden')) {
        break;
    }
}
