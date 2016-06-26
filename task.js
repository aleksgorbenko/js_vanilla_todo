var todoList = {
  todos: [],
  // displayTodos: function() {
  //   if (this.todos.length === 0) {
  //     console.log("your todo ist is empty")
  //   } else {
  //     for (var i = 0; i < this.todos.length; i++) {
  //       console.log(this.todos[i].todoText);

  //       if (this.todos[i].completed === true) {
  //         console.log('(x)', this.todos[i].todoText);
  //       } else {
  //         console.log('( )', this.todos[i].todoText);
  //       }
  //     }
  //   }
  // },
  addTodo: function(todoText) {
    this.todos.push( {
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // get number of completed todos
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    // case 1: if everything is true, make it false
    if (totalTodos === completedTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    // case 2: otherwise, make everything true
    } else {
      for (var i = 0; i < totalTodos; i++){
        this.todos[i].completed = true;
      }
    }

  }
};

// code 65 - 75 is exactly the same as 76 - 83!!
// 65 - 75 is not organised and is not DRY
//
// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');

// displayTodosButton.addEventListener('click', function() {
//   todoList.displayTodos();
// });

// toggleAllButton.addEventListener('click', function() {
//   todoList.toggleAll();
// });

// below is a much better way to write code

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput")
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value = "";
    changeTodoPositionInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
     // deltes all the inner <li> items every time the function is called
    todosUl.innerHTML = '';
    for (var i = 0 ; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {

      // get the element that was clicked
      var elementClicked = event.target;

      // check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setupEventListeners();