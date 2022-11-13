import layouts from '../../config/layouts.json';

import Button from '../button/';
import Stick from '../stick/';

/**
 * @class Controller
 */
class Control {
  gamepad: Gamepad | null;
  layout: string[];
  button;
  stick = {
    left: new Stick(),
    right: new Stick(),
  };
  /**
   * Initializes the controller.
   * @param {Gamepad} gamepad Browser gamepad object
   * @param {string[]} layout Gamepad layout
   */
  constructor(gamepad: Gamepad, layout: 'XBOX' | 'PS4' = 'XBOX') {
    this.gamepad = navigator.getGamepads()[gamepad.index];
    this.layout = layouts[layout];
    if (this.gamepad !== null) {
      this.button = new Button(this.gamepad, this.layout);
    }

    /**
     * Checks every frame when controller event triggered binds the event to the
     * controller.
     * @return {void}
     */
    const nextFrame = (): void => {
      if (this.gamepad !== null) {
        this.gamepad = navigator.getGamepads()[this.gamepad.index];
        if (!this.gamepad) return;
        if (!this.button) return;

        this.button.update([...this.gamepad.buttons]);
        this.stick.left.update([this.gamepad.axes[0], this.gamepad.axes[1]]);
        this.stick.right.update([this.gamepad.axes[2], this.gamepad.axes[3]]);
      }

      requestAnimationFrame(nextFrame);
    };

    requestAnimationFrame(nextFrame);
  }
}

export default Control;
