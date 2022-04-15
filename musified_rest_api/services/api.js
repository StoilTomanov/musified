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

async function submitQuiz(lessonId, quizData) {
    const currentLesson = await Lesson.findById({ _id: lessonId });
    if (!currentLesson) {
        throw new Error('No record found!');
    }

    const extractedQuizData = {
        'quiestion-1': quizData['question-1'],
        'answer-1': quizData['answer-1'],
        'answer-2': quizData['answer-2'],
        'answer-3': quizData['answer-3'],
        'answer-4': quizData['answer-4'],
        'quiestion-2': quizData['question-2'],
        'answer-5': quizData['answer-5'],
        'answer-6': quizData['answer-6'],
        'answer-7': quizData['answer-7'],
        'answer-8': quizData['answer-8'],
        'quiestion-3': quizData['question-3'],
        'answer-9': quizData['answer-9'],
        'answer-10': quizData['answer-10'],
        'answer-11': quizData['answer-11'],
        'answer-12': quizData['answer-12'],
    }

    for (const key in quizData) {
        const word = key.slice(0, 14);
        const indexOfQuestion = key.slice(15);
        if (word == 'correct-answer') {
            if (quizData[key] != '') {
                if (Number(indexOfQuestion) <= 4) {
                    extractedQuizData['correct-answer-1'] = quizData[key];
                } else if (Number(indexOfQuestion) > 4 && Number(indexOfQuestion) <= 8) {
                    extractedQuizData['correct-answer-2'] = quizData[key];
                } else if (Number(indexOfQuestion) > 8 && Number(indexOfQuestion) <= 12) {
                    extractedQuizData['correct-answer-3'] = quizData[key];
                }
            }
        }
    }

    if (extractedQuizData['correct-answer-1'] == '' && extractedQuizData['correct-answer-2'] == '' && extractedQuizData['correct-answer-3'] == '') {
        throw new Error('Invalid data');
    } else if (extractedQuizData['correct-answer-1'] == undefined && extractedQuizData['correct-answer-2'] == undefined && extractedQuizData['correct-answer-3'] == undefined) {
        throw new Error('Invalid data');
    }

    if (extractedQuizData['question-1'] != '' && extractedQuizData['correct-answer-1'] == undefined) {
        throw new Error('Invalid data');
    } else if (extractedQuizData['question-2'] != '' && extractedQuizData['correct-answer-2'] == undefined) {
        throw new Error('Invalid data');
    } else if (extractedQuizData['question-3'] != '' && extractedQuizData['correct-answer-3'] == undefined) {
        throw new Error('Invalid data');
    }


    currentLesson.quiz.push(extractedQuizData);
    await currentLesson.save();

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
    submitQuiz,
}