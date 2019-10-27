import { window, StatusBarItem, StatusBarAlignment } from "vscode";
import * as requestPromise from 'request-promise';
import * as cheerio from 'cheerio';
import { Configuration } from "./Configuration";
import { ScoreUrl } from "./ScoreUrl";
import { IGameScore } from "./IGameScore";

/**
 * Defines the game-score extension.
 */
export class GameScore implements IGameScore {
  /**
   * The status output.
   */
  private _status: StatusBarItem;

  /**
   * Whether the extension is running or not.
   */
  private _running: boolean;

  /**
   * The user configuration.
   */
  private _config: Configuration;

  /**
   * Creates a GameScore.
   * @param config The user configuration.
   */
  public constructor(config: Configuration) {
    this._status = window.createStatusBarItem(StatusBarAlignment.Right);
    this._running = false;
    this._config = config;
  }

  /**
   * Shows the most recent game score of the team the user is following.
   */
  public show() {
    this._running = true;
    this._update();
    this._status.show();
  }

  /**
   * Hides the game score.
   */
  public hide() {
    this._running = false;
    this._status.hide();
  }

  /**
   * Refreshes the game score.
   */
  private _update() {
    if (this._running) {
      requestPromise.get(new ScoreUrl(this._config.league).toString())
        .then((html) => {
          this._status.text = this._parseScore(html, this._config.following);
          setTimeout(() => this._update(), this._config.frequency);
        })
        .catch(() => {
          this._status.text = 'Error getting score';
        });
    }
  }

  /**
   * Parses the most recent game score for a team from a web page.
   * @param html The HTML page to parse.
   * @param following The team to get the most recent score for.
   */
  private _parseScore(html: any, following: string): string {
    try {
      let score = 'Pending score update';

      const $ = cheerio.load(html, {
        lowerCaseTags: true
      });
      const gameRow = $(`tbody.rowlink[data-link*=${following}]`).first();

      if (gameRow && gameRow.length) {
        const aRow = gameRow.children('tr').first();
        const bRow = gameRow.children('tr').last();

        if (aRow && bRow) {
          const aName = aRow.children('td.teamname').last().html() || '';
          const bName = bRow.children('td.teamname').last().html() || '';
          const aScore = aRow.children('td.totalscore').first().html() || '';
          const bScore = bRow.children('td.totalscore').first().html() || '';

          if (aName && bName && aScore && bScore) {
            score = `${aName.trim()} ${aScore.trim()} - ${bName.trim()} ${bScore.trim()}`;
          }
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
