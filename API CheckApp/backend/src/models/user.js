const mongosee = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const {
    Schema
} = mongosee;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password:  { type: String, required: true },
    name: String,
    pinEntidad: String,
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

userSchema.pre('save', function(next) {
  let user = this
  //if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

userSchema.methods.encriptPassword = (password) => {
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return password
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongosee.model('users', userSchema); //se usan los datos de userSchema y se guardan en la tabla users