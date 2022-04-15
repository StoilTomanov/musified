const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    from: { type: String },
    message: { type: String },
})

const Message = model('Message', messageSchema);

module.exports = Message;