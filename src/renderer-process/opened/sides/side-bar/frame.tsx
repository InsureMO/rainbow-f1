import {ReactNode} from 'react';
import {MinusIcon} from '../../../../assets/icons';
import {SideContentKey, SideContentPosition, SideEventTypes, useSideEventBus} from './event-bus';
import {SideFrameHeaderButton} from './frame-header-button';
import {SideFrameBody, SideFrameContainer, SideFrameHeader, SideFrameHeaderSpaceHolder} from './widgets';

export interface SideFrameProps {
	title?: ReactNode;
	children?: ReactNode;
	contentKey: SideContentKey;
	contentPosition: SideContentPosition;
}

export const SideFrame = (props: SideFrameProps) => {
	const {title, contentKey, contentPosition, children, ...rest} = props;

	const {fire} = useSideEventBus();

	const onHideClicked = async () => {
		fire(SideEventTypes.CLOSE, contentKey, contentPosition);
	};

	return <SideFrameContainer {...rest}>
		<SideFrameHeader>
			{title}
			<SideFrameHeaderSpaceHolder/>
			<SideFrameHeaderButton icon={<MinusIcon/>} tooltip="Hide" click={onHideClicked}/>
		</SideFrameHeader>
		<SideFrameBody>
			{children}
		</SideFrameBody>
	</SideFrameContainer>;
};
