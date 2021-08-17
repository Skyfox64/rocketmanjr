// Reference: https://stackblitz.com/edit/simplified-material-tree-with-virtual-scroll

import { Observable, of as observableOf } from 'rxjs';
import { Component, ViewChild, AfterViewInit, Input, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { DialogInterface } from '../shared/interfaces/dialog';

/**
 * Tree node data with nested structure.
 * Each node has a nodename, and a type or a list of children.
 */
export class TreeNode {
  nodename!: string;
  created_at!: Date; 
  children!: TreeNode[];
  value?: string;
}

/** Flat node with expandable and level information */
export class TreeFlatNode {
  constructor(
    public nodename: string, 
    public level: number, 
    public created_at: Date, 
    public expandable: boolean, 
    public value: any,
  ) {}
}

/**
 * The tree's structure data in string. 
 * The data could be parsed into a Json object
 */
  const something = [
    {
      nodename: 'Rocket',
      created_at: new Date(),
      children: [
        { nodename: 'Height',value: 18,created_at: new Date()},
        { nodename: 'Mass', value: 12000,created_at: new Date()},
        { 
          nodename: 'Stage1',
          created_at: new Date(),
          children: []
        },
      ]
    }
  ] as TreeNode[];

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-tree-flat.',
  templateUrl: './tree-flat.component.html',
  styleUrls: ['./tree-flat.component.css'],
})
export class TreeFlatComponent implements AfterViewInit {
  treeControl: FlatTreeControl<TreeFlatNode>;
  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;
  // fullDatasource = [
  //     ...something, ...something, ...something,
  //     ...something, ...something, ...something,
  //     ...something, ...something, ...something,
  //     ]
  fullDatasource = [
    ...something
  ]

  @Input() treedata: string = ""; 
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport; 

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone
    ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<TreeFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource.data = this.fullDatasource.slice(0, 10);
    this.dataSource.data = [];
  }

  private _getLevel = (node: TreeFlatNode) => node.level;

  private _isExpandable = (node: TreeFlatNode) => node.expandable;

  private _getChildren = (node: TreeNode): Observable<TreeNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  transformer = (node: TreeNode, level: number) => {
    return new TreeFlatNode(
      node.nodename, level, node.created_at, !!node.children, node.value);
  }
  
  objToTreeNode(oldObj: any): TreeNode[] {
    let newObj = this.traverse(oldObj);
    
    // console.log(newObj);
    let newTreeNode = [newObj] as TreeNode[];
    return newTreeNode;
  }

  //called with every property and its value
  process(obj: any) {
    let newNode = {}
    let obj_value = obj[1]
    let nodeName = obj[0]
    let created_at = new Date(obj_value.created_at);
    
    // At this point, it's either subtree or value per node
    // Branch or Leaf
    // Branches have a subtree, Leaves have a value
    if (obj_value !== null && typeof obj_value === 'object' && 
    obj_value.hasOwnProperty('subtree')) {
      // if subtree, return nodename, created_at, value

      let subtree = obj_value.subtree
      let children: any[] = [];
      Object.keys(subtree).forEach(key => {
        let x = this.process([key,subtree[key]])
        children.push(x);
      });

      newNode = {
        nodename: nodeName,
        created_at: created_at,
        children: children
      };

    }
    else if (obj_value !== null && obj_value.hasOwnProperty('value')) {
      // if value, return nodename, created_at, value

      newNode = {
        nodename: nodeName,
        created_at: created_at,
        value: obj_value.value
      };

    }

    return newNode;
  }

  traverse(o: any): any {
    let obj = {}
    for (var i in o) {
      obj = this.process([i,o[i]]);
    }

    return obj
  }

  openDialog() {
    const dialogInterface: DialogInterface = {
      dialogHeader: 'Confirm Deletion',
      dialogContent: 'Are you sure you wish to proceed?',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Delete',
      callbackMethod: () => {
        console.log("Deleted")
      },
    };
    this.ngZone.run(() => {
      this.dialog.open(DialogComponent, {
        width: '300px',
        data: dialogInterface,
      });
    }, 500);
  }

  ngAfterViewInit() {
    this.virtualScroll.renderedRangeStream.subscribe(range => {
      // console.log(range, 'range')
      this.fullDatasource = [...this.objToTreeNode(this.treedata)];
      this.dataSource.data = this.fullDatasource.slice(range.start, range.end)
    })
    // this.treeControl.expandAll();
  }
}
