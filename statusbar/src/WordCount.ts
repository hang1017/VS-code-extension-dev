import { window, StatusBarItem, StatusBarAlignment, Disposable, TextEditor } from 'vscode';

export class WordCount {

  private statusBar!: StatusBarItem;

  constructor() {
    // 当编辑器中的选择更改时触发的事件
    window.onDidChangeTextEditorSelection(this.updateWordCount,this);
    // 当活动编辑器 发生更改时将触发的事件
    window.onDidChangeActiveTextEditor(this.updateWordCount, this);
  }

  public updateWordCount() {
    
    if(!this.statusBar) {
      this.statusBar  = window.createStatusBarItem(StatusBarAlignment.Left);
    }
    //获取当前文本编辑器
    let editor = window.activeTextEditor;
    if(!editor) { 
      this.statusBar.hide();
      return ;
    }
    let doc = editor.document;

    // 获取文本编辑器选中项
    // const selection = editor.selection;
    // const text = editor.document.getText(selection);
    // window.showInformationMessage(text);

    let num = this.updateStatusBarItem(editor);

    window.showInformationMessage(num.toString());

    if(doc.languageId === 'markdown') {
      let textNum = doc.getText().replace(/[\r\n\s]+/g, '').length;
      this.statusBar.text = textNum === 0 ? `目前还没有文字～` : `$(octoface)已经输出 ${textNum} 个字啦！！！`;
      this.statusBar.show();
    } else {
      this.statusBar.hide();
    }
  } 

  public updateStatusBarItem(editor: TextEditor | undefined): number {
    let lines = 0;
    if(editor) {
      lines = editor.selections.reduce((prev,curr) => prev + (curr.end.line - curr.start.line),0);
    }
    return lines;
  }

  // 对象和自由资源。
  dispose() {
		this.statusBar.dispose();
	}
}