import {VUtils} from '@rainbow-d9/n1';
import {ButtonInk, UnwrappedButton, UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {ModuleCommandResource} from '../../opened/types';
import {EnvCommandBody, EnvCommandEditorPanel, EnvCommandHeader} from './widgets';

export interface EnvCommandEditorProps {
	resource: ModuleCommandResource;
}

export const EnvCommandEditor = (props: EnvCommandEditorProps) => {
	const {resource} = props;
	const {module: getModule, file, env, command} = resource;
	const module = getModule();

	const onCommandChanged = (value: string) => {
		// TODO COMMAND NAME CHANGE
	};
	const onEnvNameChanged = (value: string) => {
		// TODO ENV NAME CHANGE, THIS COMMAND ONLY
	};
	const onEnvFilesChanged = (value: string) => {
		// TODO ENV FILES CHANGE, THIS COMMAND ONLY
	};
	const onRunClicked = () => {
		// TODO RUN OR STOP COMMAND
	};
	const {cli, name, envFiles = []} = command;
	const commandName = env != null ? name.substring(env.name.length + 1) : name;

	return <EnvCommandEditorPanel>
		<EnvCommandHeader>
			<UnwrappedCaption data-column="1">Command</UnwrappedCaption>
			<UnwrappedInput value={commandName} onValueChange={onCommandChanged} $pp="command"/>
			{env != null
				? <>
					<UnwrappedCaption data-column="1">Environment</UnwrappedCaption>
					<UnwrappedInput value={env.name} onValueChange={onEnvNameChanged} $pp="envName"/>
					<UnwrappedButton onClick={onRunClicked} ink={ButtonInk.PRIMARY}>
						Add Environment
					</UnwrappedButton>
					<UnwrappedCaption data-column="1">Environment Files</UnwrappedCaption>
					<UnwrappedInput value={envFiles.join(',')} onValueChange={onEnvFilesChanged} $pp="envFiles"/>
				</>
				: null}
			<UnwrappedCaption data-column="1">CLI</UnwrappedCaption>
			<UnwrappedInput value={cli} onValueChange={VUtils.noop} $pp="cli" disabled={true}/>
			<UnwrappedButton onClick={onRunClicked} ink={ButtonInk.SUCCESS} leads={['$icons.f1Run']} data-role="run">
				Execute
			</UnwrappedButton>
		</EnvCommandHeader>
		<EnvCommandBody>
			{env != null
				? <>
					<UnwrappedCaption data-role="command-body-title">Environment Variables</UnwrappedCaption>
				</>
				: null}
		</EnvCommandBody>
	</EnvCommandEditorPanel>;
};
