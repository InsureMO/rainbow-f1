import {createBrowserRouter} from 'react-router-dom';
import {CreateOrRecentPage} from '../renderer-project-process/create-or-recent';
import {CreateProjectPage} from '../renderer-project-process/create-project';

export const router = createBrowserRouter([
	{path: '/create-project', element: <CreateProjectPage/>},
	{path: '/', element: <CreateOrRecentPage/>}
]);
