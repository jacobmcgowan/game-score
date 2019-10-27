/**
 * Defines the game-score extension.
 */
export interface IGameScore {
    /**
     * Shows the most recent game score of the team the user is following.
     */
    show(): void;
    
    /**
     * Hides the game score.
     */
    hide(): void;
}
