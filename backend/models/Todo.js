const db = require("./database");

module.exports = {
  /** insert an a todo javascript object
   *
   * @param {*} data {title:"new todo", status:"pending"}
   * @returns
   */
  insert: async (data) => {
    let columnString = Object.keys(data).toString();
    let valueString = "'" + Object.values(data).join("','") + "'";

    return await db.query(
      `INSERT INTO  todos (${columnString}) VALUES (${valueString});`
    );
  },
  /**select one todo by id
   *
   * @param {*} id
   * @returns
   */
  selectOne: async (id) => {
    return await db.query(`SELECT * FROM todos WHERE id =${id};`);
  },
  /** return all todo
   *
   * @returns array
   */
  selectAll: async () => {
    return await db.query(`SELECT * FROM todos;`);
  },

  /**delete a todo by id
   *
   * @param {*} id
   * @returns
   */
  delete: async (id) => {
    return await db.query(`DELETE FROM todos WHERE  id=${id}`);
  },
  /** update todo with id
   *
   * @param {*} id
   * @param {*} title
   * @param {*} status
   * @returns
   */
  update: async (id, status = "pending") => {
    return await db.query(
      `UPDATE todos SET status='${status}' WHERE id=${id};`
    );
  },
};
