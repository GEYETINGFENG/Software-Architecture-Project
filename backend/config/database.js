import mongoose from 'mongoose';
import mysql from 'mysql2';
import mysql_config from './mysql_config.json' assert { type: 'json' };


// MongoDB 连接
const connectMongoDB=()=>{
    mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
}


const createMySQLPool=()=>{
    // 创建 MySQL 连接池
    const pool = mysql.createPool({
        host: mysql_config.host, // 你的数据库地址
        user: mysql_config.user, // 你的数据库用户名
        password: mysql_config.password, // 你的数据库密码
        database: mysql_config.database, // 你的数据库名称
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      
      // 测试 MySQL 连接
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to MySQL:', err.message);
          return;
        }
        console.log('Successfully connected to MySQL!');
        connection.release();  // 释放连接回连接池
      });
      return pool;//返回连接池
}


export { connectMongoDB,createMySQLPool };