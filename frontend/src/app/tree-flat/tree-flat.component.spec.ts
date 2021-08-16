import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFlatComponent } from './tree-flat.component';

describe('TreeFlatComponent', () => {
  let component: TreeFlatComponent;
  let fixture: ComponentFixture<TreeFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeFlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('\'s values should be green', () => {
    const span: HTMLElement = fixture.nativeElement
      .querySelector(
        'mat-tree-node > span:nth-child(3)'
      );
    const bgColor = span.style.color;
    expect(bgColor).toBe('green');
  });

});
