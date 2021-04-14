const mysql = require("mysql2/promise");
require("dotenv").config(); //

const { env } = process;

exports.query = async (sql) => {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });
  const [results] = await connection.query(sql);

  return results;
};

exports.initialize = async () => {
  try {
    await this.query(
      "CREATE TABLE  IF NOT EXISTS `todos` ( `id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(200) NOT NULL  , `status` ENUM('pending','completed')  NOT NULL DEFAULT 'pending' , PRIMARY KEY (`id`));"
    );
  } catch (e) {
    console.log(e.toString());
  }
};
