import {ButtonFill, ButtonInk, UnwrappedButton, UnwrappedButtonBar} from '@rainbow-d9/n2';
import {useNavigate} from 'react-router-dom';
import {ButtonBarSpacer} from '../../renderer-common/widgets';

export const Bar = () => {
	const navigate = useNavigate();
	const onBackClicked = () => {
		navigate('/');
	};
	const onCreateProjectClicked = () => {

	};

	return <UnwrappedButtonBar>
		<UnwrappedButton onClick={onBackClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}>
			Back
		</UnwrappedButton>
		<ButtonBarSpacer/>
		<UnwrappedButton onClick={onCreateProjectClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			Create
		</UnwrappedButton>
	</UnwrappedButtonBar>;
};