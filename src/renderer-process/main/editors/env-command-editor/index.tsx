import {ModuleCommandResource} from '../../opened/types';
import {CommandSection} from './command-section';
import {VariableSection} from './variable-section';
import {EnvCommandEditorPanel} from './widgets';

export interface EnvCommandEditorProps {
	resource: ModuleCommandResource;
}

export const EnvCommandEditor = (props: EnvCommandEditorProps) => {
	const {resource} = props;
	const {module: getModule, env, command} = resource;

	return <EnvCommandEditorPanel>
		<CommandSection resource={resource}/>
		<VariableSection resource={resource}/>
	</EnvCommandEditorPanel>;
};
