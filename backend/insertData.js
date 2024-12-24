import mongoose from 'mongoose';
import { Quiz } from './Models/Quiz.js'; 
// 创建连接到 MongoDB 的连接
const quizlistConnection = mongoose.createConnection('mongodb://localhost:27017/SoftwareArchitecure');

// 数据要插入的数组
const quizzes = [
  {
    questionId: "1",
    question: "What has hands but can’t clap?",
    options: ["A clock", "A doll", "A robot", "A glove"],
    answer: "A clock",
  },
  {
    questionId: "2",
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    options: ["An echo", "A shadow", "A dream", "A breeze"],
    answer: "An echo",
  },
  {
    questionId: "3",
    question: "The more of this you take, the more you leave behind. What is it?",
    options: ["Time", "Footsteps", "Memories", "Holes"],
    answer: "Footsteps",
  },
  {
    questionId: "4",
    question: "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?",
    options: ["Breath", "A bubble", "Hope", "A shadow"],
    answer: "Breath",
  },
  {
    questionId: "5",
    question: "What can run but never walks, has a bed but never sleeps, has a mouth but never talks?",
    options: ["A river", "A car", "A shadow", "A machine"],
    answer: "A river",
  },
  {
    questionId: "6",
    question: "What has many keys but can’t open a single lock?",
    options: ["A piano", "A map", "A treasure chest", "A door"],
    answer: "A piano",
  },
  {
    questionId: "7",
    question: "What has a heart that doesn’t beat?",
    options: ["An artichoke", "A rock", "A shadow", "A robot"],
    answer: "An artichoke",
  },
  {
    questionId: "8",
    question: "What begins with T, ends with T, and has T in it?",
    options: ["A teapot", "A train", "A tent", "A ticket"],
    answer: "A teapot",
  },
  {
    questionId: "9",
    question: "What has an eye but can’t see?",
    options: ["A needle", "A hurricane", "A storm", "A potato"],
    answer: "A needle",
  },
  {
    questionId: "10",
    question: "What comes down but never goes up?",
    options: ["Rain", "A shadow", "A balloon", "An anchor"],
    answer: "Rain",
  },
];


// 插入数据到 MongoDB 的函数
const insertQuizzes = async () => {
  try {
    const quizModel = quizlistConnection.model('Quiz', Quiz.schema);

    // 插入数据
    const result = await quizModel.insertMany(quizzes);
    console.log('Quizzes inserted successfully:', result);

    // 关闭数据库连接
    quizlistConnection.close();
  } catch (error) {
    console.error('Error inserting quizzes:', error);

    // 如果有错误也要关闭数据库连接
    quizlistConnection.close();
  }
};

// 调用插入函数
insertQuizzes();

























// const insertUsers = async () => {
//   // 定义插入的用户数据
//   const usersData = [
//     {
//       username: 'user3',
//       email: 'user1@example.com',
//       password: 'lB2rbSK0PGq2QDJXXWVvhA==',
//       blogs: ['A Brief History of Ancient Egypt', 'How Technology is Changing Education', 'The Rise of Machine Learning', 'The Impact of Technology on Society', 'Understanding AI in 2024'],
//       personal_intro: 'This is user1\'s introduction.',
//       battlesParticipated: 5,
//       favoriteTitles: ['A Brief History of Ancient Egypt', 'How Technology is Changing Education', 'The Rise of Machine Learning', 'The Impact of Technology on Society', 'Understanding AI in 2024'],
//       likedTitles: ['A Brief History of Ancient Egypt', 'How Technology is Changing Education', 'The Rise of Machine Learning', 'The Impact of Technology on Society', 'Understanding AI in 2024']
//     }
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

// import mongoose from 'mongoose';
// import { Article } from './models/Article.js';  // 引入 Article 模型

// // 连接到 MongoDB 数据库
// mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Database connected successfully'))
// .catch(err => console.log('Database connection error:', err));

// // 插入多个文章数据
// const articles = [
//   {
//     title: 'The Wonders of Japan',
//     author: 'user9',
//     content: 'Japan offers a rich blend of tradition and modernity. From the neon lights of Tokyo to the serene beauty of Kyoto’s temples, this article explores some of the most iconic spots...',
//     likes: 19,
//     favorites: 11,
//     comments: [
//       'Japan is such a fascinating country, this article really captures its essence.',
//       'I would love to visit Japan one day, this is a great guide!'
//     ]
//   },
//   {
//     title: 'Exploring the Streets of Paris',
//     author: 'user10',
//     content: 'Paris is known for its stunning architecture, delicious food, and rich history. In this article, we take a closer look at some of the most iconic streets and neighborhoods...',
//     likes: 18,
//     favorites: 15,
//     comments: [
//       'Paris is a dream destination, I love this article!',
//       'Such a beautiful city, can’t wait to explore it one day.'
//     ]
//   },
//   {
//     title: 'Understanding AI in 2024',
//     author: 'user0',
//     content: 'AI continues to advance in 2024. With new breakthroughs in machine learning, natural language processing, and neural networks, we are seeing AI become even more integrated into our lives...',
//     likes: 22,
//     favorites: 13,
//     comments: [
//       '2024 is going to be an exciting year for AI, can’t wait to see what’s next.',
//       'This is a great look at the current state of AI, really informative.'
//     ]
//   },
//   {
//     title: 'How to Build Your First AI Model',
//     author: 'user1',
//     content: 'Building your first AI model can be daunting, but with the right tools and knowledge, anyone can do it. In this article, we’ll walk through the process step by step...',
//     likes: 24,
//     favorites: 15,
//     comments: [
//       'This guide was incredibly helpful for beginners!',
//       'Can\'t wait to try building my first AI model.'
//     ]
//   },
//   {
//     title: 'The Evolution of Deep Learning',
//     author: 'user2',
//     content: 'Deep learning has evolved from basic neural networks to the sophisticated architectures we see today. This article takes a deep dive into the evolution of deep learning...',
//     likes: 23,
//     favorites: 14,
//     comments: [
//       'Deep learning is so fascinating, I can’t wait to learn more!',
//       'Amazing to see how far deep learning has come in recent years.'
//     ]
//   },
//   {
//     title: 'Machine Learning in Healthcare',
//     author: 'user3',
//     content: 'Machine learning is transforming the healthcare industry, from improving diagnostics to personalizing treatment plans. In this article, we explore how ML is revolutionizing healthcare...',
//     likes: 21,
//     favorites: 25,
//     comments: [
//       'Healthcare and AI are a perfect match. Great article!',
//       'This is such an important application of machine learning.'
//     ]
//   },
//   {
//     title: 'Understanding AI in 2024',
//     author: 'user4',
//     content: 'AI has come a long way in 2024, with new advancements in quantum computing, robotics, and machine learning. This article explores the cutting-edge developments that are shaping the future...',
//     likes: 25,
//     favorites: 16,
//     comments: [
//       'So much innovation in AI, I love reading about these new developments.',
//       '2024 will be a game-changer for AI technology!'
//     ]
//   },
//   {
//     title: 'Mindfulness for Beginners',
//     author: 'user5',
//     content: 'Mindfulness is the practice of being fully present in the moment, free from distractions. This article will introduce you to mindfulness techniques that anyone can try...',
//     likes: 85,
//     favorites: 15,
//     comments: [
//       'I’ve been trying mindfulness lately, this really helped!',
//       'A great introduction to mindfulness for beginners.'
//     ]
//   },
//   {
//     title: 'Personal Growth Through Meditation',
//     author: 'user6',
//     content: 'Meditation has been shown to have countless benefits, from reducing stress to increasing focus. This article explores the role of meditation in personal growth...',
//     likes: 20,
//     favorites: 11,
//     comments: [
//       'I’ve always wanted to start meditating, this is the perfect starting point.',
//       'Meditation is truly transformative, great article!'
//     ]
//   },
//   {
//     title: 'How to Practice Gratitude Daily',
//     author: 'user7',
//     content: 'Gratitude is a powerful practice that can improve your mental health and well-being. This article shares simple ways to incorporate gratitude into your daily routine...',
//     likes: 21,
//     favorites: 12,
//     comments: [
//       'Such a simple yet impactful practice, thank you for this!',
//       'Gratitude really changes your perspective on life.'
//     ]
//   },
//   {
//     title: 'Developing a Growth Mindset',
//     author: 'user8',
//     content: 'A growth mindset is key to achieving long-term success and personal development. In this article, we discuss strategies to cultivate a mindset that embraces challenges and learning...',
//     likes: 22,
//     favorites: 13,
//     comments: [
//       'A growth mindset can make such a difference in life!',
//       'Love the ideas in this article, will definitely try them.'
//     ]
//   },
//   {
//     title: 'Mindfulness for Beginners',
//     author: 'user9',
//     content: 'Mindfulness can reduce stress, improve focus, and increase emotional well-being. This article provides an easy-to-follow guide for beginners...',
//     likes: 18,
//     favorites: 15,
//     comments: [
//       'Mindfulness is something I need to try, thanks for this article!',
//       'So helpful for anyone starting their mindfulness journey.'
//     ]
//   },
//   {
//     title: 'A Brief History of Ancient Egypt',
//     author: 'user10',
//     content: 'Ancient Egypt is one of the most fascinating civilizations in history. From the pyramids to the hieroglyphs, the culture, art, and achievements of ancient Egypt are legendary...',
//     likes: 17,
//     favorites: 95,
//     comments: [
//       'I’ve always been fascinated by Ancient Egypt, this is a great summary!',
//       'The history of Egypt is so rich, I love reading about it.'
//     ]
//   },
//   {
//     title: 'The Role of the Roman Empire in Modern Society',
//     author: 'user0',
//     content: 'The Roman Empire, though long gone, has left an indelible mark on modern society. From architecture to legal systems, the influence of Rome is still visible today...',
//     likes: 21,
//     favorites: 25,
//     comments: [
//       'I didn’t realize how much of modern society is shaped by Rome!',
//       'This article made me appreciate Roman history so much more.'
//     ]
//   }
  
  
// ];

// // 批量插入文章数据
// const insertArticles = async () => {
//   try {
//     const result = await Article.insertMany(articles);
//     console.log('Articles inserted successfully:', result);
//   } catch (error) {
//     console.error('Error inserting articles:', error);
//   }
// };

// // 执行插入操作
// insertUsers();
