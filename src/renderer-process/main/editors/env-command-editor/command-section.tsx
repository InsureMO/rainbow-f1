import {VUtils} from '@rainbow-d9/n1';
import {ButtonInk, UnwrappedButton, UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import {ModuleCommandResource, Resource} from '../../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {useWorkAreaEditorEventBus, WorkAreaEditorEventTypes} from '../event-bus';
import {EnvCommandBasic} from './widgets';

export interface CommandSectionProps {
	resource: ModuleCommandResource;
}

export interface CommandSectionState {
	locked: boolean;
}

export const CommandSection = (props: CommandSectionProps) => {
	const {resource} = props;
	const {env, command} = resource;

	const {fire: fireWorkbench} = useWorkbenchEventBus();
	const {on, off, fire} = useWorkAreaEditorEventBus();
	const [state, setState] = useState<CommandSectionState>({locked: true});
	useEffect(() => {
		// since the edit/read mode switcher is outside, and operate resource is given command resource
		// so here delegate the status to active env file resource
		if (resource.env != null) {
			fireWorkbench(WorkbenchEventTypes.ASK_RESOURCE_LOCK_STATUS, resource, (locked: boolean) => {
				if (locked === state.locked) {
					return;
				}
				setState(state => ({...state, locked}));
			});
		}
		const onLockContent = (locked: Resource) => {
			if (resource !== locked || state.locked) {
				return;
			}
			setState(state => ({...state, locked: true}));
		};
		const onUnlockContent = (unlocked: Resource) => {
			if (resource !== unlocked || !state.locked) {
				return;
			}
			setState(state => ({...state, locked: false}));
		};
		on(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
		on(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		return () => {
			off(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
			off(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		};
	}, [on, off, fire, resource, state.locked]);

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
				<UnwrappedInput value={envFiles.join(',')} onValueChange={onEnvFilesChanged} $pp="envFiles"
				                readOnly={state.locked}/>
			</>
			: null}
		<UnwrappedCaption data-column="1">CLI</UnwrappedCaption>
		<UnwrappedInput value={cli} onValueChange={VUtils.noop} $pp="cli" readOnly={true}/>
		<UnwrappedButton onClick={onRunClicked} ink={ButtonInk.SUCCESS} leads={['$icons.f1Run']} data-role="run">
			Execute
		</UnwrappedButton>
	</EnvCommandBasic>;
};
