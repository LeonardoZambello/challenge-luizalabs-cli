#! /usr/bin/env node
const FileManipulator = require('./utils/file-manipulator');
const PreScript = require('./pre-script/pre-script');
const Script = require('./script/script');
const validateArgs = require('./utils/validate-args');
const fs = require('fs');
const path = require('path');
const args = process.argv;

const fileManipulator = new FileManipulator(fs, path);
const preScript = new PreScript(fileManipulator, path);
const script = new Script(fileManipulator, path);

try {
    const argsFormated = validateArgs(args);

    if (argsFormated === 'pre-script') preScript.execute()
    else script.execute(argsFormated);

} catch (error) {
    console.log(error.message);
}