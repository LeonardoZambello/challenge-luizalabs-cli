module.exports = buildObjectFormated = (arrayToBeFormated) => {
    const objFormated = {};

    arrayToBeFormated.map(obj => {
        if (objFormated.hasOwnProperty(obj.word)) {
            if (objFormated[obj.word].indexOf(obj.fileName) === -1) {
                objFormated[obj.word].push(obj.fileName);
            }
        } else {
            objFormated[obj.word] = [obj.fileName];
        }
    });

    return objFormated;
}
