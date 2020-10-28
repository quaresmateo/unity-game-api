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

  async store({ request, response, auth }) {
    const user_id = auth.user.id
    const { name } = request.all()

    const institution = await Institution.create({ name, user_id })

    return response.json({
      data: { institution },
      message: 'Criado com sucesso'
    })
  }

  async show({ params, response }) {
    const institution = await Institution.findOrFail(params.id)

    return response.json({
      data: institution,
      message: 'Ok'
    })
  }

  async update({ params, request, response }) {
    const institution = await Institution.findOrFail(params.id)
    const institutionOldName = institution.name

    institution.merge(request.only(['name']))
    institution.save()

    return response.json({
      data: institution,
      message: `Instituição '${institutionOldName}' foi atualizada para '${institution.name}'`
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
