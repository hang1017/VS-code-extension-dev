"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");
const TreeViewProvider_1 = require("./TreeViewProvider");
const WebView_1 = require("./WebView");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!');
    }));
    TreeViewProvider_1.TreeViewProvider.initTreeViewItem();
    context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
        vscode.window.showInformationMessage(label);
        const webView = WebView_1.createWebView(context, vscode.ViewColumn.Active, label);
        context.subscriptions.push(webView);
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map