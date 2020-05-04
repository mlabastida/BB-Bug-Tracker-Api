const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Model } = require('objection');
const db = require('../config/db');

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'user';
  }

  // Encrypt password using bcrypt
  async $beforeInsert() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Sign  JWT and return
  getSignedJwtToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

module.exports = User;

/*
name
email
password
*/
