import { workspace, WorkspaceConfiguration } from "vscode";
import { IConfiguration } from "./IConfiguration";

/**
 * Defines the user configuration of GameScore.
 */
export class Configuration implements IConfiguration {
  /**
   * The user configuration of GameScore.
   */
  private get _config(): WorkspaceConfiguration {
    return workspace.getConfiguration('gameScore');
  }

  /**
   * The team/player that the user wants to follow.
   */
  public get following(): string {
    return this._config['following'].toLowerCase();
  }

  /**
   * The refresh frequency in milliseconds.
   */
  public get frequency(): number {
    return this._config['frequency'];
  }

  /**
   * The league that the user wants to follow.
   */
  public get league(): string {
    return this._config['league'].toLowerCase();
  }
}
