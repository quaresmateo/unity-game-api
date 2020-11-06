'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Media extends Model {
  static boot() {
    super.boot()
    this.addTrait('CostumeWhere')
  }
}

module.exports = Media
