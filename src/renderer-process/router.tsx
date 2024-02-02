import {createBrowserRouter} from 'react-router-dom';
import {CreateOrRecentPage} from './create-or-recent';

export const router = createBrowserRouter([
	{path: '/', element: <CreateOrRecentPage/>}
]);
