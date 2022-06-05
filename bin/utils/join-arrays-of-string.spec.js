const joinArraysOfString = require('./join-arrays-of-string');

describe('joinArraysOfString', () => {
    test('Should join an array of strings', () => {
        const obj = {
            walt: [
                'abc',
                'def',
                'ghi'
            ],
            disney: [
                'abc',
                'uft'
            ]
        }

        const result = joinArraysOfString(obj, Object.keys(obj));

        expect(result.length).toBe(obj['walt'].length + obj['disney'].length);
    });
});