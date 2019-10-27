import { UrlTemplateSection } from "./UrlTemplateSection";
import { IScoreUrl } from "./IScoreUrl";

/**
 * The URL to obtain game scores from.
 */
export class ScoreUrl implements IScoreUrl {
  /**
   * The template for the URL.
   */
  private readonly _urlTemplate = `https://www.msn.com/en-us/sports/#{${UrlTemplateSection.League}}#/scores`;

  /**
   * The URL to obtain game score from.
   */
  private _url: string;

  /**
   * Creates a Url.
   * @param league The league to obtain scores for.
   */
  public constructor(league: string) {
    const leaguePattern = new RegExp(`#{${UrlTemplateSection.League}}#`);
    this._url = this._urlTemplate.replace(leaguePattern, league);
  }

  /**
   * Converts the Url to a string.
   * @returns The string URL.
   */
  public toString(): string {
    return this._url;
  }
}
