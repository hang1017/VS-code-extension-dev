import * as vscode from 'vscode';
import { window } from 'vscode';
import { WordCount } from './WordCount';


export function activate(context: vscode.ExtensionContext) {

	let wordCount = new WordCount();
	context.subscriptions.push(wordCount);
	// context.subscriptions.push(vscode.commands.registerCommand('extension.wordCount', () => {
	// 	wordCount.updateWordCount();
	// 	window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
	// }));
}

export function deactivate() {}
