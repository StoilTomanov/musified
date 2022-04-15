const Message = require("../models/Messages");

async function getAllMessages() {
    const result = await Message.find({});
    return result;
}

async function createNewMessage(from, message) {
    const newMessage = new Message({
        from,
        message
    })
    await newMessage.save();
}

async function deleteMessage(messageId) {
    const deletedMsg = Message.findByIdAndDelete({ _id: messageId })
}

module.exports = {
    getAllMessages,
    createNewMessage,
    deleteMessage
}