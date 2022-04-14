const Lesson = require('../models/Lesson');

async function create(lesson) { // param is the lesson object
    const result = new Lesson(lesson);
    await result.save();
    return result;
}

async function readAll() {
    const result = await Lesson.find({});
    return result;
}

async function getMyLessons(userId) {
    const result = await Lesson.find({});
    const filteredResults = result.filter(lesson => lesson.subscribers.includes(userId))
    return filteredResults;
}

async function updateProgress(userId, lessonId, ratingScore) {
    const result = await Lesson.findById({ _id: lessonId });
    if (result) {
        result.rating.push(userId);
        result.ratingScore += Number(ratingScore);
        result.save();
    } else {
        throw new Error('Course is not found');
    }
}

async function updateViewsScore(lessonId) {
    const result = await Lesson.findById({ _id: lessonId });
    if (result) {
        result.views++;
        result.save();
    } else {
        throw new Error('Course is not found');
    }
}

async function getAvailableLessons(userId) {
    const result = await Lesson.find({});
    const filteredResults = result.filter(lesson => !lesson.subscribers.includes(userId))
    return filteredResults;
}

async function readById(id) {
    const result = await Lesson.findById({ _id: id }).lean();
    return result;
}

async function update(lesson, id) { // param is the lesson object
    const result = await Lesson.findById({ _id: id });
    result.name = lesson.name;
    result.description = lesson.description;
    result.level = lesson.level;
    result.duration = lesson.duration;
    result.videoUrl = lesson.videoUrl;
    result.imagePreviewUrl = lesson.imagePreviewUrl;
    result.progress = lesson.progress;
    result.views = lesson.views;

    await result.save();
    return result;
}

async function deleteRecordById(id) { // param is the lesson object
    const result = await Lesson.findOneAndDelete({ _id: id });
    return result;
}

async function subscribeToLesson(lessonId, userId) {
    const currentLesson = await Lesson.findById({ _id: lessonId });
    if (!currentLesson) {
        throw new Error('No record found!');
    }

    if (currentLesson.subscribers.includes(userId)) {
        throw new Error('You are already subscribed to this course');
    }

    currentLesson.subscribers.push(userId);
    await currentLesson.save();

}

async function unsubscribeToLesson(lessonId, userId) {
    const currentLesson = await Lesson.findById({ _id: lessonId });
    if (!currentLesson) {
        throw new Error('No record found!');
    }

    if (currentLesson.subscribers.includes(userId)) {
        const index = currentLesson.subscribers.indexOf(userId);
        currentLesson.subscribers.splice(index, 1);
    } else {
        throw new Error('You are not subscribed for this course');
    }
    await currentLesson.save();
}

module.exports = {
    create,
    readAll,
    readById,
    update,
    deleteRecordById,
    subscribeToLesson,
    getMyLessons,
    getAvailableLessons,
    unsubscribeToLesson,
    updateProgress,
    updateViewsScore,
}