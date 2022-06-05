module.exports = filterObjectKeys = (object, keys) => {
    const objectFiltered = {};

    keys.map(key => {
        const filteredValue = object[key];

        if (filteredValue) {
            objectFiltered[key] = filteredValue;
        }
    });
    return objectFiltered;
}
