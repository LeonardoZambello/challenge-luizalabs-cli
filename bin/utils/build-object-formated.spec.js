const buildObjectFormated = require('./build-object-formated');

describe('buildObjectFormated', () => {
    test('Should format a object with success', () => {
        const arrayToBeFormated = [
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

        const result = buildObjectFormated(arrayToBeFormated);

        const expectedResult = {
            any: ['fileName1', 'fileName2'],
            content: ['fileName1', 'fileName2'],
            word: ['fileName1'],
            Lorem: ['fileName2'],
            Ipsum: ['fileName2'],
            has: ['fileName2'],
            been: ['fileName2'],
            the: ['fileName2'],
            ever: ['fileName2']
        }

        expect(result).toStrictEqual(expectedResult);
    });
});
