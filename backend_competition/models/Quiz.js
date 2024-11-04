import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }, // 正确答案
  options: { type: [String], required: true }, // 选择题选项
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export { Quiz };
