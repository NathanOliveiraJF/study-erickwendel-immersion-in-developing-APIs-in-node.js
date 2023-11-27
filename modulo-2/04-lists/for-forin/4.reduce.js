const { obterPessoas } = require('./service')

// this -> é o valor inicial
Array.prototype.meuReduce = function(callback, valorInicial) {
  console.log('valor de this', this)
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
  for(let index = 0; index <= this.length; index++) {
    valorFinal = callback(valorFinal, this[index], this)
  }
  return valorFinal
}

async function main() {
  try {
    // const { results } = await obterPessoas(`a`)
    // const pesos = results.map(item => parseInt(item.height))
    // console.log('pesos', pesos)
    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo
    // })
    const minhaLista = [
      ['Lorem', 'Ipsum'],
      ['NodeBR', 'Nerdzao']
    ]
    const total = minhaLista.meuReduce((anterior, proximo) => {
      return anterior.concat(proximo)
    }, []).join(',')
    // console.log('total', total)
  } catch (error) {
    console.error(`DEU RUIM`, error)
  }
}

main()
