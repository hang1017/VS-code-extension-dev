import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';

let webviewPanel : WebviewPanel | undefined;

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string
) {
    if(webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel(
            'webView',
            label,
            viewColumn,
            {
                retainContextWhenHidden: true,
                enableScripts: true
            }
        );
        webviewPanel.webview.html = getIframeHtml(label);
    } else {
        webviewPanel.title = label;
        webviewPanel.webview.postMessage({label: label});
        webviewPanel.reveal();
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    webviewPanel.webview.onDidReceiveMessage(message => {
        switch(message.command) {
            case 'ifarmeLabel': 
                window.showInformationMessage(message.text);
        }
    });
    
    return webviewPanel;
}

export function getIframeHtml(label: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        <script>
            const vscode = acquireVsCodeApi();
            window.addEventListener('message', (e) => {
                if(e.data.label) {
                    document.getElementById('iframe1').src = 'http://localhost:8000/#/'+e.data.label+'/';
                }
                if(e.data.ifarmeLabel) {
                    console.log(e.data.ifarmeLabel);
                    vscode.postMessage({
                        command: 'ifarmeLabel',
                        text: e.data.ifarmeLabel+'',
                    })
                }
            })
        </script>
        </head>

        <body>
            <iframe id='iframe1' class="iframeDiv" src="http://localhost:8000/#/${label}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}