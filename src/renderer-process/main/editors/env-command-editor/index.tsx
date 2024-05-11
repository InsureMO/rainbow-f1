import {VUtils} from '@rainbow-d9/n1';
import {UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {ModuleCommandResource} from '../../opened/types';
import {EnvCommandBody, EnvCommandEditorPanel, EnvCommandHeader} from './widgets';

export interface EnvCommandEditorProps {
	resource: ModuleCommandResource;
}

export const EnvCommandEditor = (props: EnvCommandEditorProps) => {
	const {resource} = props;
	const {module: getModule, file, env, command} = resource;
	const module = getModule();

	const onNameChanged = (value: string) => {
	};
	const onEnvFilesChanged = (value: string) => {
	};
	const {cli, envFiles = []} = command;

	return <EnvCommandEditorPanel>
		<EnvCommandHeader>
			<UnwrappedCaption>Name</UnwrappedCaption>
			<UnwrappedInput value={command.name} onValueChange={onNameChanged} $pp="name"/>
			<UnwrappedCaption>Environment Files</UnwrappedCaption>
			<UnwrappedInput value={envFiles.join(',')} onValueChange={onEnvFilesChanged} $pp="envFiles"/>
			<UnwrappedCaption>CLI</UnwrappedCaption>
			<UnwrappedInput value={cli} onValueChange={VUtils.noop} $pp="cli" disabled={true}/>
		</EnvCommandHeader>
		<EnvCommandBody>
		</EnvCommandBody>
	</EnvCommandEditorPanel>;
};
