"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const layouts_json_1 = __importDefault(require("../../config/layouts.json"));
const button_1 = __importDefault(require("../button/"));
const stick_1 = __importDefault(require("../stick/"));
/**
 * @class Controller
 */
class Control {
    /**
     * Initializes the controller.
     * @param {Gamepad} gamepad Browser gamepad object
     * @param {string[]} layout Gamepad layout
     */
    constructor(gamepad, layout = 'XBOX') {
        this.stick = {
            left: new stick_1.default(),
            right: new stick_1.default(),
        };
        this.gamepad = navigator.getGamepads()[gamepad.index];
        this.layout = layouts_json_1.default[layout];
        if (this.gamepad !== null) {
            this.button = new button_1.default(this.gamepad, this.layout);
        }
        /**
         * Checks every frame when controller event triggered binds the event to the
         * controller.
         * @return {void}
         */
        const nextFrame = () => {
            if (this.gamepad !== null) {
                this.gamepad = navigator.getGamepads()[this.gamepad.index];
                if (!this.gamepad)
                    return;
                if (!this.button)
                    return;
                this.button.update([...this.gamepad.buttons]);
                this.stick.left.update([this.gamepad.axes[0], this.gamepad.axes[1]]);
                this.stick.right.update([this.gamepad.axes[2], this.gamepad.axes[3]]);
            }
            requestAnimationFrame(nextFrame);
        };
        requestAnimationFrame(nextFrame);
    }
}
exports.default = Control;
//# sourceMappingURL=index.js.map