'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Player = use('App/Models/Player')

class PlayerController {
  async index({ request, response, auth }) {
    const user = await auth.getUser()
    const { kind_of_handicap, all } = request.all()
    let players = null

    if (all == 'true') {
      players = await Player.all()
    } else {
      players = kind_of_handicap
        ? await Player.query()
            .where('user_id', user.id)
            .where('kind_of_handicap', kind_of_handicap)
            .fetch()
        : await Player.query().where('user_id', user.id).fetch()
    }

    return response.json({
      data: players
    })
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser()
    const user_id = user.id

    const player = await Player.create({
      user_id,
      ...request.only([
        'fullname',
        'username',
        'identification',
        'date_of_birth',
        'kind_of_handicap',
        'diagnosis'
      ])
    })

    return response.status(201).json({
      message: 'Jogador cadastrado com sucesso.',
      data: player
    })
  }

  async show({ params, response }) {
    const player = await Player.findOrFail(params.id)

    return response.json({
      data: player,
      message: 'Ok'
    })
  }

  async update({ params, request, response }) {
    const player = await Player.findOrFail(params.id)
    const playerOldName = player.username

    player.merge(
      request.only([
        'username',
        'fullname',
        'identification',
        'date_of_birth',
        'kind_of_handicap',
        'diagnosis'
      ])
    )

    player.save()

    return response.json({
      message: `Dado(s) de ${playerOldName} alterado(s)`,
      data: player
    })
  }

  async destroy({ params, response }) {
    const player = await Player.findOrFail(params.id)
    const { username } = player

    await player.delete()

    return response.json({
      message: `O jogador ${username} foi excluído`
    })
  }
}

module.exports = PlayerController
