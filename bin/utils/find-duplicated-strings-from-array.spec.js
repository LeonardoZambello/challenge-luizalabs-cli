const findRepeatedStringsFromArray = require('./find-duplicated-strings-from-array');

describe('findRepeatedStringsFromArray', () => {
    test('Should return an array with all repeated strings from an array', () => {
        const array = [
            'abc',
            'def',
            'abc',
            '123'
        ]

        const result = findRepeatedStringsFromArray(array, 2);

        expect(result).toStrictEqual(['abc']);
    });
});
