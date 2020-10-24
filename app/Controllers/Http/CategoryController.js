'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/Category')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index ({ response }) {
    const categories = await Category.all()

    return response.json({
      data: categories,
      message: 'Ok'
    })
  }

  async store ({ request, response }) {
    const { category_name } = request.all()

    const category = await Category.create({ category_name })

    return response.json({
      data: category,
      message: 'Criado com sucesso'
    })
  }

  async show ({ params, response }) {
    const category = await Category.findOrFail(params.id)

    return response.json({
      data: category,
      message: 'Ok'
    })
  }

  async update ({ params, request, response }) {
    const { category_name } = request.all()

    const category = await Category.findOrFail(params.id)
    category.category_name = category_name
    await category.save()

    return response.json({
      data: category,
      message: 'Atualizada com sucesso'
    })
  }

  async destroy ({ params, response }) {
    const category = await Category.findOrFail(params.id)
    const categoryName = category.category_name

    await category.delete()

    return response.json({
      message: `Gategoria '${categoryName}' deletado`
    })
  }
}

module.exports = CategoryController
