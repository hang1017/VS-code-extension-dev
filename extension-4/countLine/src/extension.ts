import * as vscode from 'vscode';
import { cursorTo } from 'readline';

let myStatusBar : vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	myStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

	console.log('Congratulations, your extension "countLine" is now active!');
	
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
		let n = updateStatusBarItem(vscode.window.activeTextEditor);
		if(n>0) {
			myStatusBar.text = `航帅帅，当前选中 ${n} 行哦！`;
			myStatusBar.show();
		}else {
			myStatusBar.hide();
		}
		
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(myStatusBar);
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(subscriptionsLines));

}
export function deactivate() {}

function subscriptionsLines(): void {
	let n = updateStatusBarItem(vscode.window.activeTextEditor);
	if(n>0) {
		myStatusBar.text = `航帅帅，当前选中 ${n} 行哦！`;
		myStatusBar.show();
	}else {
		myStatusBar.hide();
	}
	
}

function updateStatusBarItem(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if(editor) {
		lines = editor.selections.reduce((prev,curr) => prev + (curr.end.line - curr.start.line),0);
	}
	return lines;
}
