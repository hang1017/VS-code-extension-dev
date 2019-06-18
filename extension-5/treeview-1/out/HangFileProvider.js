"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class myTreeNode extends vscode.TreeItem {
    constructor(label, collapsibleState, myFiles, kind, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.myFiles = myFiles;
        this.kind = kind;
        this.command = command;
    }
}
exports.myTreeNode = myTreeNode;
class HangFileProvider {
    constructor() { }
    static initHangFileTreeList() {
        const hangFileProvider = new HangFileProvider();
        vscode.window.registerTreeDataProvider('hang-file', hangFileProvider);
        HangFileProvider.tree.push(new myTreeNode("hangFile1", vscode.TreeItemCollapsibleState.Collapsed, [], myTreeKind.MR));
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let trees = [];
        if (element === undefined || element === null) {
            if (HangFileProvider.tree !== undefined) {
                for (let i = 0; i < HangFileProvider.tree.length; i++) {
                    let currentElement = HangFileProvider.tree[i];
                    if (currentElement.label === 'hangFile1') {
                        let myTree = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Expanded, [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }], myTreeKind.MR, {
                            command: "hangFile1",
                            title: "hangFile1"
                        });
                        myTree.contextValue = 'hangFile1';
                        myTree.tooltip = 'hangFile1111';
                        myTree.iconPath = currentElement.iconPath;
                        trees.push(myTree);
                    }
                }
            }
        }
        else {
            if (element.kind === myTreeKind.MR) {
                for (let i = 0; i < element.myFiles.length; i++) {
                    let currentElement = element.myFiles[i];
                    let mrreviewnode = new myTreeNode(currentElement.fileName, vscode.TreeItemCollapsibleState.Collapsed, [], myTreeKind.file);
                    trees.push(mrreviewnode);
                }
            }
            else if (element.kind === myTreeKind.file) {
                let mrissue_node = new myTreeNode('hang-node1', vscode.TreeItemCollapsibleState.None, [], myTreeKind.comment);
                trees.push(mrissue_node);
            }
        }
        // return new Promise(resolve => {
        //     return resolve(trees);
        // });
        return trees;
    }
}
HangFileProvider.tree = [];
HangFileProvider.iconName = "C:\\Users\\Desktop\\code-1227\\WeCodeForVSCode\\code\\media\\image\\unHandle.png";
HangFileProvider.mrfiles = [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }];
exports.HangFileProvider = HangFileProvider;
var myTreeKind;
(function (myTreeKind) {
    myTreeKind[myTreeKind["MR"] = 0] = "MR";
    myTreeKind[myTreeKind["file"] = 1] = "file";
    myTreeKind[myTreeKind["comment"] = 2] = "comment";
    myTreeKind[myTreeKind["catatory"] = 3] = "catatory";
    myTreeKind[myTreeKind["issue"] = 4] = "issue";
})(myTreeKind = exports.myTreeKind || (exports.myTreeKind = {}));
//# sourceMappingURL=HangFileProvider.js.map