const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []

    for (let indice = 0; indice < this.length - 1; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)        
    }

    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas('a')
        // const names = []
        // console.time('foreach')
        // // intera sobre os itens do array sem incrementador
        // results.results.forEach(function(item) {
        //     names.push(item.name)
        // })
        // console.timeEnd('foreach')

        // console.time('map')
        // // retorna do array somente o que quero
        // const a = results.results.map(function(pessoa) {
        //     return pessoa.name
        // })
        // console.timeEnd('map')
        // // const names = results.results.map(pessoa => pessoa.name)
        const names = results.results.meuMap(function (pessoa, indice) {
            return `[${indice}]${pessoa.name}`
        })
        console.log('names', names)
    } catch (error) {
        console.error('deu erro', error)
    }
}


main()