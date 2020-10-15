'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Group = use('App/Models/Group')
const Player = use('App/Models/Player')

class GroupController {
  async index({ request, response }) {
    const group = await Group.all()

    return response.json({
      data: group,
      message: 'Ok'
    })
  }

  async store({ request, response, auth }) {
    const user_id = auth.user.id
    const { name, players_ids } = request.all()
    const group = await Group.create({ name, user_id })

    players_ids.forEach(async (player_id) => {
      const player = await Player.findOrFail(player_id)
      await group.players().attach([player.id])
    })

    return response.json({
      data: group,
      message: 'Grupo criado'
    })
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = GroupController
