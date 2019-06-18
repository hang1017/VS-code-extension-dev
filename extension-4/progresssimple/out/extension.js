"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "progresssimple" is now active!');
    let disposable = vscode.commands.registerCommand('extension.progress', () => {
        vscode.window.showInformationMessage('show progress');
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'hang',
            cancellable: false,
        }, (progress, token) => {
            token.onCancellationRequested(() => {
                console.log('用户取消了长时间运行的操作');
            });
            progress.report({ increment: 0, message: '1' });
            setTimeout(() => {
                progress.report({ increment: 20, message: '2' });
            }, 1000);
            setTimeout(() => {
                progress.report({ increment: 40, message: '3' });
            }, 2000);
            setTimeout(() => {
                progress.report({ increment: 60, message: '4' });
            }, 3000);
            setTimeout(() => {
                progress.report({ increment: 80, message: '5' });
            }, 4000);
            setTimeout(() => {
                progress.report({ increment: 100, message: '6' });
            }, 5000);
            var p = new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
            return p;
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map