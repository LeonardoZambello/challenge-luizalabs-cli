const appConfigEnvs = require('../config/env/application.envs');
const cleanArrayKeepingOnlyLettersOnContent = require('../utils/clean-array');
const buildObjectFormated = require('../utils/build-object-formated');

module.exports = class PreScript {
    constructor(fileManipulator, path) {
        this.fileManipulator = fileManipulator,
        this.path = path
    }

    async execute() {
        try {
            const files = await this.fileManipulator.listAllFiles(appConfigEnvs.pathFiles);

            const arrayOfFilesAndContent = [];

            for (const file of files) {
                arrayOfFilesAndContent.push(await this.fileManipulator.readFile(`${appConfigEnvs.pathFiles}/${file}`));
            }

            const arrayOfFilesAndContentWithOnlyLetters = cleanArrayKeepingOnlyLettersOnContent(arrayOfFilesAndContent);

            const objectFormated = buildObjectFormated(arrayOfFilesAndContentWithOnlyLetters);

            await this.fileManipulator.writeFile(this.path.join(__dirname, '..', '/shared', 'file.json'), JSON.stringify(objectFormated));
        } catch (error) {
            console.log('Error while running pre-script');

            console.log(error.message);
        }
    }
}
