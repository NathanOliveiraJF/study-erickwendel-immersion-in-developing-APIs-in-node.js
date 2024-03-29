const service = require('./service')


async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        console.time('for')
        for (let index = 0; index < result.results.length - 1; index++) {
            const pessoa = result.results[index];
            names.push(pessoa)
        }
        console.timeEnd('for')

        console.time('forin')
        for (let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('forin')
        
        console.time('forof')
        for (const pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('forof')
        // console.log('name', names)
    } catch (error) {
        console.error(`deu erro${error}`)
    }
}

main()