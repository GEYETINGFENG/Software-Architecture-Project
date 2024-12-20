import { Article } from '../models/Article.js';

// 发布评论
const publishComment = async (ctx) => {
  try {
    const { articleTitle } = ctx.params;
    const { comment } = ctx.request.body;
    const author = ctx.state.user.username;
    // 检查是否提供了所有必要的字段
    if (!author || !comment || !articleTitle) {
      ctx.status = 400;
      ctx.body = { message: 'Author, articleTitle and comment are required' };
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
    article.comments.push(`${author}: ${comment}`);
    // 保存文章到数据库
    await article.save();

    ctx.body = {
      message: 'Comment published successfully',
      article,
    };

  } catch (error) {
    console.error('Error saving comment:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to publish comment' };
  }
};

// 删除评论
const deleteComment = async (ctx) => {
  const { articleTitle } = ctx.params;
  const { commentContent } = ctx.request.body;  // 从请求体中获取评论内容

  try {
    // 查找文章
    const article = await Article.findOne({ title: articleTitle });
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }

    // 查找该评论并删除
    const commentIndex = article.comments.findIndex(
      (comment) => comment === commentContent
    );

    if (commentIndex === -1) {
      ctx.status = 404;
      ctx.body = { message: 'Comment not found' };
      return;
    }

    // 删除评论
    article.comments.splice(commentIndex, 1);
    // 保存修改后的文章
    await article.save();

    ctx.status = 200;
    ctx.body = { message: 'Comment deleted successfully' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
};

export{publishComment,deleteComment}