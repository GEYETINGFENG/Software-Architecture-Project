import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true }, // 唯一索引
  question: { type: String, required: true, unique: true },
  options: { type: [String], required: true }, // 选择题选项
  answer: { type: String, required: true }, // 正确答案
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export { Quiz };
