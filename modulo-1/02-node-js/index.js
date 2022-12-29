/*
 * 0 Obter um usuario
 * 1 Obter o numero de telefone de um usuario a partir de seu Id
 * 2 Obter o endereço do usuário pelo Id
*/

// padrão chamar callback
// apos 1 segundo vai chamar a funcao callback
// Importamos um modulo interno do node.js
const util = require('util')

// converte o obterendereco para uma promisse 
const obterEnderecoAsync = util.promisify(obterEndereco)
function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      }) 
      
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: `${idUsuario}`,
        telefone: '1199002',
        ddd: 11
      })
    }, 2000)
  })
}


function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)

}

// 1o passo adicionara a palavra async -> automaticamente ela retornará uma promise
// se nao quer executar nada apos a execução da main n precisa capturar o then e nem o catch
main()
async function main() {
  try {
    //mede tempo de execução de uma função
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    // promise all - quando as promisses não dependem entre sí, é mais rapido a execução
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
      Nome: ${usuario.nome}
      Endereço: ${endereco.rua}, ${endereco.numero}
      Telefone: ${telefone.ddd}, ${telefone.telefone},
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('Deu RUIM', error)
    
  }
}

// const usuarioPromise = obterUsuario()
// para manipular success usamos a função .then
// Erros usamos o .catch
// usuario -> telefone -> telefone
// usuarioPromise
//   .then(function(usuario) {
//     return obterTelefone(usuario.id)
//       .then(function resolverTelefone(result) {
//         return {
//           usuario: {
//             nome: usuario.nome,
//             id: usuario.id
//           },
//           telefone: result 
//         }
//       })
//   })
//   .then(function(resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function(resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereço: ${resultado.usuario.endereco.rua}, ${resultado.usuario.endereco.numero}
//       Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone},
//     `)
//   })
//   .catch(function(error) {
//     console.error('Deu ruim', error)
//   })


// obterUsuario(function resolverUsuario(error, usuario) {
//   // null, "", 0 = false
//   if(error) {
//     console.error('Deu RUIM em USUARIO', error);
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//    if(error1) {
//      console.error('Deu RUIM em TELEFONE', error);
//      return;
//     }

//     obterEndereço(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('Deu RUIM em endereço', error)
//       }

//       console.log(`
//         Nome: ${usuario.nome}
//         Endereço: ${endereco.rua},${endereco.numero}
//         Telefone: ${telefone.ddd},${telefone.telefone}
//       `)
//     })
//   })
// })
// const telefone = obterTelefone(usuario.id);


