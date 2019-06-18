import * as vscode from 'vscode';
import { showQuickPick } from './basicInput';
import { Context } from 'vm';
import { window } from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.quickInput', async () => {
		vscode.window.showInformationMessage('quickInput');
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = [
			showQuickPick,
		]
		const quickPick = window.createQuickPick();
		quickPick.items = Object.keys(options).map(label =>({label}));
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}
