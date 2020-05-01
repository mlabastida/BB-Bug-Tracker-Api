const { Model } = require('objection');
const db = require('../config/db');
const slugify = require('slugify');
const Media = require('./Media');

Model.knex(db);

let baseSlug;

let slugIndex;

class Bug extends Model {
  static get tableName() {
    return 'bug';
  }

  static relationMappings = {
    Media: {
      relation: Model.HasManyRelation,
      modelClass: Media,
      join: {
        from: 'bug.id',
        to: 'media.bug_id',
      },
    },
  };

  $beforeInsert() {
    this.created = new Date().toISOString();
    baseSlug = slugify(this.title || 'error', { lower: true });
    this.slug = baseSlug;
    return this.$beforeSave(true);
  }

  $beforeUpdate() {
    if (this.status === 'fixed') this.fixed = new Date().toISOString();
    baseSlug = slugify(this.title || 'error', { lower: true });
    this.slug = baseSlug;
    return this.$beforeSave(true);
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

  $beforeSave(inserting) {
    return this.searchSlug();

    //while (typeof test === 'object' && test.id);
  }

  async searchSlug(index) {
    if (index) {
      this.slug = `${baseSlug}-${index}`;
    }

    index++;

    let exist = await this.constructor
      .query()
      .select('id')
      .where('slug', this.slug)
      .first();

    if (typeof exist === 'object' && exist.id) {
      return await this.searchSlug(index++ || 1);
    } else {
      return this.slug;
    }
  }
}

module.exports = Bug;
