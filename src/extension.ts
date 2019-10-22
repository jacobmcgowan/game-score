import { commands, ExtensionContext } from 'vscode';
import { GameScore } from './GameScore';
import { Configuration } from './Configuration';

const gameScore = new GameScore(new Configuration());

/**
 * Activates the game-score extension.
 * @param context The context of the extension.
 */
export function activate(context: ExtensionContext) {

	const showCommand = commands
		.registerCommand('gameScore.show', () => gameScore.show());
	const hideCommand = commands
		.registerCommand('gameScore.hide', () => gameScore.hide());

	context.subscriptions.push(showCommand, hideCommand);
}

/**
 * Deactivates the game-score extension.
 */
export function deactivate() {}
