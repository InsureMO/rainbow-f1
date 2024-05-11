import {Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef} from '@rainbow-d9/n2';
import {WorkbenchEventBus} from '../../../opened/workbench/event-bus';
import {castTo} from '../../../utils';
import {ModuleNodeDef, O23ModuleNodeDef, ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';
import {createModuleDBScriptsChildNodes} from './db-scripts-child-nodes';
import {createModuleChildNodes} from './module-child-nodes';
import {createModuleNodes} from './module-node';
import {createModuleNodeFileNodes} from './node-files-child-nodes';
import {createRootNode} from './root-node';
import {createModuleO23ScriptsPipelineChildNodes} from './scripts-pipelines-child-nodes';
import {createModuleO23ServerPipelineChildNodes} from './server-pipelines-child-nodes';
import {createModuleSourceFileNodes} from './source-files-child-nodes';

export const createDetective = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => {
	return (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		}

		const type = castTo<ProjectTreeNodeDef>(parentNode).$type;
		switch (type) {
			case ProjectTreeNodeType.ROOT:
				// project node, create module nodes
				return createModuleNodes(rootData, fire)();
			case ProjectTreeNodeType.MODULE:
				return createModuleChildNodes(rootData, fire)(castTo<ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_COMMANDS:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_ENVS:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_ENV:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINES:
				return createModuleO23ServerPipelineChildNodes(rootData, fire)(castTo<O23ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_DIR:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINES:
				return createModuleO23ScriptsPipelineChildNodes(rootData, fire)(castTo<O23ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_DIR:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_DB_SCRIPTS:
				return createModuleDBScriptsChildNodes(rootData, fire)(castTo<O23ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_DB_SCRIPTS_DIR:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_SOURCE_FILES:
				return createModuleSourceFileNodes(rootData, fire)(castTo<ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_SOURCE_DIR:
				return parentNode.$children ?? [];
			case ProjectTreeNodeType.MODULE_NODE_FILES:
				return createModuleNodeFileNodes(rootData, fire)(castTo<ModuleNodeDef>(parentNode).value.module);
			case ProjectTreeNodeType.MODULE_NODE_DIR:
				return parentNode.$children ?? [];
			default:
				// virtual root, given by tree itself. create physical root node, aka project node
				// put on last since the project root node's value are root data too.
				return castTo(parentNode.value) === rootData ? [createRootNode(rootData, fire)()] : [];
		}
	};
};
