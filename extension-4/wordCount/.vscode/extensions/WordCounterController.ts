import { window, Disposable } from 'vscode';
import { WordCount } from './WordCount';

export class WordCounterController {
    private _wordCount : WordCount;
    private _disposable : Disposable;

    constructor(wordCount : WordCount) {
        this._wordCount = wordCount;
        this._wordCount.updateWordCount();

        // 订阅选择区域变化和编辑器激活事件
        let subscriptions:Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent,this,subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent,this,subscriptions);

        this._wordCount.updateWordCount();

        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._wordCount.updateWordCount();
    }

}