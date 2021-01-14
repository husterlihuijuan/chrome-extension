$('#translate_btn').click(() => {
    const query = $('#translate_input').val();
    const from = $('#from').val();
    const to = $('#to').val();
    if (query) {
        const data = {
            from,
            to,
            q: query,
            appid: '20210106000664865',
            salt: 1,
            sign: md5(`20210106000664865${query}1e6UeilfOO_LVX6A0EaJf`),
        };
        const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
        $.ajax({
            type: 'get',
            data,
            url,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            success: (data) => {
                const res = data.trans_result[0].dst;
                $('#translate_res').html(res);
            }
        })
    } else {
        $('#translate_res').html('');
    }
});

$('#switch_lang').click(() => {
    const from = $('#from').val();
    const to = $('#to').val();
    $('#from').val(to);
    $('#to').val(from);
});