import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {BoardEditor} from "../../../core/board/board-editor/board-editor.component";
import {MatButton} from "@angular/material/button";
import {BoardCategoryModel} from "../../../core/models/board-category.model";
import {BoardService} from "../../../core/services/board.service";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardActions,
        NgForOf
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    public userName: string | undefined;
    public userBoards: BoardCategoryModel[];

    constructor(private authService: AuthService,
                private router: Router,
                public dialog: MatDialog,
                public boardService: BoardService) {
        this.userName = this.authService.userLoggedFullName;
        this.userBoards = this.boardService.getCurrentUserBoards();
    }

    public openBoardEditor(): void {
        const dialogRef = this.dialog.open(BoardEditor, {
            width: '500px',
            data: {}
        });

        dialogRef.componentInstance.boardSaved.subscribe((newBoard: BoardCategoryModel) => {
            this.userBoards.push(newBoard);
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    public navigateToBoard(boardId: string): void {
        this.router.navigateByUrl(`board`)
        this.boardService.setBoardId(boardId);
    }
}
