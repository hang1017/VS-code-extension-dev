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

// 计数类
 class WordCount1 {
	private _statusBarItem: StatusBarItem;

	public updateWordCount() {
		if(!this._statusBarItem) {
			this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
		}

		let editor = window.activeTextEditor;
		if(!editor) {
			this._statusBarItem.hide();
			return ;
		}
		let doc = editor.document;
		if(doc.languageId === "markdown") {
			let num = this._getWordCount(doc);

			this._statusBarItem.text = num !== 1 ? `航帅帅已经输出 ${num} 个字拉！！！` : `目前还没有文字输出`;
			this._statusBarItem.show();
		}else {
			this._statusBarItem.hide();
		}
	}

	public _getWordCount(doc: TextDocument): number {
		let docContent = doc.getText();
		docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
		docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		let word = 0;
		if(docContent != '') {
			word = docContent.split(' ').length;
		}
		return word;
	}

	dispose() {
		this._statusBarItem.dispose();
	}
 }
