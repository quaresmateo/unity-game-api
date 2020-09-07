'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')

class UserController {
  async index({ response }) {
    const users = await User.all()
    return response.json({
      data: users
    })
  }

  async create({ request, response }) {
    let institution = null
    const institutionName = request.only(['institution']).toLowerCase().trim()
    const data = request.only([
      'username',
      'email',
      'password',
      'fullname',
      'profession'
    ])

    if (institutionName) {
      institution =
        (await Database.table('institutions')
          .where('name', institutionName)
          .first()) ||
        (await Database.table('institutions').insert({
          name: institutionName
        }))
    } else {
      return response.status(400).json({
        status: 'error',
        message: 'Institution is required'
      })
    }

    data.institution = institution.id

    const user = await User.create(data)

    return response.json(user)
  }

  async show({ auth, response }) {
    const user = await auth.getUser()
    return response.json({
      data: user
    })
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
    const user = auth.current.user

    const verifyPassword = await Hash.verify(
      request.input('currentPassword'),
      user.password
    )

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message:
          'Não foi possível verificar a senha atual! Por favor, tente novamente'
      })
    }

    user.merge(request.only(['username', 'email']))

    const newPassword = request.input('newPassword')
    if (newPassword) {
      user.password = newPassword
    }

    await user.save()

    return response.status(200).json({
      message: 'atualizado com sucesso'
    })
  }
}

module.exports = UserController
