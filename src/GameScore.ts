import { window, StatusBarItem, StatusBarAlignment } from "vscode";
import * as requestPromise from 'request-promise';
import * as cheerio from 'cheerio';
import { EMLINK } from "constants";

export class GameScore {
  private _status: StatusBarItem;
  private _running: boolean;
  private _url: string;
  private _following: string;

  public constructor(following: string) {
    this._status = window.createStatusBarItem(StatusBarAlignment.Right);
    this._running = false;
    this._url = 'https://www.msn.com/en-us/sports/nfl/scores';
    this._following = following;
  }

  public show() {
    this._running = true;
    this._update();
    this._status.show();
  }

  public hide() {
    this._running = false;
    this._status.hide();
  }

  private _update() {
    if (this._running) {
      let self = this;

      requestPromise.get(this._url)
        .then((html) => {
          this._status.text = this._parseScore(html, this._following);
        })
        .catch((err) => {
          this._status.text = 'Error getting score';
        });
    }
  }

  private _parseScore(html: any, following: string): string {
    try {
      let score = '';

      let $ = cheerio.load(html);
      let gameRow = $(`tbody.rowlink[data-link*=${following}]`).first();

      if (gameRow) {
        let aRow = gameRow.children('tr').first();
        let bRow = gameRow.children('tr').last();

        if (aRow && bRow) {
          let aName = aRow.children('td.teamname').last().html() || '';
          let bName = bRow.children('td.teamname').last().html() || '';
          let aScore = aRow.children('td.totalscore').first().html() || '';
          let bScore = bRow.children('td.totalscore').first().html() || '';

          if (aName && bName && aScore && bScore) {
            score = `${aName.trim()} ${aScore.trim()} - ${bName.trim()} ${bScore.trim()}`;
          } else {
            score = 'Pending score update';
          }
        } else {
          score = 'Pending score update';
        }
      } else {
        score = 'No game found';
      }

      return score;
    }
    catch (err) {
      throw new Error('Failed to parse score');
    }
  }
}