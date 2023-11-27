const {obterPessoas} = require('./service')

/*
    const item = {
        nome: 'Loren',
        idade:  21
    }

    const {nome, idade} = item
*/


Array.prototype.meuFilter = function (callback) {
    // this - lista completa
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item,index, this)
        if(!result) continue; // se cair na condicao o for eh repetido
        lista.push(item)
    }
    return lista
}

//filter trazer oq necessita de acordo com uma condicao
async function main () {
    try {
        const {results} = await obterPessoas('a')

        // retorna um novo array com os objetos filtrados
        const familiares = results.filter(function (item) {
            // se o item e a condição for true retorna esse item caso contrario nao retorna
            // por padrão precisa retornar um booleano
            // para informar se deve manter ou remover da lista
            // false remove da lista
            // true mantem  
            // nao encontrou = -1 
            // encontrou = posicao no array
            const familiares = results.meuFilter((item, index, lista)=> item.name.toLowerCase().indexOf('lars') !== -1)
            const result = item.name.toLowerCase().indexOf('lars') !== -1
            return result
        });
        
        // retorna um novo array apenas com nom
        const names = familiares.map(pessoa => pessoa.name)
        console.log(names)

    } catch (error) {
        console.error('Deu ruim', error);;
    }
}

main()
