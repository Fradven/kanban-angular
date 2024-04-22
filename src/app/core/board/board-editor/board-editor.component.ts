import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BoardCategoryModel} from "../../models/board-category.model"
import {AuthService} from "../../../auth/services/auth.service";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {BoardService} from "../../services/board.service";

@Component({
    selector: 'app-board-editor',
    standalone: true,
    imports: [
        MatFormField,
        FormsModule,
        MatDialogClose,
        MatInput,
        MatDialogContent,
        MatDialogTitle,
        MatButton
    ],
    templateUrl: './board-editor.component.html',
    styleUrl: './board-editor.component.scss'
})
export class BoardEditor {
    @Output() boardSaved: EventEmitter<BoardCategoryModel> = new EventEmitter<BoardCategoryModel>();


    title: string = '';
    description: string = '';
    imageUrl: string = '';

    constructor(
        public dialogRef: MatDialogRef<BoardEditor>,
        private authService: AuthService,
        private boardService: BoardService,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        const newBoard: BoardCategoryModel = {
            id: crypto.randomUUID(),
            userEmail: this.authService.userLoggedEmail,
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
        };

        this.boardService.addNewBoard(newBoard);

        this.boardSaved.emit(newBoard);
        this.dialogRef.close();
    }

}
