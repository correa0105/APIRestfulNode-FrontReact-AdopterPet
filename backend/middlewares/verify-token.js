const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')

const checkToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Você não está autenticado.' })
    }

    const token = getToken(req)

    if(!token) {
        return res.status(401).json({ message: 'Você não está autenticado.' })
    }

    try {
        const verified = jwt.verify(token, 'mysecret')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' })
    }
}

module.exports = checkToken