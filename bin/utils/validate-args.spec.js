const validateArgs = require('./validate-args');

describe('validateArgs', () => {
    test('Should validate args if receive pre-script', () => {
        const args = ['invalid_arg', 'invalid_arg', 'pre-script']

        const result = validateArgs(args);

        expect(result).toBe('pre-script');
    });
    test('Should validate args if receive script', () => {
        const args = ['invalid_arg', 'invalid_arg', 'script', 'param1', 'param2']

        const result = validateArgs(args);

        const expectedResult = [args[3], args[4]];

        expect(result).toStrictEqual(expectedResult);
    });
    test('Should throws if receive param script without additional params', () => {
        const args = ['invalid_arg', 'invalid_arg', 'script']

        expect(() => { validateArgs(args) }).toThrow();
    });
    test('Should throws if args[0] not to be pre-script or script', () => {
        const args = ['invalid_arg', 'invalid_arg', 'invalid_arg'];

        expect(() => { validateArgs(args) }).toThrow();
    });
});
