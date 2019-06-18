import { window } from 'vscode'; 

export async function showQuickPick() {
    let i = 1;
    const result = await window.showQuickPick(['hang1','hang2','hang3','hang4'],{
        placeHolder: '最简单的选择',
        onDidSelectItem: item => window.showInformationMessage(`你选择了${++i}: ${item}`)
    })
}