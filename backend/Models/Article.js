import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // 帖子标题，必须唯一
  author: { type: String, required: true },              // 作者
  content: { type: String, required: true },             // 文章内容
  likes: { type: Number, default: 0 },                   // 点赞数，默认为 0
  favorites: { type: Number, default: 0 },               // 收藏数，默认为 0
  comments: [                    //存储评论内容的数组
    { type: String }
  ],
});

const Article = mongoose.model('Article', ArticleSchema);

export { Article };
