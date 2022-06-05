const fs = require('fs');
const path = require('path');

const FileManipulator = require('./file-manipulator');

jest.mock('fs');
jest.mock('path');

describe('FileManipulator', () => {
    test('Should return all files from a directory', () => {
        const fileManipulator = new FileManipulator(fs, path);

        const filesMocked = ['file1', 'file2'];

        jest.spyOn(fs, 'readdir').mockImplementation(((path, options, callback) => {callback(null, filesMocked)}));

        const pathFiles = '/home/files';

        return expect(fileManipulator.listAllFiles(pathFiles)).resolves.toStrictEqual(filesMocked);
    });
    test('Should throws if can not return files name from a directory', () => {
        const fileManipulator = new FileManipulator(fs, path);

        const error = new Error('Mocked Error!');

        jest.spyOn(fs, 'readdir').mockImplementation(((path, options, callback) => {callback(error)}));

        const pathFiles = '/home/files';

        return expect(fileManipulator.listAllFiles(pathFiles)).rejects.toBe(error);
    });
    test('Should read a file and return it content', () => {
        const fileManipulator = new FileManipulator(fs, path);

        const fileContent = 'any_content';

        const fileName = 'any_name';

        const filePath = `/any_path/${fileName}`;

        jest.spyOn(fs, 'readFile').mockImplementation(((path, options, callback) => {callback(null, fileContent)}));

        jest.spyOn(path, 'basename').mockReturnValueOnce(fileName);

        return expect(fileManipulator.readFile(filePath)).resolves.toStrictEqual({fileName: fileName, content: fileContent});
    });
    test('Should throws if not found a file to read', () => {
        const fileManipulator = new FileManipulator(fs);

        const error = new Error('Mocked Error!');

        jest.spyOn(fs, 'readFile').mockImplementation(((path, options, callback) => {callback(error)}));

        return expect(fileManipulator.readFile()).rejects.toBe(error);
    });
    test('Should write a file with success', () => {
        const fileManipulator = new FileManipulator(fs);

        jest.spyOn(fs, 'writeFile').mockImplementation(((path, content, callback) => {callback()}));

        const path = 'any_path';

        const content = 'any_content';

        return expect(fileManipulator.writeFile(path, content)).resolves.toBe(undefined);
    });
    test('Should throws if get an error while write file', () => {
        const fileManipulator = new FileManipulator(fs);

        const error = new Error('Mocked Error!');

        jest.spyOn(fs, 'writeFile').mockImplementation(((path, content, callback) => {callback(error)}));

        const path = 'any_path';

        const content = 'any_content';

        return expect(fileManipulator.writeFile(path, content)).rejects.toBe(error);
    });
});
