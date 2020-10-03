'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Institution = use('App/Models/Institution')

class InstitutionController {
  async index({ response }) {
    const institutions = await Institution.query().with('whoCreated').fetch()

    return response.json({
      data: institutions,
      message: 'Ok'
    })
  }

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

  async update({ params, request, response }) {
    const institution = await Institution.findOrFail(params.id)

    institution.merge(request.only(['name']))

    return response.json({
      data: institution,
      message: `Instituição '${institution.name}' foi atualizada`
    })
  }

  async destroy({ params, response }) {
    const institution = await Institution.findOrFail(params.id)
    const institutionName = institution.name

    await institution.delete()

    return response.json({
      message: `Instituição '${institutionName}' deletada`
    })
  }
}

module.exports = InstitutionController
