import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config
export default defineConfig({
	define: {
		'process.env': process.env
	},
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				splash: 'splash.html',
				about: 'about.html',
				'project-select': 'project-select.html',
				main: 'main.html',
			}
		}
	}
});
