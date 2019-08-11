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
  .virtual('password')
  .set(function setPassword(password) {
    this._password = password;
  });

UserSchema
  .pre('save', async function preSavePassword() {
    if (this._password) {
      await this.setPassword(this._password);
    }
  });

module.exports = mongoose.model('User', UserSchema);
