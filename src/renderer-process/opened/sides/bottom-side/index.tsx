import {ProjectBaseProps} from '../../types';
import {SideContentPosition} from '../../workbench/event-bus';
import {switchFrame} from '../frames';
import {SideContentResizeOn} from '../side-bar';
import {BottomContent, BottomSideContainer} from './widgets';

interface BottomSideProps extends ProjectBaseProps {
}

export const BottomSide = (props: BottomSideProps) => {
	const {project} = props;

	return <BottomSideContainer>
		<BottomContent project={project} resizeOn={SideContentResizeOn.TOP}
		               positions={[SideContentPosition.BOTTOM]} switchFrame={switchFrame}/>
	</BottomSideContainer>;
};
