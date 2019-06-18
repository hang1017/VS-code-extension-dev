"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fileSystemProvider_1 = require("./fileSystemProvider");
function activate(context) {
    const memFs = new fileSystemProvider_1.MemFS();
    // 为注册文件和文件夹提供程序
    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('hang', memFs, { isCaseSensitive: true }));
    let isWorkspaceExist = false;
    // 创建工作区
    context.subscriptions.push(vscode.commands.registerCommand('hang.workspaceInit', () => {
        vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('hang:/'), name: 'hang-example' });
    }));
    // 往工作区添加文件或文件夹
    context.subscriptions.push(vscode.commands.registerCommand('hang.fileInit', () => {
        if (isWorkspaceExist) {
            return;
        }
        vscode.window.showInformationMessage('create file');
        isWorkspaceExist = true;
        // 添加两个文件
        memFs.writeFile(vscode.Uri.parse(`hang:/hang1.md`), Buffer.from('this is hang md'), { create: true, overwrite: true });
        // 添加两个文件夹试试
        memFs.createDirectory(vscode.Uri.parse(`hang:/pack1/`));
        memFs.writeFile(vscode.Uri.parse(`hang:/pack1/aa.md`), Buffer.from('this is aa'), { create: true, overwrite: true });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('hang.fileDelete', () => {
        vscode.window.showInformationMessage('delete file');
        for (const [name] of memFs.readDirectory(vscode.Uri.parse('hang:/'))) {
            memFs.delete(vscode.Uri.parse(`hang:/${name}`));
        }
        isWorkspaceExist = false;
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map