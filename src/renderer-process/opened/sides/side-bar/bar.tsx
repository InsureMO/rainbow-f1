import {ReactNode} from 'react';
import {SideBarContainer, SideBarSeparator, SideBarSpaceHolder} from './widgets';

export const SideBar = (props: { uppers?: ReactNode; lowers?: ReactNode; bottoms?: ReactNode }) => {
	const {uppers, lowers, bottoms, ...rest} = props;

	return <SideBarContainer {...rest}>
		{uppers}
		{lowers != null ? <SideBarSeparator/> : null}
		{lowers}
		<SideBarSpaceHolder/>
		{bottoms}
	</SideBarContainer>;
};
