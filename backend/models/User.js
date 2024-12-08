import mongoose from 'mongoose';
// 创建连接到 User 数据库
const userlistConnection = mongoose.createConnection('mongodb://localhost:27017/SoftwareArchitecure');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required:true},
  password: { type: String, required: true },

   // 发布的所有博客内容
   blogs: [
    { type: String }
  ],

  // 所有博客获得的累计点赞数
  totalLikes: { type: Number, default: 0 },

  // 个人简介内容
  personal_intro: { type: String },

  // 参加对战的数量
  battlesParticipated: { type: Number, default: 0 },

  // 收藏的博客标题
  favoriteTitles: [
    { type: String }
  ],

  // 点赞的博客标题
  likedTitles: [
    { type: String }
  ],
});

const User = userlistConnection.model('User', userSchema);
export{User};