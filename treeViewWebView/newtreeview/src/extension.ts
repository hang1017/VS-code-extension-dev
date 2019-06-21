// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { TreeViewProvider } from './TreeViewProvider';
import { createWebView } from './WebView';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	}));

	TreeViewProvider.initTreeViewItem();
	context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
		vscode.window.showInformationMessage(label);
		const webView = createWebView(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webView);
		
	}));
}

export function deactivate() {}
