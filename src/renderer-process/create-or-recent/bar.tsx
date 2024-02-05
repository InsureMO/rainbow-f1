import {ButtonFill, ButtonInk, UnwrappedButton, UnwrappedButtonBar} from '@rainbow-d9/n2';
import {useCreateCategory} from './create-category';
import {ButtonBarSpacer} from './widgets';

export const Bar = () => {
	const createCategory = useCreateCategory();

	const onCreateCategoryClicked = () => createCategory();
	const onCreateProjectClicked = () => {
		// TODO CREATE PROJECT
	};
	const onOpenFolderClicked = () => {
		// TODO OPEN FOLDER
	};

	return <UnwrappedButtonBar>
		<UnwrappedButton onClick={onCreateCategoryClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			New category
		</UnwrappedButton>
		<ButtonBarSpacer/>
		<UnwrappedButton onClick={onCreateProjectClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			New project
		</UnwrappedButton>
		<UnwrappedButton onClick={onOpenFolderClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			Open an existing project
		</UnwrappedButton>
	</UnwrappedButtonBar>;
};