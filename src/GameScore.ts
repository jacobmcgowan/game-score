import { window, StatusBarItem, StatusBarAlignment } from "vscode";

export class GameScore {
  private _status: StatusBarItem;
  private _running = false;

  public constructor() {
    this._status = window.createStatusBarItem(StatusBarAlignment.Right);
  }

  public show() {
    this._update();
    this._status.show();
  }

  public hide() {
    this._status.hide();
  }

  private _update() {
    this._status.text = 'CLE 6 - DET 0';
  }
}