import * as vscode from 'vscode';
import { createSecureServer } from 'http2';
import { MenuItemProvider } from './menuitemprovider';

export class MyTreeProvider implements vscode.TreeDataProvider<myTreeNode> {
    
    public static tree: myTreeNode[] = [];
    public opn = require('opn');
    public static iconName = "C:\\Users\\Desktop\\code-1227\\WeCodeForVSCode\\code\\media\\image\\unHandle.png";
    public static mrfiles: myTreeFilesNode[] = [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }];

    constructor() {

    }

    public static initMyTreeList() {
        let myTreeProvider = new MyTreeProvider();
        vscode.window.registerTreeDataProvider("A_ID", myTreeProvider);
        MyTreeProvider.tree.push(new myTreeNode("SunXiangModel", vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR),
                       new myTreeNode("TuMiaoModel", vscode.TreeItemCollapsibleState.Collapsed, this.mrfiles, myTreeKind.MR));

        let myTreeProvider2 = new MenuItemProvider();
        vscode.window.registerTreeDataProvider("B_ID", myTreeProvider2);

        vscode.window.registerTreeDataProvider("C_ID", myTreeProvider2);
    }

    getTreeItem(element: myTreeNode): vscode.TreeItem {
        return element;
    }

    getChildren(element?: myTreeNode): Thenable<myTreeNode[]> {
        let trees: myTreeNode[] = [];
        if (element == undefined) {
            if (MyTreeProvider.tree != undefined) {
                for (let i = 0;i < MyTreeProvider.tree.length; i++) {
                    let currentElement = MyTreeProvider.tree[i];
                    if (currentElement.label == "SunXiangModel") {
                        let temp: myTreeNode = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR, {
                            command: "test1",
                            title: "test1"
                        });
                        temp.contextValue = 'sxTreeNode';
                        temp.tooltip = 'sxTreeNode';
                        temp.iconPath = currentElement.iconPath;
                        trees.push(temp);
                    }
                    if (currentElement.label == "TuMiaoModel") {
                        let temp: myTreeNode = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR, {
                            command: "test2",
                            title: "test2"
                        });
                        temp.contextValue = 'tmTreeNode';
                        temp.tooltip = 'tmTreeNode';
                        temp.iconPath = currentElement.iconPath;
                        trees.push(temp);
                    }
                }
            }
        } 
        else {
            if (element.kind == myTreeKind.MR) {
                for (let i = 0;i < element.mrFiles.length; i++) {
                    let currentElement = element.mrFiles[i];
                    let mrreviewnode: myTreeNode = new myTreeNode(currentElement.fileName, vscode.TreeItemCollapsibleState.Collapsed, [], myTreeKind.file);
                    trees.push(mrreviewnode);
                }
            } else if (element.kind == myTreeKind.file) {
                let mrissue_node = new myTreeNode('comment', vscode.TreeItemCollapsibleState.None, [], myTreeKind.comment);
                trees.push(mrissue_node);
            }
        }
        return new Promise(resolve => {
            return resolve(trees);
        })
    }
}

export interface myTreeFilesNode {
    fileName: string;
}

export enum myTreeKind {
    MR,
    file,
    comment,
    catatory,
    issue
}

export class myTreeNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly mrFiles: myTreeFilesNode[],
        public readonly kind: myTreeKind,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}