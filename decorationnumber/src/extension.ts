import * as vscode from 'vscode';
import { DecorationNumber } from './DecorationNumber';

export function activate(context: vscode.ExtensionContext) {

	let decorationNumber = new DecorationNumber();
	context.subscriptions.push(decorationNumber);

}

export function deactivate() {}
