const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'dj3D93LkdO3e93af0c23gjcg54y7co4g8u354gn24c8gmxqj34m58umv<dq0Opoe3r323r957nce'
const blacklist = [];

async function login(username, password) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') })

    if (!user) {
        throw new Error('Incorrect username or password.')
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect username or password.');
    } else if (match) {
        return createSession(user);
    }
}

async function register(username, email, password) {

    const existing = await User.findOne({ username: new RegExp(`^${username}$`, 'i') })
    if (existing) {
        throw new Error('User already exists.')
    }

    const hasAdmin = await User.find({});
    const newDate = new Date();
    if (hasAdmin.length == 0) {
        const user = new User({
            email,
            username,
            isAdmin: true,
            dateJoined: `${newDate.getDate()}.${Number(newDate.getMonth()) + 1}.${newDate.getFullYear()}`,
            hashedPassword: await bcrypt.hash(password, 10),
        });
        await user.save();
        return createSession(user);
    } else {
        const user = new User({
            email,
            username,
            isAdmin: false,
            dateJoined: `${newDate.getDate()}.${Number(newDate.getMonth()) + 1}.${newDate.getFullYear()}`,
            hashedPassword: await bcrypt.hash(password, 10),
        });
        await user.save();
        return createSession(user);
    }
}

function logout(token) {
    blacklist.push(token);
}

async function getUserData(userId) {
    return await User.findById({ _id: userId });
}

async function updateUser(userId, lessonId, action) {
    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new Error('User does not exists.')
    }
    if (lessonId) {
        if (action == 'subscribe') {
            if (!user.subscriptions.includes(lessonId)) {
                user.subscriptions.push(lessonId);
                await user.save();
            } else {
                throw new Error('User is already subscribed for this lesson');
            }
        } else if (action == 'unsubscribe') {
            if (user.subscriptions.includes(lessonId)) {
                const index = user.subscriptions.indexOf(lessonId);
                user.subscriptions.splice(index, 1);
                await user.save();
            } else {
                throw new Error('User is already unsubscribed for this lesson');
            }
        } else if (action == 'pass-course') {
            user.passed_courses++;
            await user.save();
        }
    }

}

function verifySession(token) {
    const payload = jwt.verify(token, JWT_SECRET);
    if (blacklist.includes(token)) {
        throw new Error('Invalid token')
    }
    return {
        username: payload.username,
        email: payload.email,
        _id: payload._id,
        token,
    }
}

function createSession(user) {
    return {
        email: user.email,
        username: user.username,
        _id: user._id,
        isAdmin: user.isAdmin,
        accessToken: jwt.sign({
            username: user.username,
            email: user.email,
            _id: user._id
        }, JWT_SECRET, {
            expiresIn: '20 hours',
        })
    };
}

module.exports = {
    login,
    register,
    logout,
    verifySession,
    getUserData,
    updateUser,
}