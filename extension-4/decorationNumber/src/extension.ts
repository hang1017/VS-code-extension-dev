// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let editor = vscode.window.activeTextEditor;

	// NodeJS下的一个定时器
	let timeout:NodeJS.Timer | undefined = undefined;

	function updateDecoration(){
		vscode.window.showInformationMessage('Hello World!');
		if(!editor) {
			return ;
		}
		const regEx = /\d+/g;
		const doc = editor.document.getText();

		const smallNumbers: vscode.DecorationOptions[] = [];
		const largeNumbers: vscode.DecorationOptions[] = [];

		let match;
		while(match = regEx.exec(doc)) {
			const startPos = editor.document.positionAt(match.index);
			const endPos = editor.document.positionAt(match.index + match[0].length);
			const decoration = {range: new vscode.Range(startPos,endPos), hoverMessage: 'Number **' + match[0] + '**'}
			if(match[0].length<3) {
				smallNumbers.push(decoration);
			}else {
				largeNumbers.push(decoration);
			}
		}
		editor.setDecorations(smallNumberDecorationType,smallNumbers);
		editor.setDecorations(largeNumberDecorationType,largeNumbers);
	}

	function triggerUpdateDecoration() {
		if(timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateDecoration,500);
	}

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		updateDecoration();
	});
	context.subscriptions.push(disposable);
	vscode.window.onDidChangeActiveTextEditor(() => {
		// triggerUpdateDecoration();
		updateDecoration();
	});
	vscode.workspace.onDidChangeTextDocument(() => {
		// triggerUpdateDecoration();
		updateDecoration();
	})

	const smallNumberDecorationType = vscode.window.createTextEditorDecorationType({
		borderWidth: '1px',
		borderStyle: 'solid',
		overviewRulerColor: 'red',
	})

	const largeNumberDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: `blue`,
		cursor: 'crosshair',
	})

}
export function deactivate() {}
