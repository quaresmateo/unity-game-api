'use strict'

const User = use('App/Models/User')
const Theme = use('App/Models/Theme')
// const Group = use('App/Models/Group')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ThemeController {
  async index({ request, response, view }) {}

  async create({ request, response, view }) {}

  async store({ request, response, auth }) {
    const current_user = auth.user
    const user_id = current_user.id
    const data = { ...request.only(['name']), user_id }
    const theme = await Theme.create(data)
    const groups = request.only(['groups_id'])

    // Aguardando implementação de GroupController
    // for (group_id in groups) {
    //   const group = await Group().findOrFail(group_id)
    //   await theme.groups().attach([group.id])
    // }

    const user = await User.findOrFail(current_user.id)
    await user.themes().attach([theme.id])

    return response.json({
      data: theme,
      message: 'Tema criado'
    })
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ThemeController
