const { Model } = require('objection');
const db = require('../config/db');

Model.knex(db);

class Bug extends Model {
  static get tableName() {
    return 'bug';
  }

  $beforeInsert() {
    this.created = new Date().toISOString();
  }

  $beforeUpdate() {
    if (this.status === 1) this.fixed = new Date().toISOString();
  }

  /*static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description'],

      properties: {
        id: { type: 'integer' },
        priority: { type: 'integer', default: 1 },
        status: { type: 'integer', default: 0 },
        created: { type: 'string', format: 'date-time', readOnly: true },
        fixed: { type: 'string', format: 'date-time' },
        title: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        comments: { type: 'string' },
      },
    };
  }*/
}

module.exports = Bug;
