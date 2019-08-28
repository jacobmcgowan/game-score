import { workspace } from "vscode";

export class Configuration {
  public following: string;
  public frequency: number;

  public constructor() {
    let config = workspace.getConfiguration('gameScore');

    this.following = config['following'];
    this.frequency = config['frequency'];
  }
}