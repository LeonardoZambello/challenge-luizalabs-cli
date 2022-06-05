module.exports = joinArraysOfString = (object, keys) => {
    const newArraysOfString = [];

    for (let i = 0; i <= keys.length - 1; i++) {
        for (let j = 0; j <= object[keys[i]].length - 1; j++) {
            newArraysOfString.push(object[keys[i]][j]);
        }
    }

    return newArraysOfString;
}
