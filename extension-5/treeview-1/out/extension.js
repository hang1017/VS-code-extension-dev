"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const nodeDependencies_1 = require("./nodeDependencies");
const jsonOutline_1 = require("./jsonOutline");
const fileExplorer_1 = require("./fileExplorer");
const MyTreeProvider_1 = require("./MyTreeProvider");
const HangItemProvider_1 = require("./HangItemProvider");
const HangFileProvider_1 = require("./HangFileProvider");
function activate(context) {
    const nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider(vscode.workspace.rootPath);
    vscode.window.registerTreeDataProvider('hang-node', nodeDependenciesProvider);
    vscode.commands.registerCommand('hang-node.refreshEntry', () => {
        nodeDependenciesProvider.refresh();
        vscode.window.showInformationMessage('hang-node___refresh~');
    });
    vscode.commands.registerCommand('hang-node.addEntry', () => vscode.window.showInformationMessage(`hang-node___add~`));
    vscode.commands.registerCommand('hang-node.editEntry', (node) => vscode.window.showInformationMessage(`hang-node___edit:${node.label}~`));
    vscode.commands.registerCommand('hang-node.deleteEntry', (node) => vscode.window.showInformationMessage(`hang-node___delete:${node.label}~`));
    const jsonOutlineProvider = new jsonOutline_1.JsonOutlineProvider(context);
    vscode.window.registerTreeDataProvider('hang-jsonOutLine', jsonOutlineProvider);
    vscode.commands.registerCommand('hang-json.refresh', () => jsonOutlineProvider.refresh());
    vscode.commands.registerCommand('hang-json.refreshNode', (offset) => {
        jsonOutlineProvider.refresh(offset);
    });
    vscode.commands.registerCommand('hang-json.renameNode', (offset) => jsonOutlineProvider.rename(offset));
    // tslint:disable-next-line: no-unused-expression
    // new FileExplorer(context);
    const treeDataProvider = new fileExplorer_1.FileSystemProvider();
    vscode.window.createTreeView('hang-fileExplorer', { treeDataProvider });
    vscode.commands.registerCommand('fileExplorer.openFile', (resource) => {
        vscode.window.showInformationMessage('open file');
        vscode.window.showTextDocument(resource);
    });
    vscode.commands.registerCommand('hang-file.refresh', () => {
        vscode.window.showInformationMessage('refresh file');
    });
    // tslint:disable-next-line: no-unused-expression
    // new TestView(context);
    // const view  = vscode.window.createTreeView('testView',{treeDataProvider: TestView.aNodeWithIdTreeDataProvider(), showCollapseAll: true});
    MyTreeProvider_1.MyTreeProvider.initMyTreeList();
    const hangItemProvider = new HangItemProvider_1.HangItemProvider();
    vscode.window.registerTreeDataProvider('hang-item', hangItemProvider);
    vscode.commands.registerCommand('hang-item.Projects', () => {
        vscode.window.showInformationMessage('show Projects Item');
    });
    vscode.commands.registerCommand('hang-item.Settings', () => {
        vscode.window.showInformationMessage('show Settings Item');
    });
    HangFileProvider_1.HangFileProvider.initHangFileTreeList();
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map