function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = 'HELLO!!!';

    return element;
}

document.body.appendChild(component());