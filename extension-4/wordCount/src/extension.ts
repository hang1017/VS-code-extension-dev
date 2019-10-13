// The module 'vscode' contains the VS Code extensibility API
import { window, commands, ExtensionContext, StatusBarItem,TextDocument, StatusBarAlignment } from 'vscode';
import { WordCount } from './WordCount';
import { WordCounterController } from './WordCounterController';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "wordCount" is now active!');

	let wordCount = new WordCount();
	let wordCounterController = new WordCounterController(wordCount);

	let disposable = commands.registerCommand('extension.helloWorld', () => {
		wordCount.updateWordCount();
		window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
	});

	context.subscriptions.push(wordCount);
	context.subscriptions.push(disposable);
	context.subscriptions.push(wordCounterController);
}

export function deactivate() {}

