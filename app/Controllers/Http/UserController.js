'use strict'
const User = use('App/Models/User')

class UserController {
  async index({ response }) {
    const users = await User.all()
    return response.json({
      users
    })
  }

  async create({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'type'])

    const user = await User.create(data)

    return response.json(user)
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all()

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        const token = await auth.generate(user)
        return response.json({
          data: token,
          message: 'Login successfull'
        })
      }
    } catch (e) {
      return response.status(400).json({
        status: 'error',
        message: '<strong>Erro</strong>: Email/Senha inválidos.'
      })
    }
  }

  async update({ request, response, auth }) {
    const user = await auth.current.user
    const data = request.only(['username', 'email', 'password'])

    await user.merge(data)
    await user.save()

    return response.status(200).json({
      message: 'atualizado com sucesso'
    })
  }
}

module.exports = UserController
