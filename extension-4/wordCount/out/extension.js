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
//# sourceMappingURL=extension.js.map