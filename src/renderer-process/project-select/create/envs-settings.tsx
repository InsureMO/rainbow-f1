import {VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, UnwrappedButton, UnwrappedCaption} from '@rainbow-d9/n2';
import {useState} from 'react';
import {
	F1ProjectSettings,
	MIN_NODE_VERSION,
	MIN_NPM_VERSION,
	ProjectCli,
	ProjectCliSet,
	RECOMMENDED_YARN_VERSION
} from '../../../shared';
import {InvalidMessage} from '../../common/widgets';
import {ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {validateEnvCli} from './utils';
import {CliInput, EnvDescription, ModuleSettingsContainer, ModuleSettingsTitle, VersionLabel} from './widgets';

interface EnvsSettingsState {
	nodeMessage?: string;
	npmMessage?: string;
	yarnMessage?: string;
	voltaMessage?: string;
}

export const EnvsSettings = (props: { project: F1ProjectSettings }) => {
	const {project} = props;

	const [state, setState] = useState<EnvsSettingsState>({});

	useModuleValidate({
		base: ProjectModuleBase.ENVS, index: 0, validate: async () => {
			const messages = (await Promise.all([
				'node', 'npm', 'yarn', 'volta'
			].map(async key => {
				const k = key as keyof ProjectCliSet;
				const [version, message] = await validateEnvCli(k, project.envs?.cli?.[k]);
				return {k, version, message};
			}))).reduce((state, {k: key, message}) => {
				state[`${key}Message`] = message;
				return state;
			}, {} as EnvsSettingsState);
			setState(messages);
		}
	});

	const onDirClicked = (options: { title: string, set: (path: string) => Promise<void> }) => async () => {
		const {title, set} = options;
		const result = window.electron.dialog.open({
			title, properties: ['openFile', 'dontAddToRecent', 'showHiddenFiles'], buttonLabel: 'Select'
		});
		if (result.canceled) {
			return;
		}

		await set(result.filePaths[0]);
	};

	const createSet = (key: keyof ProjectCliSet): ((path: string) => Promise<void>) => {
		return async (path: string) => {
			if (project.envs == null) {
				project.envs = {cli: {[key]: {exists: false}}};
			} else if (project.envs.cli == null) {
				project.envs.cli = {[key]: {exists: false}};
			} else if (project.envs.cli[key] == null) {
				project.envs.cli[key] = {exists: false};
			}
			project.envs.cli[key].command = path;
			const [version, message] = await validateEnvCli(key, project.envs.cli[key]);
			if (version != null) {
				project.envs.cli[key].version = version;
				project.envs.cli[key].exists = true;
			} else {
				delete project.envs.cli[key].version;
				project.envs.cli[key].exists = false;
			}
			setState(state => ({...state, [`${key}Message`]: message}));
		};
	};

	const tails = (options: {
		cli?: ProjectCli, title: string, set: (path: string) => Promise<void>
	}) => {
		const {cli, title, set} = options;
		const onClicked = onDirClicked({title, set});
		return [
			<VersionLabel>{cli?.version}</VersionLabel>,
			<UnwrappedButton onClick={onClicked} fill={ButtonFill.PLAIN} ink={ButtonInk.PRIMARY}
			                 tails={['$icons.f1FolderClosedEmpty']}/>
		];
	};

	const createCliInput = (key: keyof ProjectCliSet) => {
		return <>
			<CliInput onValueChange={VUtils.noop} value={project.envs?.cli?.[key]?.command ?? ''}
			          data-di-columns-10 data-di-dir readOnly
			          tails={tails({
				          cli: project.envs?.cli?.[key],
				          title: `Select ${key} executive file`,
				          set: createSet(key)
			          })}/>
			{state[`${key}Message`] != null
				? <InvalidMessage data-column-3 data-columns-10>{state[`${key}Message`]}</InvalidMessage>
				: null}
		</>;
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>Environment Settings</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Node:</UnwrappedCaption>
		{createCliInput('node')}
		<UnwrappedCaption data-columns-2>Npm:</UnwrappedCaption>
		{createCliInput('npm')}
		<UnwrappedCaption data-columns-2>Yarn:</UnwrappedCaption>
		{createCliInput('yarn')}
		<UnwrappedCaption data-columns-2>Volta:</UnwrappedCaption>
		{createCliInput('volta')}
		<EnvDescription>
			All <span data-name="">@rainbow-d9</span> and <span data-name="">@rainbow-o23</span> have been fully tested
			on <span data-name="">node {MIN_NODE_VERSION}</span> and <span data-name="">npm {MIN_NPM_VERSION}</span>, so
			we recommend that your project also be developed and run using the same environment versions. Additionally,
			we recommend using <span data-name="">yarn {RECOMMENDED_YARN_VERSION}</span> for package management
			and <span data-name="">Volta</span> for environment version management.
		</EnvDescription>
	</ModuleSettingsContainer>;
};
