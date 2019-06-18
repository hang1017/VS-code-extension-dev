import * as vscode from 'vscode';

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  	'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('catCoding.start', () => {
		vscode.window.showInformationMessage('this is Cat Coding show!');

		const columnToShowIn = vscode.window.activeTextEditor
								?vscode.window.activeTextEditor.viewColumn
								:undefined;

		if(currentPanel){
			currentPanel.reveal(columnToShowIn);
		}else {
			currentPanel = vscode.window.createWebviewPanel(
				'cat Coding', // 标识webview的类型。在内部使用
				'Cat Coding-hangshuaishuai', // 面板的标题显示给用户
				vscode.ViewColumn.One, // 编辑列显示新的webview面板。
				{
					// webview启用脚本
					enableScripts: true,
					// 当面板隐藏式继续执行
					retainContextWhenHidden: true,
 
				} // Webview选项。稍后将详细介绍这些。
			)
			const cat = 'Coding Cat';
			currentPanel.webview.html = getWebviewContent(cat);
		}

		currentPanel.onDidChangeViewState(e => {
			// Webview面板的视图状态已更改
			const panel = e.webviewPanel;
			switch(panel.viewColumn) {
				case vscode.ViewColumn.One:
					updateWebviewForCat(panel, 'Coding Cat');
					return ;
				case vscode.ViewColumn.Two:
					updateWebviewForCat(panel, 'Compiling Cat');
					return ;
				case vscode.ViewColumn.Three:
					updateWebviewForCat(panel, 'Testing Cat');
					return ;
			}

		})



		// let a = 0;
		// const updateImg = () => {
		// 	const cat = a++ % 2 ? 'Compiling Cat' : 'Coding Cat';
		// 	currentPanel.title = cat;
		// 	currentPanel.webview.html = getWebviewContent(cat); 
		// }
		// const b = setInterval(updateImg,5000);

		currentPanel.onDidDispose(() => {
			currentPanel = undefined;
		})

		currentPanel.webview.onDidReceiveMessage(
			message => {
			  switch (message.command) {
				case 'alert':
				  vscode.window.showErrorMessage(message.text);
				  return;
			  }
			},
			undefined,
			context.subscriptions
		  );

		// panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(
		vscode.commands.registerCommand('catCoding.doRefactor', () => {
			if(!currentPanel) {
				return ;
			}
			currentPanel.webview.postMessage({ command: 'refactor'});
			vscode.window.showInformationMessage('refactor');
		})
	)

}

function updateWebviewForCat(panel:vscode.WebviewPanel,catName: keyof typeof cats) {
	panel.title=catName;
	panel.webview.html = getWebviewContent(catName);
}

function getWebviewContent(cat: keyof typeof cats){
	return (`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta chatset="UTF-8">
				<meta name="viewport" content="width=device-width,initial-scale=1.0">
				<title>Cat Coding</title>
			</head>
			<body>
				<img src="${cats[cat]}" width="300" />
				<h2 id='counter'>0</h2>

				<script>
					const vscode = acquireVsCodeApi();
					// 定时修改数字
					const counter = document.getElementById('counter');
					let count = 0;
					setInterval(() => {
						counter.textContent = count++;
					}, 200);

					window.addEventListener('message', event => {
						const message = event.data; // The JSON data our extension sent
						switch (message.command) {
							case 'refactor':
								count = Math.ceil(count * 0.5);
								counter.textContent = count;
								vscode.postMessage({
									command: 'alert',
									text:''+count,
								})
								break;
						}
					});
				</script>
			</body>
		</html>
	`)
}

// this method is called when your extension is deactivated
export function deactivate() {}
