import Router from 'koa-router';
import * as universityService from '../Service/universityService.js';
const universityRouter = new Router();

// 查询院校排名接口
universityRouter.get('/qsRanking', universityService.getUniversityRanking);
export default universityRouter; 