'use strict'

class CostumeWhere {
  register(Model, options) {
    Model.queryMacro('whereId', function (id) {
      if (id) {
        this.where('id', id)
      }
      return this
    })

    Model.queryMacro('whereName', function (name) {
      if (name) {
        this.where('name', name)
      }
      return this
    })

    Model.queryMacro('whereLocalLayout', function (local_layout) {
      if (local_layout) {
        this.where('local_layout', local_layout)
      }
      return this
    })
  }
}

module.exports = CostumeWhere
