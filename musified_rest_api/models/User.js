const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required.'] },
    username: { type: String, required: [true, 'Username is required.'] },
    date_joined: { type: String, required: true },
    level: { type: String, required: true, default: 'Beginner' },
    passed_courses: { type: Number, required: true, default: 0 },
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