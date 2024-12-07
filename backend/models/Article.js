import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true }, // 作者
  context: { type: String, required: true }, // 文章内容
});

const Article = mongoose.model('Article', ArticleSchema);
export { Article };