const filterObjectKeys = require('../utils/filter-object-keys');
const joinArraysOfString = require('../utils/join-arrays-of-string');
const findRepeatedStringsFromArray = require('../utils/find-duplicated-strings-from-array');

module.exports = class Script {
    constructor(fileManipulator, path) {
        this.fileManipulator = fileManipulator,
            this.path = path
    }

    async execute(args) {
        try {
            const { content } = await this.fileManipulator.readFile(this.path.join(__dirname, '..', '/shared', '/file.json'));

            const contentParsedToJSON = JSON.parse(content);

            const objectFilteredWithArgs = filterObjectKeys(contentParsedToJSON, args);

            const objectFilteredWithArgsKeys = Object.keys(objectFilteredWithArgs);

            if (objectFilteredWithArgsKeys.length === 0) {
                this.printResult(objectFilteredWithArgsKeys, args);
                return;
            }

            this.processObjectFiltered(objectFilteredWithArgs);
        } catch (error) {
            console.log('Error while running script');

            console.log(error.message);
        }
    }

    processObjectFiltered(object) {
        const keys = Object.keys(object);

        const joinedArray = joinArraysOfString(object, keys);

        const result = findRepeatedStringsFromArray(joinedArray, keys.length);

        this.printResult(result, keys);
    }

    printResult(result, keys) {
        console.log(`Foram encontradas ${result.length} ocorrências pelo termo ${keys.join(' ')} \n`);
        console.log(`Os arquivos que possuem ${keys.join(' ')} são: \n`);
        result.map(val => { console.log(val) });
    }
}
