import {TaskStatus} from "../enums/task-status.enum";

export interface Task {
    id: string;
    boardId: string;
    label: string;
    description: string;
    taskStatus: TaskStatus;
}