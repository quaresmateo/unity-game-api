'use strict'
const User = use('App/Models/User')
const Instition = use('App/Models/Institution')
const Hash = use('Hash')

class UserController {
  async index({ response }) {
    const users = await User.query().with('institution').fetch()
    return response.json({
      data: users
    })
  }

  async store({ request, response }) {
    const data = request.only([
      'username',
      'email',
      'password',
      'fullname',
      'profession',
      'institution_id',
      'role'
    ])

    const user = await User.create(data)

    return response.json(user)
  }

  async me({ auth, response }) {
    const user = await auth.getUser()
    return response.json({
      data: user,
      message: 'Ok'
    })
  }

  async show({ params, response }) {
    const user = await User.findOrFail(params.id)

    return response.json({
      data: user,
      message: 'Ok'
    })
  }

  async login({ request, auth, response }) {
    let user = null
    const { email, username, password } = request.all()

    if (email) {
      user = await User.findByOrFail('email', email)
    } else if (username) {
      user = await User.findByOrFail('username', username)
    } else {
      return response.status(400).json({
        status: 'error',
        message: 'Erro: invalid email or username'
      })
    }

    try {
      if (await auth.attempt(user.email, password)) {
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

    user.merge(
      request.only([
        'username',
        'email',
        'fullname',
        'profession',
        'institution',
        'role'
      ])
    )

    const newPassword = request.input('newPassword')
    if (newPassword) {
      user.password = newPassword
    }

    await user.save()

    return response.status(200).json({
      message: 'atualizado com sucesso'
    })
  }

  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id)
    const name = user.fullname

    await user.delete()

    return response.json({
      message: `Usuário '${name}' deletado`
    })
  }
}

module.exports = UserController
