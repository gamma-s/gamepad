/**
 * @class Button
 */
class Button {
  gamepad: Gamepad;
  layout: string[];
  status: Array<number | null>;
  pressEvents: {[key: number]: ((index: number, next: () => void) => void)[]};
  releaseEvents: {[key: number]: ((index: number, next: () => void) => void)[]};
  /**
   * Initializes the gamepad buttons
   * @param {Gamepad} gamepad Browser gamepad object
   * @param {string} layout Gamepad layout
   */
  constructor(gamepad: Gamepad, layout: string[]) {
    this.gamepad = gamepad;
    this.layout = layout;

    this.status = new Array(this.gamepad.buttons.length).fill(null);
    this.pressEvents = new Array(this.gamepad.buttons.length).fill([]);
    this.releaseEvents = new Array(this.gamepad.buttons.length).fill([]);
  }

  /**
   * Update button status
   * @param {GamepadButton[]} buttons Gamepad buttons
   */
  update(buttons: GamepadButton[]) {
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      if (button.value > 0 || button.pressed === true) {
        if (this.status.indexOf(i) < 0) {
          this._next(this.pressEvents[i]);
        }
        this.status[i] = i;
      }

      for (let j = 0; j < this.status.length; j++) {
        const cursor = this.status[j];
        if (cursor !== null) {
          if (buttons[cursor].value === 0) {
            this._next(this.releaseEvents[j]);
            this.status[j] = null;
          }
        }
      }
    }
  }

  /**
   * Controller button press
   * @param {string|number} button Button name or index
   * @param {Function} callback Runs this method when specified button pressed
   */
  onPress(button: string | number, callback: () => void): void {
    if (typeof button === 'number') {
      this.pressEvents[button] = [...this.pressEvents[button], callback];
    } else {
      const buttonCode = this._toButton(button);
      this.pressEvents[buttonCode] = [
        ...this.pressEvents[buttonCode],
        callback,
      ];
    }
  }

  /**
   * Controller button release
   * @param {string|number} button Button name or index
   * @param {Function} callback Runs this method when specified button released
   */
  onRelease(button: string | number, callback: () => void): void {
    if (typeof button === 'number') {
      this.releaseEvents[button] = [...this.releaseEvents[button], callback];
    } else {
      const buttonCode = this._toButton(button);
      this.releaseEvents[buttonCode] = [
        ...this.releaseEvents[buttonCode],
        callback,
      ];
    }
  }

  /**
   * Button event binding middleware
   * @param {Array} queue Event queue
   * @return {number} Event queue length
   */
  _next(queue: ((index: number, next: () => void) => void)[]): number {
    let index = 0;

    const next = () => {
      if (queue[index]) {
        queue[index].call(this.gamepad, index++, next);
      }
    };

    if (queue.length > 0) {
      next();
    }

    return index;
  }

  /**
   * Change button name to the number format
   * @param {string} s Button name
   * @return {number} Button number
   */
  _toButton(s: string): number {
    return this.layout.indexOf(s);
  }
}

export default Button;
