// 插入翻译dom到文本
function showTransDom(value) {
    if ($(".modal-in-right").length > 0) {
        // 已存在
        $("#translate_input").val(value);
        return;
    }
    const imgUrl = chrome.runtime.getURL("image/switch.png");
    const template = $(`
        <div class='modal-in-right' onmouseup='javascript:event.stopPropagation()'>
            <div class='operator'>
                <select id='from' class='language-select'>
                    <option value='en'>英文</option>
                    <option value='zh'>中文</option>
                </select>
                <img src=${imgUrl} id='switch_lang' alt='转换' onclick='javascript:handleSwitch()'/>
                <select id='to' class='language-select'>
                    <option value='zh'>中文</option> 
                    <option value='en'>英文</option>       
                </select>
                <button id='translate_btn' onclick='javascript:clickTrans()'>翻译</button>
                <span id='close_icon' onclick='javascript:handleClose()'>X</span>
            </div>
            <div class='popup_wrap'>
                <textarea id='translate_input'>${value}</textarea>
                <div id='translate_res'></div>
            </div>
        </div>
    `);
    $("body").append(template);
}

function success_jsonpCallback_test(data) {
    console.log(data);
}

// 关闭
function close() {
    $(".modal-in-right").remove();
}

// 转换翻译语言
function switchLanguage() {
    const from = $("#from").val();
    const to = $("#to").val();
    $("#from").val(to);
    $("#to").val(from);
}