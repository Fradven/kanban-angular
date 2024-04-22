import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {BoardService} from "../../../core/services/board.service";
import {Task} from "../../../core/models/task.model";
import {TaskService} from "../../../core/services/task.service";
import {TaskEditorComponent} from "../../../core/task/task-editor/task-editor.component";
import {MatDialog} from "@angular/material/dialog";
import {BoardEditor} from "../../../core/board/board-editor/board-editor.component";
import {BoardCategoryModel} from "../../../core/models/board-category.model";

@Component({
    selector: 'app-board-page',
    standalone: true,
    imports: [
        MatButton,
        MatIcon
    ],
    templateUrl: './board-page.component.html',
    styleUrl: './board-page.component.scss'
})
export class BoardPageComponent {
    boardId: string = '';
    public tasks: Task[];

    constructor(private router: Router,
                private boardService: BoardService,
                private taskService: TaskService,
                public dialog: MatDialog) {
        this.boardId = this.boardService.getBoardId();
        this.tasks = this.taskService.getCurrentBoardTasks();
    }

    public openTaskEditor(): void {
        const dialogRef = this.dialog.open(TaskEditorComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.componentInstance.taskSaved.subscribe((newTask: Task) => {
            this.tasks.push(newTask);
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    public backToHomePage() {
        this.router.navigateByUrl('home')
    }

}
