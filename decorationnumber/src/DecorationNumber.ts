import { window, DecorationOptions, Range, workspace, TextEditor } from 'vscode';

const smallNumDecoration = window.createTextEditorDecorationType ({
  border: '1px',
  borderStyle: 'solid',
  borderColor: '#fff',
});

const bigNumDecoration = window.createTextEditorDecorationType ({
  backgroundColor: 'blue'
});

export class DecorationNumber {

  private editor: TextEditor | undefined;
  private timeout: NodeJS.Timer | undefined;

  constructor() {
    this.editor = window.activeTextEditor;
    this.timeout = undefined;
    window.onDidChangeActiveTextEditor(editor => {
      this.editor = window.activeTextEditor;
      if(editor) { this.triggerUpdateDecorations(); }
      // this.DecNumber();
    });

    workspace.onDidChangeTextDocument(event => {
      if (this.editor && event.document === this.editor.document) {
        this.triggerUpdateDecorations();
        // this.DecNumber();
      }
    });
  }

  public triggerUpdateDecorations() {
    if(this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }
    this.timeout = setTimeout(this.DecNumber(), 500);
  }
  
  public DecNumber() {


    if(!this.editor) {
      return;
    }
    let doc = this.editor.document;
    let text = doc.getText();

    let smallNumbers: DecorationOptions[] = [];
    let bigNumbers: DecorationOptions[] = [];

    const regEx = /\d+/g;

    let match;
    while(match = regEx.exec(text)) {
      const startPos = doc.positionAt(match.index);
      const endPos = doc.positionAt(match.index + match[0].length);

      const decoration = {
        range: new Range(startPos, endPos),
        hoverMessage: 'Number **' + match[0] + '**',
      };

      if(match[0].length < 3) {
        smallNumbers.push(decoration);
      } else {
        bigNumbers.push(decoration);
      }
    }

    this.editor.setDecorations(smallNumDecoration, smallNumbers);
    this.editor.setDecorations(bigNumDecoration, bigNumbers);
  }

  dispose() {}

}