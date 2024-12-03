import pandas as pd
import mysql.connector
from mysql.connector import Error

pd.set_option('display.max_columns', None)  # 显示所有列
pd.set_option('display.max_colwidth', None)  # 显示完整的单元格内容
pd.set_option('display.expand_frame_repr', False)  # 防止换行显示

# 读取 Excel 文件
file_path = 'E:/khan大作业/Khan-Assignment/backend_competition/2025QSWorldUniversityRankings.xlsx'
# file_path = 'E:/khan大作业/Khan-Assignment/backend_competition/2024QSWorldUniversityRankings.xlsx'
data = pd.read_excel(file_path, skiprows=[1])  # 跳过第二行（行号从0开始，所以跳过行1）

# 清理列名，替换空格为下划线，并去除其他特殊字符
data.columns = [col.strip().replace(' ', '_').replace('(', '').replace(')', '').replace('/', '_') for col in data.columns]

# 查看数据结构，确认列名
print(data.head())  # 打印前几行查看结构

# 针对 'Overall_SCORE' 列，处理 '-' 为 None 或默认值
data['Overall_SCORE'] = data['Overall_SCORE'].replace('-', None)  # 或者替换为默认值 '0'

# 连接 MySQL 数据库
try:
    # 先连接到 MySQL 服务器（没有指定数据库）
    db_connection = mysql.connector.connect(
        host="localhost",      # MySQL 主机
        user="root",           # MySQL 用户名
        password="123456"      # MySQL 密码
    )

    if db_connection.is_connected():
        print("成功连接到 MySQL 服务器")
        cursor = db_connection.cursor()

        # 创建数据库，如果数据库不存在
        cursor.execute("CREATE DATABASE IF NOT EXISTS qs_ranking")
        print("数据库 'qs_ranking' 创建成功。")

        # 选择数据库
        db_connection.database = "qs_ranking"

        # 创建表结构（根据清理后的列名）
        create_table_query = "CREATE TABLE IF NOT EXISTS 2025university_rankings (id INT AUTO_INCREMENT PRIMARY KEY"

        # 依据列名动态创建字段
        for column in data.columns:
            if column == 'Overall_SCORE':  # 对 Overall_SCORE 列进行特殊处理
                create_table_query += f", `{column}` VARCHAR(255)"  # 设为 VARCHAR 类型
            elif "score" in column.lower():  # 处理其他含有 "score" 字段的列
                create_table_query += f", `{column}` DECIMAL(5,2)"  # 设置为 DECIMAL 类型
            else:
                create_table_query += f", `{column}` VARCHAR(255)"  # 其他列设置为 VARCHAR 类型
        
        create_table_query += ")"

        # 执行创建表格的 SQL 语句
        cursor.execute(create_table_query)
        print("数据库表创建成功。")

        # 插入数据
        insert_query = f"INSERT INTO 2025university_rankings ({', '.join([f'`{col}`' for col in data.columns])}) VALUES ({', '.join(['%s']*len(data.columns))})"

        # 遍历 Excel 数据并插入
        for index, row in data.iterrows():
            # 替换 NaN 为 None
            row_data = tuple(None if pd.isna(val) else val for val in row)
            cursor.execute(insert_query, row_data)

        # 提交事务
        db_connection.commit()
        print(f"{cursor.rowcount} rows inserted successfully into university_rankings.")

except Error as e:
    print(f"Error: {e}")
finally:
    if db_connection.is_connected():
        cursor.close()
        db_connection.close()
        print("MySQL connection is closed.")
