import { commands, window, ExtensionContext, StatusBarItem } from 'vscode';
import { GameScore } from './GameScore';

let gameScore = new GameScore('cleveland-browns', 60000);

export function activate(context: ExtensionContext) {

	let showCommand = commands
		.registerCommand('gameScore.show', () => gameScore.show());
	let hideCommand = commands
		.registerCommand('gameScore.hide', () => gameScore.hide());

	context.subscriptions.push(showCommand);
	context.subscriptions.push(hideCommand);
}

export function deactivate() {}
