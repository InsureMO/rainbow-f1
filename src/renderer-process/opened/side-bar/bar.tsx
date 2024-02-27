import {ReactNode} from 'react';
import {SideBarContainer, SidebarSeparator, SidebarSpaceHolder} from './widgets';

export const SideBar = (props: { uppers?: ReactNode; lowers?: ReactNode; bottoms?: ReactNode }) => {
	const {uppers, lowers, bottoms, ...rest} = props;
	return <SideBarContainer {...rest}>
		{uppers}
		{lowers != null ? <SidebarSeparator/> : null}
		{lowers}
		<SidebarSpaceHolder/>
		{bottoms}
	</SideBarContainer>;
};
