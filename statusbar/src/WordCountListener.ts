import { window, Disposable } from 'vscode';
import { WordCount } from './WordCount';

export class WordCountListener {

  private wordCount: WordCount;
  private _disposable!: Disposable;

  constructor(wordCount: WordCount) {
    this.wordCount = wordCount;
    let subscriptions:Disposable[] = [];
    window.onDidChangeTextEditorSelection(this._onEvent,this,subscriptions);
    window.onDidChangeActiveTextEditor(this._onEvent, this,subscriptions);
    this._disposable = Disposable.from(...subscriptions);
  }
  private _onEvent() {
    this.wordCount.updateWordCount();
  }

  dispose() {
    this._disposable.dispose();
  } 
}
