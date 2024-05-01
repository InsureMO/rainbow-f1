import {PROPERTY_PATH_ME, Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import React, {useState} from 'react';
import {
	FolderIcon,
	ModuleCommandIcon,
	ModuleCommandsIcon,
	ModuleDBScriptsIcon,
	ModuleEnvIcon,
	ModuleEnvsIcon,
	ModuleNodeFilesIcon,
	ModuleRootIcon,
	ModuleScriptsIcon,
	ModuleServerIcon,
	ModuleSourceFilesIcon
} from '../../../assets/icons';
import {
	F1ModuleStructure,
	F1Project,
	F1ProjectStructure,
	ModuleCommand,
	ModuleFile,
	O23ModuleStructure
} from '../../../shared';
import {
	ActiveResourceSegment,
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventTypes
} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';
import {castTo, isD9Module, isO23Module} from '../utils';
import {icon} from '../utils/icons-utils';
import {
	AddModuleNodeLabel,
	ModuleCommandNodeLabel,
	ModuleCommandsNodeLabel,
	ModuleDBScriptsDirNodeLabel,
	ModuleDBScriptsFileNodeLabel,
	ModuleDBScriptsNodeLabel,
	ModuleEnvCommandNodeLabel,
	ModuleEnvNodeLabel,
	ModuleEnvsNodeLabel,
	ModuleNodeDirNodeLabel,
	ModuleNodeFileNodeLabel,
	ModuleNodeFilesNodeLabel,
	ModuleO23ScriptsPipelineDirNodeLabel,
	ModuleO23ScriptsPipelineFileNodeLabel,
	ModuleO23ScriptsPipelinesNodeLabel,
	ModuleO23ServerPipelineDirNodeLabel,
	ModuleO23ServerPipelineFileNodeLabel,
	ModuleO23ServerPipelinesNodeLabel,
	ModuleRootNodeLabel,
	ModuleSourceDirNodeLabel,
	ModuleSourceFileNodeLabel,
	ModuleSourceFilesNodeLabel,
	ProjectRootNodeLabel
} from './label';
import {
	ADD_MODULE,
	ADD_MODULE_NODE_MARKER,
	MODULE_COMMAND_NODE_MARKER,
	MODULE_COMMANDS_NODE_MARKER,
	MODULE_DB_SCRIPTS_DIR_NODE_MARKER,
	MODULE_DB_SCRIPTS_FILE_NODE_MARKER,
	MODULE_DB_SCRIPTS_NODE_MARKER,
	MODULE_ENV_COMMAND_NODE_MARKER,
	MODULE_ENV_NODE_MARKER,
	MODULE_ENVS_NODE_MARKER,
	MODULE_NODE_DIR_NODE_MARKER,
	MODULE_NODE_FILE_NODE_MARKER,
	MODULE_NODE_FILES_NODE_MARKER,
	MODULE_NODE_MARKER,
	MODULE_O23_SCRIPTS_PIPELINE_DIR_NODE_MARKER,
	MODULE_O23_SCRIPTS_PIPELINE_FILE_NODE_MARKER,
	MODULE_O23_SCRIPTS_PIPELINES_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINE_DIR_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINE_FILE_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINES_NODE_MARKER,
	MODULE_SOURCE_DIR_NODE_MARKER,
	MODULE_SOURCE_FILE_NODE_MARKER,
	MODULE_SOURCE_FILES_NODE_MARKER,
	ModuleEnv,
	ModuleEnvNodeDef,
	ModuleFileNodeDef,
	ModuleNodeDef,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType,
	ROOT_NODE_MARKER
} from './types';
import {ProjectFrameContainer} from './widgets';

interface ProjectFrameState {
	project?: F1Project;
	structure?: F1ProjectStructure;
}

interface ModuleFileNodesCreateOptions {
	module: F1ModuleStructure;
	files?: Array<ModuleFile>;
	asDirNode: (file: ModuleFile) => ProjectTreeNodeDef;
	asFileNode: (file: ModuleFile) => ProjectTreeNodeDef;
}

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	const {fire} = useWorkbenchEventBus();
	const {ask} = useProjectStructure();
	const [state, setState] = useState<ProjectFrameState>({});
	useAskProjectStructure(ask, (project, structure) => setState({project, structure}));

	if (state.structure == null) {
		return null;
	}

	const rootData: ProjectRoot = {project: state.project, structure: state.structure};
	const createRootNode = (): ProjectTreeNodeDef => {
		// use structure as value
		return {
			value: castTo(rootData),
			$ip2r: rootData.project.directory, $ip2p: PROPERTY_PATH_ME, marker: ROOT_NODE_MARKER,
			label: <ProjectRootNodeLabel {...rootData}/>,
			$type: ProjectTreeNodeType.ROOT,
			click: async () => {
				fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {segments: []});
			}
		};
	};
	const createAddModuleNode = (): ProjectTreeNodeDef => {
		// use project and ADD_MODULE as value, tuple
		return {
			value: castTo({...rootData, module: ADD_MODULE}),
			$ip2r: `${rootData.project.directory}/modules`, $ip2p: 'modules',
			marker: ADD_MODULE_NODE_MARKER(rootData.project),
			label: <AddModuleNodeLabel {...rootData}/>,
			$type: ProjectTreeNodeType.ADD_MODULE,
			click: async () => {
				fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {segments: []});
			}
		};
	};
	const createModuleNode = (module: F1ModuleStructure): ProjectTreeNodeDef => {
		// use module as value
		return {
			value: castTo({...rootData, module}),
			$ip2r: `${rootData.project.directory}/${module.name}/envs`, $ip2p: module.name,
			marker: MODULE_NODE_MARKER(module),
			label: <ModuleRootNodeLabel {...rootData} module={module}/>,
			$type: ProjectTreeNodeType.MODULE,
			click: async () => {
				fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {segments: [{label: module.name, icon: <ModuleRootIcon/>}]});
			}
		};
	};
	const createModuleNodes = (): Array<ProjectTreeNodeDef> => {
		const modules = [...(rootData.structure as F1ProjectStructure).modules ?? []];
		modules.sort((m1, m2) => {
			return (m1.name ?? '').localeCompare(m2.name ?? '', (void 0), {sensitivity: 'base'});
		});
		if (modules.length === 0) {
			return [createAddModuleNode()];
		} else {
			return modules.map(createModuleNode);
		}
	};
	const createO23ModuleChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return [
			// commands
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$`, $ip2p: '$$commands$$',
				marker: MODULE_COMMANDS_NODE_MARKER(module),
				label: <ModuleCommandsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_COMMANDS,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'CLI Commands', icon: <ModuleCommandsIcon/>}
						]
					});
				}
			},
			// environments
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$`, $ip2p: '$$envs$$',
				marker: MODULE_ENVS_NODE_MARKER(module),
				label: <ModuleEnvsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_ENVS,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Environments', icon: <ModuleEnvsIcon/>}
						]
					});
				}
			},
			// server pipelines
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$`, $ip2p: '$$server$$',
				marker: MODULE_O23_SERVER_PIPELINES_NODE_MARKER(module),
				label: <ModuleO23ServerPipelinesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINES,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Server Pipelines', icon: <ModuleServerIcon/>}
						]
					});
				}
			},
			// scripts pipelines
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$scripts$$`,
				$ip2p: '$$scripts$$',
				marker: MODULE_O23_SCRIPTS_PIPELINES_NODE_MARKER(module),
				label: <ModuleO23ScriptsPipelinesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINES,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>}
						]
					});
				}
			},
			// db-scripts
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-db-scripts$$`, $ip2p: '$$o23-db-scripts$$',
				marker: MODULE_DB_SCRIPTS_NODE_MARKER(module),
				label: <ModuleDBScriptsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>}
						]
					});
				}
			},
			// source files
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$`, $ip2p: '$$source-files$$',
				marker: MODULE_SOURCE_FILES_NODE_MARKER(module),
				label: <ModuleSourceFilesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_FILES,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'SRC', icon: <ModuleSourceFilesIcon/>}
						]
					});
				}
			},
			// node files
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$`, $ip2p: '$$node-files$$',
				marker: MODULE_NODE_FILES_NODE_MARKER(module),
				label: <ModuleNodeFilesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_FILES,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>}
						]
					});
				}
			}
		];
	};
	const createModuleChildNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleChildNodes(module);
		} else {
			return [];
		}
	};
	const createModuleCommandsChildNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		return Object.values(module.commands ?? {}).sort((c1, c2) => {
			return c1.name.localeCompare(c2.name, (void 0), {sensitivity: 'base'});
		}).map(cmd => {
			return {
				value: castTo({...rootData, module, cmd}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$/${cmd.name}`, $ip2p: cmd.name,
				marker: MODULE_COMMAND_NODE_MARKER(module, cmd),
				label: <ModuleCommandNodeLabel {...rootData} module={module} command={cmd}/>,
				$type: ProjectTreeNodeType.MODULE_COMMAND,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
							{label: cmd.name, icon: <ModuleCommandIcon/>}
						]
					});
				}
			};
		});
	};
	const createO23ModuleEnvChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		const envs: Record<string, Array<ModuleCommand>> = {};
		Object.entries(module.commands ?? {}).forEach(([, command]) => {
			const {name} = command;
			if (name === 'start' || name === 'scripts') {
				envs.local = envs.local ?? [];
				envs.local.push(command);
			}
			const parts = name.split(/[:\-]/);
			if (parts.length > 1) {
				const env = parts[0];
				const cmd = parts[parts.length - 1];
				if (cmd === 'start' || cmd === 'scripts') {
					envs[env] = envs[env] ?? [];
					envs[env].push(command);
				}
			}
		});

		return Object.entries(envs)
			.sort(([n1], [n2]) => {
				return n1.localeCompare(n2, (void 0), {sensitivity: 'base'});
			}).map(([name, commands]) => ({name, commands}))
			.map((env) => {
				return {
					value: castTo({...rootData, module, env}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}`, $ip2p: env.name,
					marker: MODULE_ENV_NODE_MARKER(module, env),
					label: <ModuleEnvNodeLabel {...rootData} module={module} env={env}/>,
					$type: ProjectTreeNodeType.MODULE_ENV,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Environments', icon: <ModuleEnvsIcon/>},
								{label: env.name, icon: <ModuleEnvIcon/>}
							]
						});
					}
				};
			});
	};
	const createModuleEnvsChildNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleEnvChildNodes(module);
		} else {
			return [];
		}
	};
	const createModuleEnvChildNodes = (module: F1ModuleStructure, env: ModuleEnv): Array<ProjectTreeNodeDef> => {
		return [...env.commands]
			.sort((c1, c2) => c1.name.localeCompare(c2.name, (void 0)))
			.map(command => {
				return {
					value: castTo({...rootData, module, env, command}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}/${command.name}`,
					$ip2p: command.name,
					marker: MODULE_ENV_COMMAND_NODE_MARKER(module, env, command),
					label: <ModuleEnvCommandNodeLabel {...rootData} module={module} env={env} command={command}/>,
					$type: ProjectTreeNodeType.MODULE_ENV_COMMAND,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Environments', icon: <ModuleEnvsIcon/>},
								{label: env.name, icon: <ModuleEnvIcon/>},
								{label: command.name, icon: <ModuleCommandIcon/>}
							]
						});
					}
				};
			});
	};
	const createModuleFileNodes = (options: ModuleFileNodesCreateOptions): Array<ProjectTreeNodeDef> => {
		const {files, asDirNode, asFileNode} = options;
		const sorted = ([...(files ?? [])]).sort((f1, f2) => {
			return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
		});
		const top: Array<ProjectTreeNodeDef> = [];
		const map: Record<string, ProjectTreeNodeDef> = {};
		sorted.forEach(file => {
			let node;
			if (file.dir) {
				node = asDirNode(file);
			} else {
				node = asFileNode(file);
			}
			map[file.path] = node;
			let lastSepIndex = file.path.lastIndexOf('/');
			lastSepIndex = lastSepIndex === -1 ? file.path.lastIndexOf('\\') : lastSepIndex;
			if (lastSepIndex === -1) {
				top.push(node);
			} else {
				const parentPath = file.path.substring(0, lastSepIndex);
				const parent = map[parentPath];
				if (parent != null) {
					if (parent.$children == null) {
						parent.$children = [];
					}
					parent.$children.push(node);
				} else {
					top.push(node);
				}
			}
		});
		const sort = ({value: {file: f1}}: ModuleFileNodeDef, {value: {file: f2}}: ModuleFileNodeDef) => {
			if (f1.dir === f2.dir) {
				return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
			} else if (f1.dir) {
				return -1;
			} else {
				return 1;
			}
		};
		const sortChildren = (node: ModuleFileNodeDef) => {
			(node.$children ?? []).sort((c1, c2) => sort(castTo(c1), castTo(c2)))
				.forEach(child => sortChildren(castTo(child)));
		};
		top.sort((n1, n2) => sort(castTo(n1), castTo(n2)))
			.forEach(node => sortChildren(castTo(node)));

		return top;
	};
	const buildModuleFileAsActiveResource = (file: ModuleFile): Array<ActiveResourceSegment> => {
		const [last, ...others] = file.path.split(/[\/|\\]/g).reverse();
		return [
			...others.reverse().map(label => ({label})),
			{label: last, icon: file.dir ? <FolderIcon/> : icon(file)}
		];
	};
	const createModuleO23ServerPipelineChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return createModuleFileNodes({
			module, files: module.server.files,
			asDirNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_O23_SERVER_PIPELINE_DIR_NODE_MARKER(module, file),
					label: <ModuleO23ServerPipelineDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Server Pipelines', icon: <ModuleServerIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_O23_SERVER_PIPELINE_FILE_NODE_MARKER(module, file),
					label: <ModuleO23ServerPipelineFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Server Pipelines', icon: <ModuleServerIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			}
		});
	};
	const createModuleO23ScriptsPipelineChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return createModuleFileNodes({
			module, files: module.scripts.files,
			asDirNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_O23_SCRIPTS_PIPELINE_DIR_NODE_MARKER(module, file),
					label: <ModuleO23ScriptsPipelineDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_O23_SCRIPTS_PIPELINE_FILE_NODE_MARKER(module, file),
					label: <ModuleO23ScriptsPipelineFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			}
		});
	};
	const createModuleDBScriptsChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return createModuleFileNodes({
			module, files: module.dbScripts.files,
			asDirNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_DB_SCRIPTS_DIR_NODE_MARKER(module, file),
					label: <ModuleDBScriptsDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_DB_SCRIPTS_FILE_NODE_MARKER(module, file),
					label: <ModuleDBScriptsFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			}
		});
	};
	const createO23ModuleSourceFileNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return createModuleFileNodes({
			module, files: module.sourceFiles,
			asDirNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_DIR_NODE_MARKER(module, file),
					label: <ModuleSourceDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_SOURCE_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_FILE_NODE_MARKER(module, file),
					label: <ModuleSourceFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_SOURCE_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			}
		});
	};
	const createModuleSourceFileNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleSourceFileNodes(module);
		} else {
			return [];
		}
	};
	const createO23ModuleNodeFileNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return createModuleFileNodes({
			module, files: module.nodeFiles,
			asDirNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_NODE_DIR_NODE_MARKER(module, file),
					label: <ModuleNodeDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_NODE_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_NODE_FILE_NODE_MARKER(module, file),
					label: <ModuleNodeFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_NODE_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
							segments: [
								{label: module.name, icon: <ModuleRootIcon/>},
								{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
								...buildModuleFileAsActiveResource(file)
							]
						});
					}
				};
			}
		});
	};
	const createModuleNodeFileNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleNodeFileNodes(module);
		} else {
			return [];
		}
	};

	const detective = (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.ROOT) {
			// project node, create module nodes
			return createModuleNodes();
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_COMMANDS) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleCommandsChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_ENVS) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleEnvsChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_ENV) {
			const {value: {module, env}} = castTo<ModuleEnvNodeDef>(parentNode);
			return createModuleEnvChildNodes(module, env);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleO23ServerPipelineChildNodes(module as O23ModuleStructure);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleO23ScriptsPipelineChildNodes(module as O23ModuleStructure);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_DB_SCRIPTS) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleDBScriptsChildNodes(module as O23ModuleStructure);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_DB_SCRIPTS_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_FILES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleSourceFileNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_NODE_FILES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleNodeFileNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_NODE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_NODE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo(parentNode.value) === rootData) {
			// virtual root, given by tree itself. create physical root node, aka project node
			// put on last since the project root node's value are root data too.
			return [createRootNode()];
		} else {
			return [];
		}
	};

	return <ProjectFrameContainer title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>
		<UnwrappedTree data={rootData} detective={detective} initExpandLevel={1} height="100%"/>
	</ProjectFrameContainer>;
};
