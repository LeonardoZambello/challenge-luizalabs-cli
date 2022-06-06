const PreScript = require('./pre-script');
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

describe('PreScript', () => {
    beforeEach(() => {
        consoleSpy.mockClear()
    });

    test('Should execute prescript with success', async () => {
        const { fileManipulator } = setupDependencies();

        const filesName = ['fileName1'];

        jest.spyOn(path, 'join').mockReturnValueOnce('/any/path')

        jest.spyOn(fileManipulator, 'listAllFiles').mockReturnValueOnce(new Promise((resolve, reject) => resolve(filesName)));

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve({ fileName: 'fileName1', content: 'abc def' })));

        jest.spyOn(fileManipulator, 'writeFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve()));

        const preScript = new PreScript(fileManipulator, path);

        await expect(preScript.execute()).resolves.not.toThrow();
        expect(fileManipulator.listAllFiles).toBeCalledTimes(1);
        expect(fileManipulator.readFile).toBeCalledTimes(1);
        expect(fileManipulator.writeFile).toBeCalledWith('/any/path', JSON.stringify({ "abc": ["fileName1"], "def": ["fileName1"] }))
    });
    test('Should not execute prescript if throws while list all files', async () => {
        const { fileManipulator } = setupDependencies();

        jest.spyOn(fileManipulator, 'listAllFiles').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('Mocked Error!'))))

        const preScript = new PreScript(fileManipulator, path);

        await expect(preScript.execute()).resolves.not.toThrow();
        expect(fileManipulator.listAllFiles).toBeCalledTimes(1);
        expect(fileManipulator.readFile).not.toBeCalled();
        expect(fileManipulator.writeFile).not.toBeCalled();
        expect(consoleSpy).toBeCalledTimes(2);
    });
    test('Should not execute prescript if throws while read any file', async () => {
        const { fileManipulator } = setupDependencies();

        const filesName = ['fileName1'];

        jest.spyOn(fileManipulator, 'listAllFiles').mockReturnValueOnce(new Promise((resolve, reject) => resolve(filesName)));

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('Mocked Error!'))));

        const preScript = new PreScript(fileManipulator, path);

        await expect(preScript.execute()).resolves.not.toThrow();
        expect(fileManipulator.listAllFiles).toBeCalledTimes(1);
        expect(fileManipulator.readFile).toBeCalledTimes(1);
        expect(fileManipulator.writeFile).not.toBeCalled();
        expect(consoleSpy).toBeCalledTimes(2);
    });
    test('Should not execute prescript if throws while write file', async () => {
        const { fileManipulator } = setupDependencies();

        const filesName = ['fileName1'];

        jest.spyOn(path, 'join').mockReturnValueOnce('/any/path')

        jest.spyOn(fileManipulator, 'listAllFiles').mockReturnValueOnce(new Promise((resolve, reject) => resolve(filesName)));

        jest.spyOn(fileManipulator, 'readFile').mockReturnValueOnce(new Promise((resolve, reject) => resolve({ fileName: 'fileName1', content: 'abc def' })));

        jest.spyOn(fileManipulator, 'writeFile').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('Mocked error!'))));

        const preScript = new PreScript(fileManipulator, path);

        await expect(preScript.execute()).resolves.not.toThrow();
        expect(fileManipulator.listAllFiles).toBeCalledTimes(1);
        expect(fileManipulator.readFile).toBeCalledTimes(1);
        expect(fileManipulator.writeFile).toBeCalledWith('/any/path', JSON.stringify({ "abc": ["fileName1"], "def": ["fileName1"] }));
        expect(consoleSpy).toBeCalledTimes(2);
    });
});
