import {RouterProvider} from 'react-router-dom';
import {GlobalStyles} from '../renderer-common/global-styles';
import {MainEventBusProvider} from './event-bus';
import {ProjectHolder} from './project-holder';
import {router} from './router';

export const App = () => {
	return <>
		<GlobalStyles/>
		<MainEventBusProvider>
			<ProjectHolder/>
			<RouterProvider router={router}/>
		</MainEventBusProvider>
	</>;
};
