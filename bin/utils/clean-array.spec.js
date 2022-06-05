const cleanArrayKeepingOnlyLettersOnContent = require('./clean-array');

describe('cleanArrayKeepingOnlyLettersOnContent', () => {
    test('Should clean an array with success', () => {
        const arrayToBeCleaned = [
            {
                fileName: "fileName1",
                content: "any content 1 - ! walt-disnet ** word content"
            },
            {
                fileName: "fileName2",
                content: "Lorem Ipsum has any been the content industry's ever 1500s,"
            }
        ]

        const result = cleanArrayKeepingOnlyLettersOnContent(arrayToBeCleaned);

        const expectedResult = [
            { word: 'any', fileName: 'fileName1' },
            { word: 'content', fileName: 'fileName1' },
            { word: 'word', fileName: 'fileName1' },
            { word: 'content', fileName: 'fileName1' },
            { word: 'Lorem', fileName: 'fileName2' },
            { word: 'Ipsum', fileName: 'fileName2' },
            { word: 'has', fileName: 'fileName2' },
            { word: 'any', fileName: 'fileName2' },
            { word: 'been', fileName: 'fileName2' },
            { word: 'the', fileName: 'fileName2' },
            { word: 'content', fileName: 'fileName2' },
            { word: 'ever', fileName: 'fileName2' }
        ]

        expect(result).toStrictEqual(expectedResult);
    });
});
