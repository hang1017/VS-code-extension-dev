"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    const provider = vscode.commands.registerCommand('extension.textApi', () => {
        const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {
            provideCompletionItems(document, position, token, context) {
                // 输出一个简单的文字
                const simpleCompletion = new vscode.CompletionItem('this is a simple completion');
                // 键入 某键时 自动补全
                const commitCharacterCompletion = new vscode.CompletionItem('hangshuaishuai');
                commitCharacterCompletion.commitCharacters = ['.'];
                // 插入文本片段
                const snipetCompletion = new vscode.CompletionItem('my name is ~');
                snipetCompletion.insertText = new vscode.SnippetString('my name is ${1|hang1,hang2,hang3|},hi ${1},mice to meet you !');
                // 插入完成之后，编辑器可执行 command 属性
                const commandCompletion = new vscode.CompletionItem('new');
                commandCompletion.kind = vscode.CompletionItemKind.Keyword;
                commandCompletion.insertText = 'new ~';
                commandCompletion.command = { command: 'extension.sayHello', title: 'sayHello' };
                return [
                    simpleCompletion,
                    commitCharacterCompletion,
                    snipetCompletion,
                    commandCompletion,
                ];
            }
        });
        const provider2 = vscode.languages.registerCompletionItemProvider('plaintext', {
            provideCompletionItems(document, position) {
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
                if (!linePrefix.endsWith('hangshuaishuai.')) {
                    return undefined;
                }
                return [
                    new vscode.CompletionItem('11111', vscode.CompletionItemKind.Method),
                    new vscode.CompletionItem('22222', vscode.CompletionItemKind.Method),
                    new vscode.CompletionItem('33333', vscode.CompletionItemKind.Method),
                ];
            },
        }, '.');
        context.subscriptions.push(provider1, provider2);
        vscode.window.showInformationMessage('hangshuaishuai ');
    });
    context.subscriptions.push(provider);
    context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('hello');
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map