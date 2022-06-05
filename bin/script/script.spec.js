const Script = require('./script');
const FileManipulator = require('../utils/file-manipulator');
const path = require('path');
const fs = require('fs');

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
jest.mock('../utils/file-manipulator');
jest.mock('path');
jest.mock('fs');

const setupDependencies = () => {
    const fileManipulator = new FileManipulator(fs, path);
    return {
        fileManipulator
    }
}

describe('Script', () => {
    beforeEach(() => {
        consoleSpy.mockClear()
    });
    test('Should execute script with success', async () => {
        const { fileManipulator } = setupDependencies();

        const args = ['walt', 'disney'];

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve(JSON.stringify({ fileName: 'fileName1', content: {'walt': ['file1', 'file2'], 'disney': ['file1', 'file2']} }))));

        const script = new Script(fileManipulator, path);

        await (expect(script.execute(args))).resolves.not.toThrow();
    });
});
