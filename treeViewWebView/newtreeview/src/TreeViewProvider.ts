import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window } from 'vscode';
import { join } from 'path';

const ITEM_ICON_MAP = new Map<string, string>([
    ['pig1', 'pig1.svg'],
    ['pig2', 'pig2.svg'],
    ['pig3', 'pig3.svg']
]);

export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
    ){
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: 'itemClick',
        tooltip: this.label,
        arguments: [
            this.label,
        ]
    };

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    static getIconUriForLabel(label: string):Uri {
        return Uri.file(join(__filename,'..', '..' ,'src' ,'assert', ITEM_ICON_MAP.get(label)+''));
    }

}


export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: import("vscode").Event<TreeItemNode | null | undefined> | undefined;    
    
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
        return [ 'pig1','pig2','pig3' ].map(
            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
        ));
    }

    public static initTreeViewItem(){
        const treeViewProvider = new TreeViewProvider();
        window.registerTreeDataProvider('treeView-item',treeViewProvider);
    }
}








