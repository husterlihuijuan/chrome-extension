window.onload = function() {
    const src = chrome.extension.getURL("js/inject.js");
    const script = $(`<script type='text/javascript'  src=${src}></script>`);
    $("body").append(script);
};
// 监听来自background信息
chrome.runtime.onMessage.addListener((data) => {
    const { type } = data;
    if (type === "showTrans") {
        const { query } = data;
        showTransDom(query);
    } else if (type === "changeRes") {
        const { res } = data;
        console.log(14, res);
        $("#translate_res").html(res);
    }
});

// 监听来自inject信息
window.addEventListener(
    "message",
    (data) => {
        if (data.data.type === "tran") {
            const query = $("#translate_input").val();
            console.log(26, query);
            if (query) {
                const from = $("#from").val();
                const to = $("#to").val();
                chrome.runtime.sendMessage({ type: "translate", query, from, to });
            }
        } else if (data.data.type === "close") {
            close();
        } else if (data.data.type === "switch") {
            switchLanguage();
        }
    },
    false
);

// 监听释放鼠标按钮事件
document.addEventListener("mouseup", mouseUp, false);
// 释放鼠标处理函数
function mouseUp() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    if (text) {
        console.log(51, chrome.storage.sync);
        if (chrome.storage.sync) {
            chrome.storage.sync.get(["tranType"], function(items) {
                console.log(54, items.tranType);
                if (items.tranType === "right") {
                    return;
                }
                // 翻译
                showTransDom(text);
            });
        }
    }
}