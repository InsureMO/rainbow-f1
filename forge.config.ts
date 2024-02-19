import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerDMG} from '@electron-forge/maker-dmg';
import {MakerRpm} from '@electron-forge/maker-rpm';
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import {VitePlugin} from '@electron-forge/plugin-vite';
import type {ForgeConfig} from '@electron-forge/shared-types';

const config: ForgeConfig = {
	packagerConfig: {
		icon: 'src/assets/logo'
	},
	rebuildConfig: {},
	makers: [
		new MakerSquirrel({setupIcon: 'src/assets/logo.ico'}),
		new MakerZIP({}, ['darwin']),
		new MakerDMG({icon: 'src/assets/logo.icns'}, ['darwin']),
		new MakerRpm({options: {icon: 'src/assets/logo.png'}}),
		new MakerDeb({options: {icon: 'src/assets/logo.png'}})
	],
	plugins: [
		new VitePlugin({
			// `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
			// If you are familiar with Vite configuration, it will look really familiar.
			build: [
				{
					// `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
					entry: 'src/main.ts',
					config: 'vite.main.config.ts'
				},
				{
					entry: 'src/preload.ts',
					config: 'vite.preload.config.ts'
				}
			],
			renderer: [
				{
					name: 'main_window',
					config: 'vite.renderer.config.ts'
				}
			]
		})
	]
};

export default config;
