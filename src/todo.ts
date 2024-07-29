import { Task } from './types';

class Todo {
  private tasks: Task[] = [];
  private currentId = 1;

  addTask(description: string): Task {
    const task: Task = { id: this.currentId++, description, completed: false };
    this.tasks.push(task);
    return task;
  }

  viewTasks(): Task[] {
    return this.tasks;
  }

  markTaskAsComplete(id: number): boolean {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }

  removeTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default Todo;
