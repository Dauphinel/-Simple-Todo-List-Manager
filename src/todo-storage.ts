import { promises as fs } from 'fs';
import { Task } from './types';

class TodoStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  async loadTasks(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      if (data.trim() === '') {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }
}

export default TodoStorage;
