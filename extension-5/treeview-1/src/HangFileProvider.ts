import * as vscode from 'vscode';

export class myTreeNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly myFiles: myTreeFilesNode[],
        public readonly kind: myTreeKind,
        public readonly command?: vscode.Command,
    ){
        super(label, collapsibleState);
    }
}

export class HangFileProvider implements vscode.TreeDataProvider<myTreeNode> {
    public static tree: myTreeNode[] = [];
    public static iconName = "C:\\Users\\Desktop\\code-1227\\WeCodeForVSCode\\code\\media\\image\\unHandle.png";
    public static mrfiles: myTreeFilesNode[] = [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }];

    onDidChangeTreeData?: vscode.Event<myTreeNode | null | undefined> | undefined;    
    
    constructor(){}

    public static initHangFileTreeList() {
        const hangFileProvider = new HangFileProvider();
        vscode.window.registerTreeDataProvider('hang-file', hangFileProvider);
        HangFileProvider.tree.push(new myTreeNode(
            "hangFile1", 
            vscode.TreeItemCollapsibleState.Collapsed, 
            [],
            myTreeKind.MR
        ));
    }


    getTreeItem(element: myTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: myTreeNode | undefined): vscode.ProviderResult<myTreeNode[]> {
        let trees: myTreeNode[] = [];

        if(element === undefined || element === null) {
            if(HangFileProvider.tree !== undefined) {
                for(let i = 0;i<HangFileProvider.tree.length;i++) {
                    let currentElement = HangFileProvider.tree[i];
                    if(currentElement.label === 'hangFile1'){
                        let myTree: myTreeNode = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Expanded, [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }], myTreeKind.MR, {
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
        }else {
            if(element.kind === myTreeKind.MR) {
                for(let i = 0; i< element.myFiles.length; i++) {
                    let currentElement = element.myFiles[i];
                    let mrreviewnode: myTreeNode = new myTreeNode(currentElement.fileName,vscode.TreeItemCollapsibleState.Collapsed,[],myTreeKind.file);
                    trees.push(mrreviewnode);
                }
            } else if (element.kind === myTreeKind.file) {
                let mrissue_node = new myTreeNode('hang-node1',vscode.TreeItemCollapsibleState.None,[],myTreeKind.comment);
                trees.push(mrissue_node);
            }   
        }

        // return new Promise(resolve => {
        //     return resolve(trees);
        // });
        return trees;
    }

    
}

export enum myTreeKind {
    MR,
    file,
    comment,
    catatory,
    issue,
}

export interface myTreeFilesNode {
    fileName: string;
}