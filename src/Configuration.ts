import { workspace, WorkspaceConfiguration } from "vscode";

/**
 * Defines the user configuration of game-score.
 */
export class Configuration {
  /**
   * The user configuration of game-score.
   */
  private get _config(): WorkspaceConfiguration {
    return workspace.getConfiguration('gameScore');
  }

  /**
   * The team that the user wants to follow.
   */
  public get following(): string {
    return this._config['following'];
  }

  /**
   * The refresh frequency in milliseconds.
   */
  public get frequency(): number {
    return this._config['frequency'];
  }
}
