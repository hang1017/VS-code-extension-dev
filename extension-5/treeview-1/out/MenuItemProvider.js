"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class MenuItemProvider {
    constructor() {
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element == null) {
            let trees = [];
            let menuItemList = [{ "command": "WeCode.PrivateBuild", "icon": "", "lable": "ATLAS构建配置" }];
            for (let i = 0; i < menuItemList.length; i++) {
                let treeItem = new MenuItemNode(menuItemList[i].lable, vscode.TreeItemCollapsibleState.None, {
                    command: menuItemList[i].command,
                    title: menuItemList[i].command,
                    arguments: ["123", "asd"]
                });
                //treeItem.contextValue = 'IssueNode';
                //treeItem.tooltip = currentElement.tooltip;
                //treeItem.iconPath = currentElement.iconPath;
                trees.push(treeItem);
            }
            return trees;
        }
        return null;
    }
}
exports.MenuItemProvider = MenuItemProvider;
class MenuItemNode extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
    }
}
exports.MenuItemNode = MenuItemNode;
//# sourceMappingURL=MenuItemProvider.js.map