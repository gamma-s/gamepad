import { IEvent, IStick } from './index.typedef';
/**
 * @class Stick
 */
declare class Stick {
    events: IEvent[];
    threshold: number;
    stick: IStick;
    /**
     * Initializes the gamepad sticks
     */
    constructor();
    /**
     * Default stick event binding
     * @param {Object} Event Drag event
     * @param {string} Event.type Event type
     * @param {Function} Event.callback Callback method for events
     * @param {Function} Event.condition Checks before conditions after then runs
     */
    drag({ type, callback, condition }: IEvent): void;
    /**
     * Updating stick position and run events when condition is true
     * @param {number} axes Stick x axis
     */
    update(axes: number[]): void;
    /**
     * Adds neccesarry stick events
     * @param {Object} Event Drag event
     * @param {string} Event.type Event type
     * @param {Function} Event.callback Callback method for events
     * @param {Function} Event.condition Checks before conditions after then runs
     * callback method.
     */
    _addEvent({ type, callback, condition }: IEvent): void;
}
export default Stick;
