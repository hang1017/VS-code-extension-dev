
import * as vscode from 'vscode';
import { DepNodeProvider, Dependency } from './nodeDependencies';
import { JsonOutlineProvider } from './jsonOutline';
import { FileExplorer, FileSystemProvider } from './fileExplorer';
import { TestView } from './testView';
import { FtpExplorer } from './ftpExplorer';
import { MyTreeProvider } from './MyTreeProvider';
import { HangItemProvider,MenuItemNode } from './HangItemProvider';
import { HangFileProvider } from './HangFileProvider';

export function activate(context: vscode.ExtensionContext) {
	const nodeDependenciesProvider = new DepNodeProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('hang-node', nodeDependenciesProvider);
	vscode.commands.registerCommand('hang-node.refreshEntry', () => {
		nodeDependenciesProvider.refresh();
		vscode.window.showInformationMessage('hang-node___refresh~');
	});
	vscode.commands.registerCommand('hang-node.addEntry',() => vscode.window.showInformationMessage(`hang-node___add~`));
	vscode.commands.registerCommand('hang-node.editEntry',(node: Dependency) => vscode.window.showInformationMessage(`hang-node___edit:${node.label}~`));
	vscode.commands.registerCommand('hang-node.deleteEntry',(node: Dependency) => vscode.window.showInformationMessage(`hang-node___delete:${node.label}~`));

	const jsonOutlineProvider = new JsonOutlineProvider(context);
	vscode.window.registerTreeDataProvider('hang-jsonOutLine',jsonOutlineProvider);
	vscode.commands.registerCommand('hang-json.refresh',() => jsonOutlineProvider.refresh());
	vscode.commands.registerCommand('hang-json.refreshNode',(offset) => {
		jsonOutlineProvider.refresh(offset);
		
	});
	vscode.commands.registerCommand('hang-json.renameNode',(offset) => jsonOutlineProvider.rename(offset));

// tslint:disable-next-line: no-unused-expression
	// new FileExplorer(context);
	
	const treeDataProvider = new FileSystemProvider();
	vscode.window.createTreeView('hang-fileExplorer',{ treeDataProvider });
	vscode.commands.registerCommand('fileExplorer.openFile',(resource) => {
		vscode.window.showInformationMessage('open file');
		vscode.window.showTextDocument(resource);
	});
	vscode.commands.registerCommand('hang-file.refresh', () => {
		vscode.window.showInformationMessage('refresh file');
	});

// tslint:disable-next-line: no-unused-expression
	// new TestView(context);
	// const view  = vscode.window.createTreeView('testView',{treeDataProvider: TestView.aNodeWithIdTreeDataProvider(), showCollapseAll: true});


	MyTreeProvider.initMyTreeList();

	const hangItemProvider = new HangItemProvider();
	vscode.window.registerTreeDataProvider('hang-item', hangItemProvider);

	vscode.commands.registerCommand('hang-item.Projects', () => {
		vscode.window.showInformationMessage('show Projects Item');
	});
	vscode.commands.registerCommand('hang-item.Settings', () => {
		vscode.window.showInformationMessage('show Settings Item');
	});

	HangFileProvider.initHangFileTreeList();

}

