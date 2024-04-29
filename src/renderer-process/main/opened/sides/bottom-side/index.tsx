import {SideContentPosition} from '../../workbench/event-bus';
import {switchFrame} from '../frames';
import {SideContentResizeOn} from '../side-bar';
import {BottomSideContainer, BottomSideContent} from './widgets';

export const BottomSide = () => {
	return <BottomSideContainer>
		<BottomSideContent resizeOn={SideContentResizeOn.TOP}
		                   positions={[SideContentPosition.BOTTOM]} switchFrame={switchFrame}/>
	</BottomSideContainer>;
};
