import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Task} from "../models/task.model";
import {BoardService} from "./board.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly TASK_DB_KEY = 'tasks';
    private _taskId: string = '';

    constructor(private localStorageService: LocalStorageService,
                private boardService: BoardService) {
    }

    public getTaskList(): Task[] {
        return this.localStorageService.getAll(this.TASK_DB_KEY);
    }

    public getCurrentBoardTasks(): Task[] {
        const allTaskList = this.getTaskList()
        const tasks = allTaskList.filter(userTask => userTask.boardId === this.boardService.getBoardId())

        return tasks;
    }
    public addNewTask(newTask: Task): void {
        const allTasks: Task[] = this.getTaskList();
        allTasks.push(newTask);
        this.localStorageService.setAll(this.TASK_DB_KEY, allTasks);
    }

    get taskId(): string {
        return this._taskId;
    }

    set taskId(value: string) {
        this._taskId = value;
    }
}
