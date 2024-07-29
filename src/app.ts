import readline from 'readline';
import Todo from './todo';
import TodoStorage from './todo-storage';

const todo = new Todo();
const storage = new TodoStorage('data.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = `
Choose an option:
1. Add Task
2. View Tasks
3. Mark Task as Complete
4. Remove Task
5. Exit
`;

async function main() {
  const tasks = await storage.loadTasks();
  tasks.forEach(task => {
    const newTask = todo.addTask(task.description);
    if (task.completed) {
      todo.markTaskAsComplete(newTask.id);
    }
  });

  function prompt() {
    rl.question(menu, async (option) => {
      switch (option.trim()) {
        case '1':
          rl.question('Enter task description: ', description => {
            const task = todo.addTask(description);
            console.log(`Task added: ${task.description}`);
            prompt();
          });
          break;
        case '2':
          console.log('Tasks:');
          todo.viewTasks().forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.completed ? 'x' : ' '}]`);
          });
          prompt();
          break;
        case '3':
          rl.question('Enter task ID to mark as complete: ', id => {
            if (todo.markTaskAsComplete(parseInt(id))) {
              console.log('Task marked as complete.');
            } else {
              console.log('Task not found.');
            }
            prompt();
          });
          break;
        case '4':
          rl.question('Enter task ID to remove: ', id => {
            if (todo.removeTask(parseInt(id))) {
              console.log('Task removed.');
            } else {
              console.log('Task not found.');
            }
            prompt();
          });
          break;
        case '5':
          await storage.saveTasks(todo.viewTasks());
          rl.close();
          break;
        default:
          console.log('Invalid option.');
          prompt();
      }
    });
  }

  prompt();
}

main();
