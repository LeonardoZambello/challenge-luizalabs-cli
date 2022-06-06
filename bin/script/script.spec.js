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

        const fileContent = {
            fileName: 'file.json',
            content: '{"walt":["file1", "file2"],"disney":["file1", "file2"]}'
        }

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve(fileContent)));

        const script = new Script(fileManipulator, path);

        await expect(script.execute(args)).resolves.not.toThrow();
        expect(consoleSpy).toBeCalledTimes(4);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, `Foram encontradas 2 ocorrências pelo termo ${args.join(' ')} \n`);
        expect(consoleSpy).toHaveBeenNthCalledWith(2, `Os arquivos que possuem ${args.join(' ')} são: \n`);
        expect(consoleSpy).toHaveBeenNthCalledWith(3, 'file1');
        expect(consoleSpy).toHaveBeenNthCalledWith(4, 'file2');
    });
    test('Should not execute script if throws while read file', async () => {
        const args = ['walt', 'disney'];

        const { fileManipulator } = setupDependencies();

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('Mocked error!'))));

        const script = new Script(fileManipulator, path);

        await expect(script.execute(args)).resolves.not.toThrow();
        expect(consoleSpy).toBeCalledTimes(2);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Error while running script');
        expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Mocked error!');
    });
    test('Should execute script even if not found any match with provided arguments into the file', async () => {
        const { fileManipulator } = setupDependencies();

        const args = ['walt', 'disney'];

        const fileContent = {
            fileName: 'file.json',
            content: '{"wordinvalid":["file1", "file2"],"anotherwordinvalid":["file1", "file2"]}'
        }

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve(fileContent)));

        const script = new Script(fileManipulator, path);

        await expect(script.execute(args)).resolves.not.toThrow();
        expect(consoleSpy).toBeCalledTimes(2);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, `Foram encontradas 0 ocorrências pelo termo ${args.join(' ')} \n`);
        expect(consoleSpy).toHaveBeenNthCalledWith(2, `Os arquivos que possuem ${args.join(' ')} são: \n`);
    });
});
