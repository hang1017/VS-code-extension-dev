import { window, StatusBarItem, StatusBarAlignment, TextDocument } from 'vscode';

export class WordCount {
    private _statusBarItem!: StatusBarItem;

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

			this._statusBarItem.text = num !== 1 ? `$(octoface)航帅帅已经输出 ${num} 个字拉！！！` : `目前还没有文字输出`;
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