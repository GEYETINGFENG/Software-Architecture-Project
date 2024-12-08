// import mongoose from 'mongoose';
// import { User } from './models/User.js'; // 假设你已经按照上面的代码导出了 User 模型

// // 创建连接到 MongoDB 的连接
// const userlistConnection = mongoose.createConnection('mongodb://localhost:27017/SoftwareArchitecure');

// const insertUsers = async () => {
//   // 定义插入的用户数据
//   const usersData = [
//     {
//       username: 'user3',
//       email: 'user1@example.com',
//       password: 'lB2rbSK0PGq2QDJXXWVvhA==',
//       blogs: ['Blog 1 Title', 'Blog 2 Title'],
//       personal_intro: 'This is user1\'s introduction.',
//       battlesParticipated: 5,
//       favoriteTitles: ['Blog 3 Title', 'Blog 4 Title'],
//       likedTitles: ['Blog 1 Title']
//     },
//     {
//       username: 'user2',
//       email: 'user2@example.com',
//       password: 'lB2rbSK0PGq2QDJXXWVvhA==',
//       blogs: ['Blog 1 Title'],
//       personal_intro: 'This is user2\'s introduction.',
//       battlesParticipated: 3,
//       favoriteTitles: ['Blog 1 Title'],
//       likedTitles: ['Blog 2 Title']
//     },
//     {
//       username: 'user4',
//       email: 'user3@example.com',
//       password: 'lB2rbSK0PGq2QDJXXWVvhA==',
//       blogs: ['Blog 5 Title', 'Blog 6 Title'],
//       personal_intro: 'This is user3\'s introduction.',
//       battlesParticipated: 8,
//       favoriteTitles: ['Blog 2 Title', 'Blog 3 Title'],
//       likedTitles: ['Blog 5 Title']
//     }
//   ];

//   try {
//     // 插入多个用户数据
//     await User.insertMany(usersData);
//     console.log('Users inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting users:', error);
//   } finally {
//     // 关闭连接
//     userlistConnection.close();
//   }
// };

// // 执行插入操作
// insertUsers();
// import mongoose from 'mongoose';
// import { Article } from './models/Article.js'; // 假设你已经根据上面的代码导出了 Article 模型

// // 创建连接到 MongoDB 的连接
// const articleConnection = mongoose.createConnection('mongodb://localhost:27017/SoftwareArchitecure');

// // 插入多个文章数据
// const insertArticles = async () => {
//   const articlesData = [
//     {
//       title: 'How to learn JavaScript',
//       author: 'user1',
//       content: 'JavaScript is a powerful language for web development...',
//       likes: 100,
//       favorites: 50,
//       comments: [
//         {
//           commenter: 'user2',
//           content: 'Great article, very helpful!',
//           timestamp: new Date(),
//           replies: [
//             {
//               replier: 'user1',
//               content: 'Thank you for your feedback!',
//               timestamp: new Date()
//             }
//           ]
//         },
//         {
//           commenter: 'user3',
//           content: 'I found the examples a bit confusing.',
//           timestamp: new Date(),
//           replies: []
//         }
//       ]
//     },
//     {
//       title: 'Understanding React Hooks',
//       author: 'user2',
//       content: 'React Hooks are an important part of modern React development...',
//       likes: 150,
//       favorites: 70,
//       comments: [
//         {
//           commenter: 'user1',
//           content: 'This helped me understand hooks better!',
//           timestamp: new Date(),
//           replies: []
//         },
//         {
//           commenter: 'user3',
//           content: 'Can you explain useEffect in more detail?',
//           timestamp: new Date(),
//           replies: [
//             {
//               replier: 'user2',
//               content: 'Sure! useEffect is used for side effects like data fetching...',
//               timestamp: new Date()
//             }
//           ]
//         }
//       ]
//     }
//   ];

//   try {
//     // 批量插入文章数据
//     await Article.insertMany(articlesData);
//     console.log('Articles inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting articles:', error);
//   } finally {
//     // 关闭连接
//     articleConnection.close();
//   }
// };

// // 执行插入操作
// insertArticles();

import mongoose from 'mongoose';
import { Article } from './models/Article.js';  // 引入 Article 模型

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.log('Database connection error:', err));

// 插入多个文章数据
const articles = [
  {
    title: 'How to Learn JavaScript',
    author: 'user3',
    content: 'JavaScript is a powerful language for building web applications...',
    likes: 100,
    favorites: 50,
    comments: ['Great article!', 'Very informative.']
  },
  {
    title: 'Understanding Node.js',
    author: 'user3',
    content: 'Node.js is a runtime that allows JavaScript to be run on the server side...',
    likes: 120,
    favorites: 80,
    comments: ['Nice explanation.', 'I learned a lot!']
  },
  {
    title: 'Vue.js vs React.js',
    author: 'user2',
    content: 'Vue.js and React.js are both popular JavaScript frameworks...',
    likes: 150,
    favorites: 90,
    comments: ['Good comparison!', 'I prefer Vue.js, but React.js is nice too.']
  },
  {
    title: 'A Guide to MongoDB',
    author: 'user',
    content: 'MongoDB is a NoSQL database, widely used for web development...',
    likes: 200,
    favorites: 120,
    comments: ['MongoDB is easy to use.', 'Thanks for the tutorial!']
  }
];

// 批量插入文章数据
const insertArticles = async () => {
  try {
    const result = await Article.insertMany(articles);
    console.log('Articles inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting articles:', error);
  }
};

// 执行插入操作
insertArticles();
