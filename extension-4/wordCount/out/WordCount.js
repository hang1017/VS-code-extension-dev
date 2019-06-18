"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class WordCount {
    updateWordCount() {
        if (!this._statusBarItem) {
            this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        }
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        let doc = editor.document;
        if (doc.languageId === "markdown") {
            let num = this._getWordCount(doc);
            this._statusBarItem.text = num !== 1 ? `$(octoface)航帅帅已经输出 ${num} 个字拉！！！` : `目前还没有文字输出`;
            this._statusBarItem.show();
        }
        else {
            this._statusBarItem.hide();
        }
    }
    _getWordCount(doc) {
        let docContent = doc.getText();
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        let word = 0;
        if (docContent != '') {
            word = docContent.split(' ').length;
        }
        return word;
    }
    dispose() {
        this._statusBarItem.dispose();
    }
}
exports.WordCount = WordCount;
//# sourceMappingURL=WordCount.js.map