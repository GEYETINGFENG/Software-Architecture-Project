import {  createMySQLPool } from '../config/database.js';
const pool = createMySQLPool();

// 查询院校排名
const getUniversityRanking = async (ctx) => {
    const { name, year, location, sort_by, order_by } = ctx.query;
    console.log('Received parameters:', { name, year, location, sort_by, order_by });
  
    // 根据年份选择表名
    let tableName = year === '2024' ? '2024university_rankings' : '2025university_rankings';
  
    // 确保 name 和 location 为空时默认设置为空字符串 ""
    const validName = name || '';
    const validLocation = location || '';
  
    // 排序字段，默认为 "This_Year_Rank" 和 "ASC"
    const validSortBy = sort_by && sort_by !== '' ? sort_by : 'This_Year_Rank';
    const validOrderBy = order_by && order_by !== '' ? order_by : 'ASC';
  
    // 构建 SQL 查询
    let sql = `SELECT * FROM \`${tableName}\` `;
  
    // 根据参数条件构建查询语句
    let conditions = [];
    let queryParams = [];
    if (validName) {
      conditions.push(`\`Institution_Name\` LIKE CONCAT('%', ?, '%')`);
      queryParams.push(validName);
    }
    if (validLocation && validLocation !== 'All') {
      conditions.push(`\`Location\` LIKE CONCAT('%', ?, '%')`);
      queryParams.push(validLocation);
    }
  
    if (conditions.length > 0) {
      sql += ` WHERE ` + conditions.join(' AND ');
    }
  
    // 排序部分
    sql += ` ORDER BY CAST(REPLACE(REPLACE(SUBSTRING_INDEX(\`${validSortBy}\`, '-', 1), '=', ''), '+', '') AS UNSIGNED) ${validOrderBy}`;
  
    try {
      // 执行查询，传入有效的查询参数
      const [rows] = await pool.promise().query(sql, queryParams);
      // 返回查询结果
      ctx.body = { data: rows };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Database query failed' };
    }
  };

export { getUniversityRanking };