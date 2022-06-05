module.exports = validateArgs = (args) => {
    const argsFormated = [];

    for (let i = 2; i <= args.length -1; i++) {
        argsFormated.push(args[i]);
    }

    if (argsFormated[0] === 'pre-script') {
        return 'pre-script';
    }

    if (argsFormated[0] === 'script') {
        if (argsFormated.length <= 1) {
            throw new Error('Para executar o script você precisa informar pelo menos um parâmetro adicional');
        }

        argsFormated.shift();

        return argsFormated;
    }

    throw new Error('Informar um parâmetro válido: pre-script ou script');
};
