/**
 * Defines the user configuration of GameScore.
 */
export interface IConfiguration {
    /**
     * The team/player that the user wants to follow.
     */
    readonly following: string;

    /**
     * The refresh frequency in milliseconds.
     */
    readonly frequency: number;
    
    /**
     * The league that the user wants to follow.
     */
    readonly league: string;
}
