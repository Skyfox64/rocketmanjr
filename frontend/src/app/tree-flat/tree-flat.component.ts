// Reference: https://stackblitz.com/edit/simplified-material-tree-with-virtual-scroll

import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

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
 * The tree's structure data in string. The data could be parsed into a Json object
 */
  const something = [
    {
      nodename: 'Applications (1)',
      children: [
        { nodename: 'Calendar',value: 'app' },
        { nodename: 'Chrome', value: 'app' },
        { nodename: 'Webstorm', value: 'app'},
      ],
    },
    {
      nodename: 'Documents (2)',
      children: [
        {
          nodename: 'angular',
          children: [
            {
              nodename: 'src', 
              children: [
                { nodename: 'compiler',value: 'ts' },
                { nodename: 'core', value: 'ts' },
              ],
            },
          ],
        }, {
          nodename: 'material2 (3)',
          children: [
            {
              nodename: 'src',
              children: [
                { nodename: 'button',value: 'ts' },
                { nodename: 'checkbox', value: 'ts' },
                { nodename: 'input',value: 'ts' },
              ],
            },
          ],
        },
      ],
    },
    {
      nodename: 'Downloads (4)',
      children: [
        { nodename: 'October', value: 'pdf' },
        { nodename: 'November', value: 'pdf' },
        { nodename: 'Tutorial', value: 'html' },
      ],
    },
    {
      nodename: 'Pictures (5)',
      children: [
        {
          nodename: 'Photo Booth Library',
          children: [
            { nodename: 'Contents', value: 'dir' },
            { nodename: 'Pictures', value: 'dir' },
          ],
        },
        { nodename: 'Sun', value: 'png' },
        { nodename: 'Woods', value: 'jpg' },
      ],
    },
  ] as TreeNode[];

  const something2 = [
    {
      nodename: 'Rocket',
      created_at: new Date(),
      children: [
        { nodename: 'Height',value: 18,created_at: new Date()},
        { nodename: 'Mass', value: 12000,created_at: new Date()},
        { 
          nodename: 'Stage1',
          created_at: new Date(),
          children: [
            // { 
            //   nodename: 'Engine1',
            //   created_at: new Date(),
            //   children: [ 
            //     { nodename: 'ISP',value:15.11,created_at: new Date()},
            //     { nodename: 'Thrust',value:1.6,created_at: new Date()},
            //   ]
            // }
          ]
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
  //     ].map((item, index)=>{return {...item, nodename: 'this is item '+index}})
  fullDatasource = [
    ...something2
  ]

  @Input() treedata: string = ""; 
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport; 

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<TreeFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource.data = this.fullDatasource.slice(0, 10);
    this.dataSource.data = [];
  }
  jsonToTreeNode(oldJsonObj: any): TreeNode[] {
    // let newObj = this.process(oldJsonObj);
    let newObj = this.traverse(oldJsonObj);
    
    console.log(newObj);
    let newTreeNode = [newObj] as TreeNode[];
    return newTreeNode;
  }

  //called with every property and its value
  process(obj: any) {
    let newNode = {}
    let obj_value = obj[1]
    let nodeName = obj[0]
    let created_at = new Date(obj_value.created_at);
    let children: any[] = [];
    
    if (obj_value !== null && typeof obj_value === 'object' && 
    obj_value.hasOwnProperty('subtree')) {
      // if object of subtree, return nodename, created_at, value
      // children = this.traverse(value[1].subtree)
      let subtree = obj_value.subtree
      Object.keys(subtree).forEach(key => {
        // let x = {...this.process([key,subtree[key]])}
        let x = this.process([key,subtree[key]])
        children.push(x);
      });
      newNode = {
        nodename: nodeName,
        created_at: created_at,
        children: children
      };

    }
    if (obj_value !== null && obj_value.hasOwnProperty('value')) {
      // if value is not object, return 
      // nodename, created_at, children(empty), value
      // if (obj_value !== null && obj_value.hasOwnProperty('value')) {
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

  transformer = (node: TreeNode, level: number) => {
    return new TreeFlatNode(
      node.nodename, level, node.created_at, !!node.children, node.value);
  }

  private _getLevel = (node: TreeFlatNode) => node.level;

  private _isExpandable = (node: TreeFlatNode) => node.expandable;

  private _getChildren = (node: TreeNode): Observable<TreeNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  ngAfterViewInit() {
    this.virtualScroll.renderedRangeStream.subscribe(range => {
      // console.log(range, 'range')
      this.fullDatasource = [...this.jsonToTreeNode(this.treedata)];
      // this.fullDatasource = [
      //   ...something2
      // ]
      this.dataSource.data = this.fullDatasource.slice(range.start, range.end)
      // this.dataSource.data = [this.jsonToTreeNode(this.treedata)];
    })
    // this.treeControl.expandAll();
  }
}
