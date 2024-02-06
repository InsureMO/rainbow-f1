import {createBrowserRouter} from 'react-router-dom';
import {CreateOrRecentPage} from './create-or-recent';
import {CreateProjectPage} from './create-project';

export const router = createBrowserRouter([
	{path: '/create-project', element: <CreateProjectPage/>},
	{path: '/*', element: <CreateOrRecentPage/>}
]);
