const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
});

UserSchema
  .plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

UserSchema
  .virtual('name.full')
  .get(function () {
    return `${this.name.first} ${this.name.last}`;
  });

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
  });

UserSchema
  .pre('save', async function () {
    console.log(this._password);
    if (this._password) {
      await this.setPassword(this._password);
    }
  });

module.exports = mongoose.model('User', UserSchema);
