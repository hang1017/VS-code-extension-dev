"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
const vscode_1 = require("vscode");
const WordCount_1 = require("./WordCount");
const WordCounterController_1 = require("./WordCounterController");
function activate(context) {
    console.log('Congratulations, your extension "wordCount" is now active!');
    let wordCount = new WordCount_1.WordCount();
    let wordCounterController = new WordCounterController_1.WordCounterController(wordCount);
    let disposable = vscode_1.commands.registerCommand('extension.helloWorld', () => {
        wordCount.updateWordCount();
        vscode_1.window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
    });
    context.subscriptions.push(wordCount);
    context.subscriptions.push(disposable);
    context.subscriptions.push(wordCounterController);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
// 计数类
class WordCount1 {
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
            this._statusBarItem.text = num !== 1 ? `航帅帅已经输出 ${num} 个字拉！！！` : `目前还没有文字输出`;
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
//# sourceMappingURL=extension.js.map