const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        const images = req.files

        const avaible = true

        if(!name) {
            res.status(422).json({ message: 'É necessário o preenchimento do nome!' })
            return
        }

        if(!age) {
            res.status(422).json({ message: 'A idade é obrigatória!' })
            return
        }

        if(!weight) {
            res.status(422).json({ message: 'É necessário o preencher o peso do pet!' })
            return
        }

        if(!color) {
            res.status(422).json({ message: 'É necessário preencher a cor do pet!' })
            return
        }

        if(images.length === 0) {
            res.status(422).json({ message: 'Faça upload de uma foto do seu pet!' })
            return
        }

        const token = getToken(req)

        const user = await getUserByToken(token)

        const pet = new Pet({
            name: name,
            age: age,
            weight: weight,
            color: color,
            avaible: avaible,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map(image => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()

            res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getAllUserPets(req, res) {
        const token = getToken(req)

        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)

        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getPetById(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id do pet inválido!' })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        res.status(200).json({ pet })
    }

    static async removePetById(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id do pet inválido!' })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        const token = getToken(req)
        
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Você não pode remover o pet de outro usuário!' })
            return
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({ message: 'Pet removido com sucesso!' })
    }

    static async updatePet(req, res) {
        const id = req.params.id

        const { name, age, weight, color, avaible } = req.body

        const images = req.files

        const updatedData = {}

        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        const token = getToken(req)
        
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Você não pode editar o pet de outro usuário!' })
            return
        }

        if(!name) {
            res.status(422).json({ message: 'É necessário o preenchimento do nome!' })
            return
        } else {
            updatedData.name = name
        }

        if(!age) {
            res.status(422).json({ message: 'A idade é obrigatória!' })
            return
        } else {
            updatedData.age = age
        }

        if(!weight) {
            res.status(422).json({ message: 'É necessário o preencher o peso do pet!' })
            return
        } else {
            updatedData.weight = weight
        }

        if(!color) {
            res.status(422).json({ message: 'É necessário preencher a cor do pet!' })
            return
        } else {
            updatedData.color = color
        }

        if(images.length === 0) {
            res.status(422).json({ message: 'Faça upload de uma foto do seu pet!' })
            return
        } else {
            updatedData.images = []
            images.map(image => {
                updatedData.images.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: 'Pet atualizado com sucesso!' })
    }

    static async schedule(req, res) {
        const id = req.params.id

        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        const token = getToken(req)
        
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)) {
            res.status(422).json({ message: 'Você não agendar uma visita com seu próprio pet!' })
            return
        }

        if(pet.adopter) {
            if(pet.adopter._id.equals(user._id)) {
                res.status(422).json({ message: 'Você já agendou uma visita para este pet!' })
                return
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({ message: `A visita foi agendada com sucesso! Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}` })
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id

        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        const token = getToken(req)
        
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Você não pode confirmar a adoção de um pet que não é seu!' })
            return
        }

        pet.avaible = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({ message: 'Parabens! O ciclo de adoção foi sinalizado com sucesso!' })
    }
}