import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEditor } from './board-editor.component';

describe('BoardEditorComponent', () => {
  let component: BoardEditor;
  let fixture: ComponentFixture<BoardEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardEditor]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
