const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amigospeludos')
    console.log("Conectou ao Banco de Dados")
}

main().catch(err => console.log(err))

module.exports = mongoose