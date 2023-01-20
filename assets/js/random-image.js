import * as params from '@params';

let opt = { api: 'https://source.unsplash.com/random/${w}x${h}?${t}', width: 1, height: 0.5, topic: '' };
Object.assign(opt, params.opt || {});

function _cssVar(key, defaultVal) {
    let num = window.getComputedStyle(document.body).getPropertyValue(key);
    if (!num) {
        return defaultVal;
    }
    num = num.replace('px', '');
    return Number.parseInt(num);
}

let defaultWidth = Number.parseFloat(opt.width);
if (defaultWidth <= 1) {
    defaultWidth = _cssVar('--main-width', 720) * defaultWidth;
}

let defaultHeight = Number.parseFloat(opt.height);
if (defaultHeight <= 1) {
    defaultHeight = window.innerHeight * defaultHeight;
}

document.querySelectorAll('.x-random-img').forEach($img => {
    let _src = $img.getAttribute('src') || '#';
    if (_src !== '#') {
        return;
    }
    let _topic = $img.getAttribute('data-topic') || opt.topic;
    let _width = Number.parseInt($img.getAttribute('width') || defaultWidth);
    let _height = Number.parseInt($img.getAttribute('height') || defaultHeight);
    _width = (_width % 10 === 0 ? _width : _width + 10 - _width % 10) + '';
    _height = (_height % 10 === 0 ? _height : _height + 10 - _height % 10) + '';

    _src = opt.api
        .replace('${w}', _width)
        .replace('${h}', _height)
        .replace('${t}', _topic);
    $img.setAttribute('src', _src);
    $img.setAttribute('width', _width);
    $img.setAttribute('height', _height);
});