import {createBrowserRouter} from 'react-router-dom';
import {CreateProjectPage} from './create';
import {CreateOrRecentPage} from './recent';

export const router = createBrowserRouter([
	{path: '/create-project', element: <CreateProjectPage/>},
	{path: '/*', element: <CreateOrRecentPage/>}
]);
