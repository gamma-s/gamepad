import Button from '../button/';
import Stick from '../stick/';
/**
 * @class Controller
 */
declare class Control {
    gamepad: Gamepad | null;
    layout: string[];
    button: Button | undefined;
    stick: {
        left: Stick;
        right: Stick;
    };
    /**
     * Initializes the controller.
     * @param {Gamepad} gamepad Browser gamepad object
     * @param {string[]} layout Gamepad layout
     */
    constructor(gamepad: Gamepad, layout?: 'XBOX' | 'PS4');
}
export default Control;
