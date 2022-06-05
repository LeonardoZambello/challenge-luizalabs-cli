module.exports = findRepeatedStringsFromArray = (arrayStrings, times) => {
    const result = [];
    arrayStrings.map(string => {
        const isValid = getOccurrence(arrayStrings, string);
        if (isValid === times) {
            if (result.indexOf(string) === -1) {
                result.push(string);
            }
        }
    });
    return result;
};

function getOccurrence(array, value) {
    const res = array.filter(val => {
        if (val === value) return val;
    });
    return res.length;
}
