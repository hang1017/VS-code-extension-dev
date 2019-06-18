"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
class HangItemProvider {
    constructor() { }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === null || element === undefined) {
            let trees = [];
            let menuItemList = [
                {
                    "command": "hang-item.Projects",
                    "icon": "../media/dep.png",
                    "label": "Projects"
                },
                {
                    "command": "hang-item.Settings",
                    "icon": "../media/dep.svg",
                    "label": "Settings"
                }
            ];
            for (let i = 0; i < menuItemList.length; i++) {
                let treeItem = new MenuItemNode(menuItemList[i].label, vscode.TreeItemCollapsibleState.None, {
                    command: menuItemList[i].command,
                    title: menuItemList[i].command
                });
                trees.push(treeItem);
            }
            return trees;
        }
        return null;
    }
}
exports.HangItemProvider = HangItemProvider;
class MenuItemNode extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
        };
    }
}
exports.MenuItemNode = MenuItemNode;
//# sourceMappingURL=HangItemProvider.js.map