"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class WordCounterController {
    constructor(wordCount) {
        this._wordCount = wordCount;
        this._wordCount.updateWordCount();
        // 订阅选择区域变化和编辑器激活事件
        let subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        this._wordCount.updateWordCount();
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    dispose() {
        this._disposable.dispose();
    }
    _onEvent() {
        this._wordCount.updateWordCount();
    }
}
exports.WordCounterController = WordCounterController;
//# sourceMappingURL=WordCounterController.js.map