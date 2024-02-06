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
				index: 'index.html',
				splash: 'splash.html',
				project: 'project.html',
				about: 'about.html'
			}
		}
	}
});
