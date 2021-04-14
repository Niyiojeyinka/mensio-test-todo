/** help remove a todo from todo array bby index
 *
 * @param index index to remove
 */
const removeFromTodo = (todoindex, todos) => {
  return todos?.filter((todo, index) => {
    return todoindex != index;
  });
};

export default removeFromTodo;
