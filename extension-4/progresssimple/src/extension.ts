import * as vscode from 'vscode';
import { resolve } from 'url';

export function activate(context: vscode.ExtensionContext) {

		console.log('Congratulations, your extension "progresssimple" is now active!');

	let disposable = vscode.commands.registerCommand('extension.progress', () => {
		vscode.window.showInformationMessage('show progress');
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: 'hang',
			cancellable: false,
		},(progress,token) => {
			token.onCancellationRequested(() => {
				console.log('用户取消了长时间运行的操作');
			})

			progress.report({ increment:0, message:'1' });

			setTimeout(() => {
				progress.report({ increment:20, message:'2' });
			}, 1000);
			setTimeout(() => {
				progress.report({ increment:40, message:'3' });
			}, 2000);
			setTimeout(() => {
				progress.report({ increment:60, message:'4' });
			}, 3000);
			var p = new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 5000);
			})
			return p;
		})

	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}
