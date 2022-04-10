const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required.'] },
    username: { type: String, required: [true, 'Username is required.'] },
    isAdmin: { type: Boolean, required: true },
    hashedPassword: { type: String, required: true },
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;