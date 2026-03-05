const mongoose = require('mongoose');
const passportLocalMongooseModule = require('passport-local-mongoose');
const Schema = mongoose.Schema;
//to get function from the object
const passportLocalMongoose =
    passportLocalMongooseModule.default || passportLocalMongooseModule;

const userSchema = new Schema({
    //username and password will be added by passport-local-mongoose plugin
    email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;
