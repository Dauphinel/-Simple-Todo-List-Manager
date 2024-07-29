"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const todo_1 = __importDefault(require("./todo"));
const todo_storage_1 = __importDefault(require("./todo-storage"));
const todo = new todo_1.default();
const storage = new todo_storage_1.default('data.json');
const rl = readline_1.default.createInterface({
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield storage.loadTasks();
        tasks.forEach(task => todo.addTask(task.description));
        tasks.forEach(task => task.completed && todo.markTaskAsComplete(task.id));
        function prompt() {
            rl.question(menu, (option) => __awaiter(this, void 0, void 0, function* () {
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
                            }
                            else {
                                console.log('Task not found.');
                            }
                            prompt();
                        });
                        break;
                    case '4':
                        rl.question('Enter task ID to remove: ', id => {
                            if (todo.removeTask(parseInt(id))) {
                                console.log('Task removed.');
                            }
                            else {
                                console.log('Task not found.');
                            }
                            prompt();
                        });
                        break;
                    case '5':
                        yield storage.saveTasks(todo.viewTasks());
                        rl.close();
                        break;
                    default:
                        console.log('Invalid option.');
                        prompt();
                }
            }));
        }
        prompt();
    });
}
main();
