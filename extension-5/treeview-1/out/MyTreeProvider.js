"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const menuitemprovider_1 = require("./menuitemprovider");
class MyTreeProvider {
    constructor() {
        this.opn = require('opn');
    }
    static initMyTreeList() {
        let myTreeProvider = new MyTreeProvider();
        vscode.window.registerTreeDataProvider("A_ID", myTreeProvider);
        MyTreeProvider.tree.push(new myTreeNode("SunXiangModel", vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR), new myTreeNode("TuMiaoModel", vscode.TreeItemCollapsibleState.Collapsed, this.mrfiles, myTreeKind.MR));
        let myTreeProvider2 = new menuitemprovider_1.MenuItemProvider();
        vscode.window.registerTreeDataProvider("B_ID", myTreeProvider2);
        vscode.window.registerTreeDataProvider("C_ID", myTreeProvider2);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let trees = [];
        if (element == undefined) {
            if (MyTreeProvider.tree != undefined) {
                for (let i = 0; i < MyTreeProvider.tree.length; i++) {
                    let currentElement = MyTreeProvider.tree[i];
                    if (currentElement.label == "SunXiangModel") {
                        let temp = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR, {
                            command: "test1",
                            title: "test1"
                        });
                        temp.contextValue = 'sxTreeNode';
                        temp.tooltip = 'sxTreeNode';
                        temp.iconPath = currentElement.iconPath;
                        trees.push(temp);
                    }
                    if (currentElement.label == "TuMiaoModel") {
                        let temp = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Collapsed, MyTreeProvider.mrfiles, myTreeKind.MR, {
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
                for (let i = 0; i < element.mrFiles.length; i++) {
                    let currentElement = element.mrFiles[i];
                    let mrreviewnode = new myTreeNode(currentElement.fileName, vscode.TreeItemCollapsibleState.Collapsed, [], myTreeKind.file);
                    trees.push(mrreviewnode);
                }
            }
            else if (element.kind == myTreeKind.file) {
                let mrissue_node = new myTreeNode('comment', vscode.TreeItemCollapsibleState.None, [], myTreeKind.comment);
                trees.push(mrissue_node);
            }
        }
        return new Promise(resolve => {
            return resolve(trees);
        });
    }
}
MyTreeProvider.tree = [];
MyTreeProvider.iconName = "C:\\Users\\Desktop\\code-1227\\WeCodeForVSCode\\code\\media\\image\\unHandle.png";
MyTreeProvider.mrfiles = [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }];
exports.MyTreeProvider = MyTreeProvider;
var myTreeKind;
(function (myTreeKind) {
    myTreeKind[myTreeKind["MR"] = 0] = "MR";
    myTreeKind[myTreeKind["file"] = 1] = "file";
    myTreeKind[myTreeKind["comment"] = 2] = "comment";
    myTreeKind[myTreeKind["catatory"] = 3] = "catatory";
    myTreeKind[myTreeKind["issue"] = 4] = "issue";
})(myTreeKind = exports.myTreeKind || (exports.myTreeKind = {}));
class myTreeNode extends vscode.TreeItem {
    constructor(label, collapsibleState, mrFiles, kind, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.mrFiles = mrFiles;
        this.kind = kind;
        this.command = command;
    }
}
exports.myTreeNode = myTreeNode;
//# sourceMappingURL=MyTreeProvider.js.map