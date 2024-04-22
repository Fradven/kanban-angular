import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Task} from "../../models/task.model";
import {BoardService} from "../../services/board.service";
import {TaskStatus} from "../../enums/task-status.enum"
import {TaskService} from "../../services/task.service";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-task-editor',
    standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        MatDialogClose,
        MatSelect,
        MatOption,
        MatSelectModule,
        NgForOf
    ],
    templateUrl: './task-editor.component.html',
    styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {
    @Output() taskSaved: EventEmitter<Task> = new EventEmitter<Task>();

    label: string = '';
    description: string = '';
    taskStatus: TaskStatus = TaskStatus.todo;
    taskStatusOptions: string[] = Object.keys(TaskStatus).filter(key => isNaN(Number(key)));

    constructor(private dialogRef: MatDialogRef<TaskEditorComponent>, private boardService: BoardService, private taskService: TaskService) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        const newTask: Task = {
            id: crypto.randomUUID(),
            boardId: this.boardService.getBoardId(),
            label: this.label,
            description: this.description,
            taskStatus: this.taskStatus,
        }

        this.taskService.addNewTask(newTask);
        this.taskSaved.emit(newTask);
        this.dialogRef.close();
    }
}
