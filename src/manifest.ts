import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: 'Advanced Twitch Tools',
  version: packageJson.version,
  description: packageJson.description,
  background: { service_worker: 'src/pages/background/index.js' },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    '32': 'icon-32.png',
    '48': 'icon-48.png',
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['*://*/*'],
      include_globs: ['*://*.twitch.tv/*'],
      js: ['src/pages/content/index.js'],
      css: ['contentStyle.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        'contentStyle.css',
        'icon-128.png',
        'icon-48.png',
        'icon-34.png',
        'icon-32.png',
        'skip.svg',
        'pip.svg',
        'draggable.svg',
      ],
      matches: ['*://*/*'],
    },
  ],
  permissions: ['tabs', 'webNavigation'],
};

export default manifest;
