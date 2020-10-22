'use strict'

const User = use('App/Models/User')
const Theme = use('App/Models/Theme')
const Group = use('App/Models/Group')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ThemeController {
  async index({ request, response }) {
    const theme = await Theme.all()

    return response.json({
      data: theme,
      message: 'Ok'
    })
  }

  async store({ request, response, auth }) {
    const user_id = auth.user.id
    const data = { ...request.only(['name']), user_id }
    const theme = await Theme.create(data)
    const { groups_id: groups } = request.all()

    groups.forEach(async (group_id) => {
      const group = await Group.findOrFail(group_id)
      await theme.groups().attach([group.id])
    })

    const user = await User.findOrFail(user_id)
    await user.themes().attach([theme.id])

    return response.json({
      data: theme,
      message: 'Tema criado'
    })
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {
    const theme = await Theme.findOrFail(params.id)
    const themeOldName = theme.name
    const { groups_id: groups } = request.all()

    // const themesGroups = await Theme.query().whereIn('group_id', groups)

    // groups.forEach(async (group_id) => {
    //   const group = await Group.findOrFail(group_id)
    //   await theme.groups().attach([group.id])
    // })

    theme.merge(request.only(['name']))
    theme.save()

    return response.json({
      data: theme,
      message: `Tema '${themeOldName}' foi atualizado para '${theme.name}'`
    })
  }

  async destroy({ params, response }) {
    const theme = await Theme.findOrFail(params.id)
    const themeName = theme.name

    await theme.delete()

    return response.json({
      message: `Tema '${themeName}' deletado`
    })
  }
}

module.exports = ThemeController
