import {createBrowserRouter} from 'react-router-dom';
import {Failed} from './failed';
import {FirstScene} from './first-scene';
import {Opened} from './opened';

export const router = createBrowserRouter([
	{path: '/opened', element: <Opened/>},
	{path: '/failed', element: <Failed/>},
	{path: '/*', element: <FirstScene/>}
]);
