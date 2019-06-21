"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ['pig1', 'pig1.svg'],
    ['pig2', 'pig2.svg'],
    ['pig3', 'pig3.svg']
]);
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = {
            title: this.label,
            command: 'itemClick',
            tooltip: this.label,
            arguments: [
                this.label,
            ]
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file(path_1.join(__filename, '..', '..', 'src', 'assert', ITEM_ICON_MAP.get(label) + ''));
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return ['pig1', 'pig2', 'pig3'].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    static initTreeViewItem() {
        const treeViewProvider = new TreeViewProvider();
        vscode_1.window.registerTreeDataProvider('treeView-item', treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=TreeViewProvider.js.map