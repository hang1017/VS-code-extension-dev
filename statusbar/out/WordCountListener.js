"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class WordCountListener {
    constructor(wordCount) {
        this.wordCount = wordCount;
        let subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    _onEvent() {
        this.wordCount.updateWordCount();
    }
    dispose() {
        this._disposable.dispose();
    }
}
exports.WordCountListener = WordCountListener;
//# sourceMappingURL=WordCountListener.js.map