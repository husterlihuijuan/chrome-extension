chrome.storage.sync.get(["tranType"], function(items) {
    if (items.tranType === "right") {
        document.getElementById("right").checked = true;
    } else {
        document.getElementById("line").checked = true;
    }
});

document.getElementById("line").onclick = () => {
    saveSetting("line");
};

document.getElementById("right").onclick = () => {
    saveSetting("right");
};

function saveSetting(type) {
    chrome.storage.sync.set({
        tranType: type,
    });
}