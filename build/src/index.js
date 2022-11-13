'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./resources/controller/"));
exports.default = controller_1.default;
window.addEventListener('gamepadconnected', event => {
    var _a;
    const control = new controller_1.default(event.gamepad, 'XBOX'); // It would be Control.default when you added directly to the page.
    (_a = control.button) === null || _a === void 0 ? void 0 : _a.onPress('A', () => {
        console.log('A');
    });
});
//# sourceMappingURL=index.js.map