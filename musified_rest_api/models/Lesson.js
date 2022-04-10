const { model, Schema, Types: { ObjectId } } = require('mongoose');

const lessonSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'description is required'] },
    theory: { type: String, required: [true, 'Theory is required and it must be less than 430 characters long'], maxlength: 430 },
    level: { type: String, required: [true, 'Level is required'] },
    duration: { type: String, required: [true, 'Duration is required'] }, // TODO: consider changing the tipe to string so you can pass either minutes, hours, etc.
    videoUrl: { type: String, required: [true, 'Viedo Url address is required'] },
    imagePreviewUrl: { type: String, default: '../assets/no_image.png' },
    progress: { type: Number, default: 0 }, // TODO: figure out how to set a different progress for each user
    createdOn: { type: String, required: [true, 'Date is required. Please select one'] },
    subscribers: { type: [ObjectId], default: [], ref: 'User' },
    views: { type: Number, default: 0 },
    rating: { type: [ObjectId], default: [], ref: 'User' },
    owner: { type: ObjectId, ref: 'User' }
});

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;