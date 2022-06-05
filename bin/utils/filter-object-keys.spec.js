const filterObjectKeys = require('./filter-object-keys');

describe('filterObjectKeys', () => {
    test('Should return a object filtered with provided keys', () => {
        const obj = {
            abc: [
                'any_value',
                'any_value'
            ],
            aeb: [
                'any_value',
                'any_value'
            ]
        }
    
        const result = filterObjectKeys(obj, ['abc', 'anykey']);
    
        expect(result).toStrictEqual({abc: [ 'any_value', 'any_value' ]});
    });
});
