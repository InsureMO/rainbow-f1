import {VUtils} from '@rainbow-d9/n1';
import {ButtonInk, UnwrappedButton, UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {ModuleCommandResource} from '../../opened/types';
import {EnvCommandBasic} from './widgets';

export interface CommandSectionProps {
	resource: ModuleCommandResource;
}

export const CommandSection = (props: CommandSectionProps) => {
	const {resource} = props;
	const {env, command} = resource;

	// change command name is rename, change env is refactor-move
	// we don't need to handle these two cases here, therefore, inputs are readonly
	const onEnvFilesChanged = (_value: string) => {
		// TODO ENV FILES CHANGE, THIS COMMAND ONLY
	};
	const onRunClicked = () => {
		// TODO RUN OR STOP COMMAND
	};
	const {cli, name, envFiles = []} = command;
	const commandName = env != null && (name.startsWith(`${env.name}:`) || name.startsWith(`${env.name}-`)) ? name.substring(env.name.length + 1) : name;

	return <EnvCommandBasic>
		<UnwrappedCaption data-column="1">Command</UnwrappedCaption>
		<UnwrappedInput value={commandName} onValueChange={VUtils.noop} $pp="command" readOnly={true}/>
		{env != null
			? <>
				<UnwrappedCaption data-column="1">Environment</UnwrappedCaption>
				<UnwrappedInput value={env.name} onValueChange={VUtils.noop} $pp="envName" readOnly={true}/>
				<UnwrappedCaption data-column="1">Environment Files</UnwrappedCaption>
				<UnwrappedInput value={envFiles.join(',')} onValueChange={onEnvFilesChanged} $pp="envFiles"/>
			</>
			: null}
		<UnwrappedCaption data-column="1">CLI</UnwrappedCaption>
		<UnwrappedInput value={cli} onValueChange={VUtils.noop} $pp="cli" readOnly={true}/>
		<UnwrappedButton onClick={onRunClicked} ink={ButtonInk.SUCCESS} leads={['$icons.f1Run']} data-role="run">
			Execute
		</UnwrappedButton>
	</EnvCommandBasic>;
};