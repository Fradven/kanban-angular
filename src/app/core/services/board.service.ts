import {Injectable} from '@angular/core';
import {BoardCategoryModel} from "../models/board-category.model";
import {LocalStorageService} from "./local-storage.service";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private readonly BOARD_DB_KEY = 'boards';

    constructor(private localStorageService: LocalStorageService,
                private authService: AuthService,) {
    }

    public getBoardList(): BoardCategoryModel[] {
        return this.localStorageService.getAll(this.BOARD_DB_KEY);
    }

    public getCurrentUserBoards(): BoardCategoryModel[] {
        const allBoards = this.getBoardList()
        const userBoards = allBoards.filter(userBoard => userBoard.userEmail === this.authService.userLoggedEmail)

        return userBoards;
    }
    public addNewBoard(newBoard: BoardCategoryModel): void {
        const allBoards: BoardCategoryModel[] = this.getBoardList();
        allBoards.push(newBoard);
        this.localStorageService.setAll('boards', allBoards);
    }
}
