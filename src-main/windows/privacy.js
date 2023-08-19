const BaseWindow = require('./base');
const {translate} = require('../l10n');
const {APP_NAME} = require('../brand');

class PrivacyWindow extends BaseWindow {
  constructor () {
    super();
    this.window.loadURL('tw-privacy://./privacy.html');
    this.window.setTitle(`${translate('privacy-policy')} - ${APP_NAME}`);
    this.window.setMinimizable(false);
    this.window.setMaximizable(false);
  }

  getDimensions () {
    return [800, 700];
  }

  isPopup () {
    return true;
  }

  static show () {
    const window = BaseWindow.singleton(PrivacyWindow);
    window.show();
  }
}

module.exports = PrivacyWindow;