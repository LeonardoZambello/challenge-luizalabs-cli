module.exports = class FileManipulator {
    constructor(
        fs,
        path
    ) {
        this.fs = fs,
            this.path = path
    }

    async listAllFiles(path) {
        return new Promise((resolve, reject) => {
            this.fs.readdir(path, 'utf-8', (err, content) => {
                if (err) reject(err);

                resolve(content);
            });
        });
    }

    async readFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, 'utf-8', (err, content) => {
                if (err) reject(err);

                const fileName = this.path.basename(filePath);

                resolve({ fileName: fileName, content: content });
            });
        });
    }

    async writeFile(path, content) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(path, content, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }
}
