'use strict';

import Control from './resources/controller/';

export default Control;

window.addEventListener('gamepadconnected', event => {
  const control = new Control(event.gamepad, 'XBOX'); // It would be Control.default when you added directly to the page.

  control.button?.onPress('A', () => {
    console.log('A');
  });
});
