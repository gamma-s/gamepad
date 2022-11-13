import {IEvent, IStick} from './index.typedef';

/**
 * @class Stick
 */
class Stick {
  events: IEvent[];
  threshold: number;
  stick: IStick;

  /**
   * Initializes the gamepad sticks
   */
  constructor() {
    this.events = [];
    this.threshold = 50;
    this.stick = {
      x: 0,
      y: 0,
      pending: true,
      onPending: null,
      lock: true,
    };
  }

  /**
   * Default stick event binding
   * @param {Object} Event Drag event
   * @param {string} Event.type Event type
   * @param {Function} Event.callback Callback method for events
   * @param {Function} Event.condition Checks before conditions after then runs
   */
  drag({type, callback, condition}: IEvent) {
    this._addEvent({type, callback, condition});
  }

  /**
   * Updating stick position and run events when condition is true
   * @param {number} axes Stick x axis
   */
  update(axes: number[]) {
    this.stick = Object.assign(this.stick, {
      x: 0,
      y: 0,
    });

    this.stick.x = parseFloat(axes[0].toFixed(2)) * 100;
    this.stick.y = parseFloat(axes[1].toFixed(2)) * 100;

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      if (this.stick.lock === true) {
        if (typeof event.f !== 'undefined') {
          if (event.f.call(this.stick) === true) {
            if (event.active === false) {
              if (event.callback) {
                event.callback.call(this.stick);
              }
              this.stick.pending = false;
            }
            event.active = true;
          }
        } else {
          event.active = false;
        }
      } else {
        if (typeof event.f !== 'undefined') {
          if (event.f.call(this.stick) === true) {
            if (event.callback) {
              event.callback.call(this.stick);
            }
            this.stick.pending = false;
          }
        }
      }
    }

    if (this.stick.x === 0 && this.stick.y === 0) {
      this.stick.pending = true;
      if (this.stick.onPending !== null) {
        this.stick.onPending();
      }
    }
  }

  /**
   * Adds neccesarry stick events
   * @param {Object} Event Drag event
   * @param {string} Event.type Event type
   * @param {Function} Event.callback Callback method for events
   * @param {Function} Event.condition Checks before conditions after then runs
   * callback method.
   */
  _addEvent({type, callback, condition}: IEvent) {
    switch (type) {
      case 'UP': {
        const f = () => {
          return this.stick.y < -this.threshold;
        };

        this.events.push({
          type,
          callback,
          f,
          active: false,
        });
        break;
      }
      case 'DOWN': {
        const f = () => {
          return this.stick.y > this.threshold;
        };

        this.events.push({
          type,
          callback,
          f,
          active: false,
        });
        break;
      }
      case 'LEFT': {
        const f = () => {
          return this.stick.x < -this.threshold;
        };

        this.events.push({
          type,
          callback,
          f,
          active: false,
        });
        break;
      }
      case 'RIGHT': {
        const f = () => {
          return this.stick.x > this.threshold;
        };

        this.events.push({
          type,
          callback,
          f,
          active: false,
        });
        break;
      }
      default: {
        if (typeof condition !== 'undefined') {
          this.events.push({
            type,
            callback,
            f: condition,
            active: false,
          });
        }
        break;
      }
    }
  }
}

export default Stick;
