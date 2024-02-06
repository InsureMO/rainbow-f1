import {ButtonFill, ButtonInk, UnwrappedButton, UnwrappedButtonBar} from '@rainbow-d9/n2';
import {ButtonBarSpacer} from '../../renderer-common/widgets';

export const Bar = () => {
	const onCreateProjectClicked = () => {

	};

	return <UnwrappedButtonBar>
		<ButtonBarSpacer/>
		<UnwrappedButton onClick={onCreateProjectClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			Create
		</UnwrappedButton>
	</UnwrappedButtonBar>;
};