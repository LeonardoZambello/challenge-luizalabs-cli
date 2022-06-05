module.exports = cleanArrayKeepingOnlyLettersOnContent = (arrayToBeCleaned) => {
    const cleanedArray = [];

    arrayToBeCleaned.map(obj => {
        const objContentSplited = obj.content.split(' ');

        objContentSplited.map(word => {
            const wordContainsOnlyLetters = /^[a-zA-Z]+$/.test(word);

            if(wordContainsOnlyLetters && word) {
                const newObjectCleaned = {
                    word: word,
                    fileName: obj.fileName
                }

                cleanedArray.push(newObjectCleaned);
            }
        });
    });
    return cleanedArray;
}
