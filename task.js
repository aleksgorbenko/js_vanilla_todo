var todoList = {
  todos: [],
  displayTodos: function() {
    console.log("My Todos", this.todos);
  },
  addTodo: function(todoText) {
    this.todos.push( {
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  chnageTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  }
  toggleCompleted: function(position) {
    var todo = todos[position]
    todo.completed = !todo.completed;
    this.displayTodos();
  }
}