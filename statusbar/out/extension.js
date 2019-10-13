"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordCount_1 = require("./WordCount");
function activate(context) {
    let wordCount = new WordCount_1.WordCount();
    context.subscriptions.push(wordCount);
    // context.subscriptions.push(vscode.commands.registerCommand('extension.wordCount', () => {
    // 	wordCount.updateWordCount();
    // 	window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
    // }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map