const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required.'] },
    username: { type: String, required: [true, 'Username is required.'] },
    dateJoined: { type: String, required: true },
    level: { type: String, required: true, default: 'Beginner' },
    profilePicture: { type: String, default: '../assets/user-logo.png' },
    passed_courses: { type: Number, required: true, default: 0 },
    subscriptions: { type: [ObjectId], default: [] },
    messages: { type: [Object], default: [] },
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