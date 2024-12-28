import { Article } from '../../Model/Article.js';

// 获取所有文章
const getArticles = async (ctx) => {
  try {
    const articles = await Article.find();
    if (!articles || articles.length === 0) {
      ctx.status = 404;
      ctx.body = { message: 'No articles' };
    } else {
      ctx.status = 200;
      ctx.body = { articles }; // 返回查询到的文章
    }
  } catch (error) {
    console.error('Error verifying token or fetching articles:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
};

// 发布文章
const publishArticle = async (ctx) => {
  try {
    const { title, content } = ctx.request.body;
    const author = ctx.state.user.username;
    // 检查是否提供了所有必要的字段
    if (!title || !author || !content) {
      ctx.status = 400;
      ctx.body = { message: 'Title, author, and content are required' };
      return;
    }

    // 创建一个新的文章对象
    const newArticle = new Article({ title, author, content });

    // 保存文章到数据库
    await newArticle.save();
    ctx.status = 201; // Created
    ctx.body = { message: 'Article published successfully', article: newArticle };

  } catch (error) {
    console.error('Error verifying token or saving article:', error);
    ctx.status = 500;
    ctx.body = { message: 'Failed to publish article' };
  }
};

// 获取一个用户的所有文章
const getUserArticles = async (ctx) => {
    try {
      const username=ctx.state.user.username;
      // 查询该用户发布的所有文章
      const articles = await Article.find({ author: username });
      if (!articles || articles.length === 0) {
        ctx.status = 404;
        ctx.body = { message: 'No articles found for this user' };
      } else {
        ctx.status = 200;
        ctx.body = { articles }; // 返回查询到的文章
      }
    } catch (error) {
      console.error('Error verifying token or fetching articles:', error);
      ctx.status = 500;
      ctx.body = { message: 'Internal server error' };
    }
  };

// 删除文章
const deleteArticle = async (ctx) => {
  const { articleTitle } = ctx.params; 

  try {
    // 查找该文章
    const article = await Article.findOne({ title: articleTitle });
    // 如果找不到文章，返回 404 错误
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }
    // 删除该文章
    await Article.deleteOne({ title: articleTitle });
    // 返回删除成功的响应
    ctx.status = 200;
    ctx.body = { message: 'Article deleted successfully' };

  } catch (error) {
    console.error('Error deleting article:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
};

const likeArticles = async (ctx) => {
  try {
    const { articleTitle } = ctx.params;
    const author = ctx.state.user.username;
    // 检查是否提供了所有必要的字段
    if (!author || !articleTitle) {
      ctx.status = 400;
      ctx.body = { message: 'Author and articleTitle are required' };
      return;
    }
    // 查找文章
    const article = await Article.findOne({ title: articleTitle });
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }
    // 添加评论到文章的 comments 数组，包含评论和评论作者
    article.likes++;
    // 保存文章到数据库
    await article.save();

    ctx.body = {
      message: 'Like added successfully',
      likes: article.likes, // 返回更新后的点赞数
    };

  } catch (error) {
    console.error('Error liking the article:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to add like' };
  }
}

const favoriteArticle = async (ctx) => {
  try {
    const { articleTitle } = ctx.params;
    const author = ctx.state.user.username;
    // 检查是否提供了所有必要的字段
    if (!author || !articleTitle) {
      ctx.status = 400;
      ctx.body = { message: 'Author and articleTitle are required' };
      return;
    }
    // 查找文章
    const article = await Article.findOne({ title: articleTitle });
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }
    // 添加评论到文章的 comments 数组，包含评论和评论作者
    article.favorites++;
    // 保存文章到数据库
    await article.save();

    ctx.body = {
      message: 'Like added successfully',
      favorites: article.favorites, // 返回更新后的点赞数
    };

  } catch (error) {
    console.error('Error liking the article:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to add favorite' };
  }
}

export{getArticles,publishArticle,getUserArticles,deleteArticle,likeArticles,favoriteArticle}