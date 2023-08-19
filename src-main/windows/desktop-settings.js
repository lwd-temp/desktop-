const {app, shell} = require('electron');
const BaseWindow = require('./base');
const {translate} = require('../l10n');
const settings = require('../settings');

class DesktopSettingsWindow extends BaseWindow {
  constructor () {
    super();

    this.window.setTitle(translate('desktop-settings'));
    this.window.setMinimizable(false);
    this.window.setMaximizable(false);

    const ipc = this.window.webContents.ipc;

    ipc.on('get-settings', (event) => {
      event.returnValue = {
        updateChecker: settings.updateChecker,
        microphone: settings.microphone,
        camera: settings.camera,
        hardwareAcceleration: settings.hardwareAcceleration,
        backgroundThrottling: settings.backgroundThrottling,
        bypassCORS: settings.bypassCORS
      };
    });

    ipc.handle('set-update-checker', async (event, updateChecker) => {
      settings.updateChecker = updateChecker;
      await settings.save();
    });

    ipc.handle('set-microphone', async (event, microphone) => {
      settings.microphone = microphone;
      await settings.save();
    });

    ipc.handle('set-camera', async (event, camera) => {
      settings.camera = camera;
      await settings.save();
    });

    ipc.handle('set-hardware-acceleration', async (event, hardwareAcceleration) => {
      settings.hardwareAcceleration = hardwareAcceleration;
      await settings.save();
    });

    ipc.handle('set-background-throttling', async (event, backgroundThrottling) => {
      settings.backgroundThrottling = backgroundThrottling;
      BaseWindow.settingsChanged();
      await settings.save();
    });

    ipc.handle('set-bypass-cors', async (event, bypassCORS) => {
      settings.bypassCORS = bypassCORS;
      await settings.save();
    });

    ipc.handle('open-user-data', async () => {
      shell.showItemInFolder(app.getPath('userData'));
    });

    this.window.loadURL('tw-desktop-settings://./index.html');
  }

  getDimensions () {
    return [500, 450];
  }

  getPreload () {
    return 'desktop-settings';
  }

  handlePermissionCheck (permission) {
    return permission === 'media';
  }

  isPopup () {
    return true;
  }

  static show () {
    const window = BaseWindow.singleton(DesktopSettingsWindow);
    window.show();
  }
}

module.exports = DesktopSettingsWindow;
