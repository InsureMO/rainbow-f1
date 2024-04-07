import {SideContentPosition} from '../../workbench/event-bus';
import {switchFrame} from '../frames';
import {SideContentResizeOn} from '../side-bar';
import {BottomContent, BottomSideContainer} from './widgets';

export const BottomSide = () => {
	return <BottomSideContainer>
		<BottomContent resizeOn={SideContentResizeOn.TOP}
		               positions={[SideContentPosition.BOTTOM]} switchFrame={switchFrame}/>
	</BottomSideContainer>;
};
