import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { saveIcon } from '@jupyterlab/ui-components';
import dayjs from 'dayjs';

const PLUGIN_ID = 'jupyterlab-notebook-autosave:plugin';

const extension: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  description: 'A JupyterLab extension that will autosave your open Notebook.',
  autoStart: true,
  requires: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settings: ISettingRegistry) => {
    const { commands } = app;

    if (app.name === 'JupyterLab') {
      return;
    }

    function getSetting(settings: any, name: string): any {
      return settings?.[name];
    }

    function handleCustomSave(): void {
      commands
        .execute('docmanager:save', { origin: 'init' })
        .then(() => {
          const customSaveButton = document.querySelector(
            '[data-command="custom:save"]'
          );

          const saveInfoElement = document.getElementById('custom-save-info');
          const saveInfoElementContent = `Last saved: today ${dayjs().format('h:mm:ss A')}`;

          if (saveInfoElement) {
            saveInfoElement.innerHTML = saveInfoElementContent;
          } else {
            const newSaveInfoElement = document.createElement('span');
            newSaveInfoElement.id = 'custom-save-info';
            newSaveInfoElement.innerHTML = saveInfoElementContent;

            customSaveButton?.parentElement?.appendChild(newSaveInfoElement);
          }
        })
        .catch((reason: any) => {
          console.error(`An error occurred while saving.\n${reason}`);
        });
    }

    commands.addCommand('custom:save', {
      label: 'Save changes',
      iconLabel: 'Save changes',
      icon: saveIcon,
      execute: () => handleCustomSave()
    });

    Promise.all([app.restored, settings.load(PLUGIN_ID)])
      .then(() => {
        const docmanagerPlugin =
          settings?.plugins?.['@jupyterlab/docmanager-extension:plugin'];
        const autosavePlugin = settings?.plugins?.[PLUGIN_ID];

        const docmanagerAutosaveInterval = getSetting(
          docmanagerPlugin?.settings,
          'autosaveInterval'
        );
        const autosavePluginAutosaveInterval = getSetting(
          autosavePlugin?.settings,
          'autosaveInterval'
        );
        const autosavePluginAutosaveDefaultInterval =
          autosavePlugin?.schema?.properties?.autosaveInterval?.default;

        const autosaveInterval =
          autosavePluginAutosaveInterval ||
          docmanagerAutosaveInterval ||
          autosavePluginAutosaveDefaultInterval;

        console.log(`Autosave interval: ${autosaveInterval} seconds`);

        setInterval(() => {
          handleCustomSave();
        }, autosaveInterval * 1000);
      })
      .catch(reason => {
        console.error(
          `Something went wrong when reading the settings.\n${reason}`
        );
      });
  }
};

export default extension;
