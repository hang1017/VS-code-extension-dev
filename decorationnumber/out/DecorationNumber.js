"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const smallNumDecoration = vscode_1.window.createTextEditorDecorationType({
    border: '1px',
    borderStyle: 'solid',
    borderColor: '#fff',
});
const bigNumDecoration = vscode_1.window.createTextEditorDecorationType({
    backgroundColor: 'blue'
});
class DecorationNumber {
    constructor() {
        this.editor = vscode_1.window.activeTextEditor;
        this.timeout = undefined;
        vscode_1.window.onDidChangeActiveTextEditor(editor => {
            this.editor = vscode_1.window.activeTextEditor;
            if (editor) {
                this.triggerUpdateDecorations();
            }
            // this.DecNumber();
        });
        vscode_1.workspace.onDidChangeTextDocument(event => {
            if (this.editor && event.document === this.editor.document) {
                this.triggerUpdateDecorations();
                // this.DecNumber();
            }
        });
    }
    triggerUpdateDecorations() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        this.timeout = setTimeout(this.DecNumber(), 500);
    }
    DecNumber() {
        if (!this.editor) {
            return;
        }
        let doc = this.editor.document;
        let text = doc.getText();
        let smallNumbers = [];
        let bigNumbers = [];
        const regEx = /\d+/g;
        let match;
        while (match = regEx.exec(text)) {
            const startPos = doc.positionAt(match.index);
            const endPos = doc.positionAt(match.index + match[0].length);
            const decoration = {
                range: new vscode_1.Range(startPos, endPos),
                hoverMessage: 'Number **' + match[0] + '**',
            };
            if (match[0].length < 3) {
                smallNumbers.push(decoration);
            }
            else {
                bigNumbers.push(decoration);
            }
        }
        this.editor.setDecorations(smallNumDecoration, smallNumbers);
        this.editor.setDecorations(bigNumDecoration, bigNumbers);
    }
    dispose() { }
}
exports.DecorationNumber = DecorationNumber;
//# sourceMappingURL=DecorationNumber.js.map