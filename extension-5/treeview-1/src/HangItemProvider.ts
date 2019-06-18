import * as vscode from 'vscode';
import * as path from 'path';


export class HangItemProvider implements vscode.TreeDataProvider<MenuItemNode> {
    onDidChangeTreeData?: vscode.Event<MenuItemNode | null | undefined> | undefined;    
    constructor(){}

    getTreeItem(element: MenuItemNode): MenuItemNode{
        return element;
    }

    getChildren(element?: MenuItemNode | undefined): vscode.ProviderResult<MenuItemNode[]> {
        if(element === null || element === undefined) {
            let trees = [];
            let menuItemList = [
                {
                    "command":"hang-item.Projects",
                    "icon": "../media/dep.png",
                    "label": "Projects"
                },
                {
                    "command":"hang-item.Settings",
                    "icon": "../media/dep.svg",
                    "label": "Settings"
                }
            ];
            for(let i = 0;i<menuItemList.length;i++) {
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

export class MenuItemNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};
}