'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Institution = use('App/Models/Institution')

class InstitutionController {
  async index({ request, response, view }) {}

  async create({ request, response, view }) {}

  async store({ request, response, auth }) {
    const user_id = auth.user.id
    const { name } = request.all()
    const institution = await Institution.create({ name, user_id })
    return response.json({
      data: { institution },
      message: 'Criado com sucesso'
    })
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = InstitutionController
