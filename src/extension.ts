import { commands, window, ExtensionContext, StatusBarItem } from 'vscode';
import { GameScore } from './GameScore';
import { Configuration } from './Configuration';

let config = new Configuration();
let gameScore = new GameScore(config.following, config.frequency);

export function activate(context: ExtensionContext) {

	let showCommand = commands
		.registerCommand('gameScore.show', () => gameScore.show());
	let hideCommand = commands
		.registerCommand('gameScore.hide', () => gameScore.hide());

	context.subscriptions.push(showCommand, hideCommand);
}

export function deactivate() {}
