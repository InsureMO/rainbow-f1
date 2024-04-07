import {RouterProvider} from 'react-router-dom';
import {GlobalStyles} from '../common/global-styles';
import {router} from './router';

export const App = () => {
	return <>
		<GlobalStyles/>
		<RouterProvider router={router}/>
	</>;
};
