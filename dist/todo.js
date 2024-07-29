"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }
    addTask(description) {
        const task = { id: this.currentId++, description, completed: false };
        this.tasks.push(task);
        return task;
    }
    viewTasks() {
        return this.tasks;
    }
    markTaskAsComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    }
    removeTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.default = Todo;
