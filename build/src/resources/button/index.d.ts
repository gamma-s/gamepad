/**
 * @class Button
 */
declare class Button {
    gamepad: Gamepad;
    layout: string[];
    status: Array<number | null>;
    pressEvents: {
        [key: number]: ((index: number, next: () => void) => void)[];
    };
    releaseEvents: {
        [key: number]: ((index: number, next: () => void) => void)[];
    };
    /**
     * Initializes the gamepad buttons
     * @param {Gamepad} gamepad Browser gamepad object
     * @param {string} layout Gamepad layout
     */
    constructor(gamepad: Gamepad, layout: string[]);
    /**
     * Update button status
     * @param {GamepadButton[]} buttons Gamepad buttons
     */
    update(buttons: GamepadButton[]): void;
    /**
     * Controller button press
     * @param {string|number} button Button name or index
     * @param {Function} callback Runs this method when specified button pressed
     */
    onPress(button: string | number, callback: () => void): void;
    /**
     * Controller button release
     * @param {string|number} button Button name or index
     * @param {Function} callback Runs this method when specified button released
     */
    onRelease(button: string | number, callback: () => void): void;
    /**
     * Button event binding middleware
     * @param {Array} queue Event queue
     * @return {number} Event queue length
     */
    _next(queue: ((index: number, next: () => void) => void)[]): number;
    /**
     * Change button name to the number format
     * @param {string} s Button name
     * @return {number} Button number
     */
    _toButton(s: string): number;
}
export default Button;
