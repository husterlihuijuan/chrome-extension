chrome.storage.sync.get(["tranType"], function(items) {
    if (!items.tranType) {
        chrome.storage.sync.set({
            tranType: "line",
        });
    } else if (items.tranType === "right") {
        createMenus();
    }
});

// 监听storage变化
chrome.storage.onChanged.addListener(function(changes) {
    if (changes.tranType.newValue === "right") {
        createMenus();
    } else {
        chrome.contextMenus.removeAll();
    }
});

const createMenus = () => {
    chrome.contextMenus.create({
        title: "翻译：%s", // %s表示选中的文字
        contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
        onclick: function(params) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    query: params.selectionText,
                    type: "showTrans",
                });
            });
        },
    });
};

// 监听来自content的消息
chrome.runtime.onMessage.addListener((data) => {
    const { type } = data;
    if (type === "translate") {
        const { from, to, query } = data;
        const params = {
            from,
            to,
            q: query,
            appid: "20210106000664865",
            salt: 1,
            sign: md5(`20210106000664865${query}1e6UeilfOO_LVX6A0EaJf`),
        };
        const url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
        $.ajax({
            type: "get",
            data: params,
            url,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            success: (data) => {
                const res = data.trans_result[0].dst;
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { type: "changeRes", res });
                });
            },
        });
    }

    // chrome.browserAction.openPopup();
    // chrome.browserAction.openPopup(() => {

    // })
});