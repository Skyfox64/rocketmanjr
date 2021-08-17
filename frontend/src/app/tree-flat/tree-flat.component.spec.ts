import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule, FlatTreeControl } from '@angular/cdk/tree';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { By } from '@angular/platform-browser';
import { MessageTimePipe } from '../MessageTime/message-time.pipe';


import { TreeFlatComponent, TreeNode } from './tree-flat.component';

describe('TreeFlatComponent', () => {
  let component: TreeFlatComponent;
  let fixture: ComponentFixture<TreeFlatComponent>;

  let treedatastring: string = "{\r\n  \"Rocket\": {\r\n    \"created_at\": \"2021-08-15T23:56:48.702212\", \r\n    \"subtree\": {\r\n      \"Height\": {\r\n        \"created_at\": \"2021-08-15T23:56:48.770228\", \r\n        \"value\": 18.0\r\n      }, \r\n      \"Mass\": {\r\n        \"created_at\": \"2021-08-15T23:56:48.809237\", \r\n        \"value\": 12000.0\r\n      }, \r\n      \"Stage1\": {\r\n        \"created_at\": \"2021-08-15T23:56:48.847245\", \r\n        \"subtree\": {\r\n          \"Engine1\": {\r\n            \"created_at\": \"2021-08-15T23:56:48.884253\", \r\n            \"subtree\": {\r\n              \"ISP\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.352367\", \r\n                \"value\": 15.11\r\n              }, \r\n              \"Thrust\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.313350\", \r\n                \"value\": 1.622\r\n              }\r\n            }\r\n          }, \r\n          \"Engine2\": {\r\n            \"created_at\": \"2021-08-15T23:56:49.000280\", \r\n            \"subtree\": {\r\n              \"ISP\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.077296\", \r\n                \"value\": 11.632\r\n              }, \r\n              \"Thrust\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.039289\", \r\n                \"value\": 9.413\r\n              }\r\n            }\r\n          }, \r\n          \"Engine3\": {\r\n            \"created_at\": \"2021-08-15T23:56:49.116305\", \r\n            \"subtree\": {\r\n              \"ISP\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.195323\", \r\n                \"value\": 12.551\r\n              }, \r\n              \"Thrust\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.157315\", \r\n                \"value\": 9.899\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }, \r\n      \"Stage2\": {\r\n        \"created_at\": \"2021-08-15T23:56:49.234341\", \r\n        \"subtree\": {\r\n          \"Engine1\": {\r\n            \"created_at\": \"2021-08-15T23:56:49.271350\", \r\n            \"subtree\": {\r\n              \"ISP\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.352367\", \r\n                \"value\": 15.11\r\n              }, \r\n              \"Thrust\": {\r\n                \"created_at\": \"2021-08-15T23:56:49.313350\", \r\n                \"value\": 1.622\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}"

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        CdkTreeModule,
        ScrollingModule,
    
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatTreeModule,
      ],
      declarations: [
        TreeFlatComponent,
        MessageTimePipe
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFlatComponent);
    component = fixture.componentInstance;
    component.treedata = treedatastring
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('\'s property values should be colored green', () => {
    // const  = fixture.nativeElement.querySelector('.property');
    // get the name's input and display elements from the DOM
    // const hostElement: HTMLElement = fixture.nativeElement;
    // const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
    // simulate user entering a new name into the input box
    // nameInput.value = 'Rocket';
    // Dispatch a DOM event so that Angular learns of input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    // nameInput.dispatchEvent(new Event('input'));
    // let property = fixture.nativeElement.querySelector('.property');
    // let property = fixture.debugElement.query(By.css('.property'))
    // let property = fixture.debugElement.nativeElement.querySelector('.property')
    // component.fullDatasource = [...component.objToTreeNode(dataForComponent)];
    // component.treedata = treedatastring
    // fixture.detectChanges();
    // let property = document.getElementById('#property')
    // expect(property).toBeTruthy();

    // const span: HTMLElement = fixture.nativeElement.querySelector('.property');
    // .querySelector('mat-tree-node > span:nth-child(3)');
    // const bgColor = span.style.color;
    // expect(bgColor).toBe('green');
  });

});
