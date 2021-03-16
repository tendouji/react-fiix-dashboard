const getDurationsNumber = (val: string) => {
    const tempStr = val.replace('ms', '');
    return +tempStr;
};

const copyToClipboard = (targetID: string) => {
    const targetDom: HTMLElement | null = document.getElementById(targetID);
    if(!!targetDom) {
        const elm: HTMLTextAreaElement = document.createElement('textarea');
        elm.value = targetDom.innerText;
        elm.setAttribute('readonly', '');
        elm.style.position = 'absolute';
        elm.style.left = '-9999px';
        document.body.appendChild(elm);
        elm.select();
        document.execCommand('copy');
        document.body.removeChild(elm);
    } else {
        console.log('Target not found');
    }
};

export {
    getDurationsNumber,
    copyToClipboard,
}