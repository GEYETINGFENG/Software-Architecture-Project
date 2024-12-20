import Router from 'koa-router';
import * as universityController from '../controllers/universityController.js';
const universityRouter = new Router();

// 查询院校排名接口
universityRouter.get('/qsRanking', universityController.getUniversityRanking);
export default universityRouter; 