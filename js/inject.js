console.log(1, 'inject');

function clickTrans() {
    window.postMessage({
        type: 'tran'
    })
}

function handleClose() {
    window.postMessage({
        type: 'close'
    })
}

function handleSwitch() {
    window.postMessage({
        type: 'switch'
    })
}