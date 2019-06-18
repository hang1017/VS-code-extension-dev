import * as vscode from 'vscode';
import * as path from 'path';

export class MenuItemProvider implements vscode.TreeDataProvider<MenuItemNode> {
    
    constructor() {

    }

    getTreeItem(element: MenuItemNode): MenuItemNode{
        return element;
    }
		
    getChildren(element?: MenuItemNode): vscode.ProviderResult<MenuItemNode[]> {
        if (element == null) {
            let trees = [];
            let menuItemList = [{"command":"WeCode.PrivateBuild", "icon":"", "lable": "ATLAS构建配置"}];
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

export class MenuItemNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}