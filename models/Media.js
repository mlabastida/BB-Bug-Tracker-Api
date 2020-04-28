const { Model } = require('objection');
const db = require('../config/db');

const Bug = require('./Bug');

/**
@uuid
@bug_uuid
@type 
 */

Model.knex(db);

class Media extends Model {
  static get tableName() {
    return 'media';
  }

  $beforeInsert() {
    this.created = new Date().toISOString();
  }

  static relationMappings = {
    Bug: {
      relation: Model.BelongsToOneRelation,
      modelClass: Bug,
      join: {
        from: 'media.bug_id',
        to: 'bug.id',
      }
    }
  };
}

module.exports = Media;
