import {PROPERTY_PATH_ME, PropValue, Undefinable} from '@rainbow-d9/n1';
import {
	ButtonFill,
	ButtonInk,
	DOM_KEY_WIDGET,
	GlobalEventBusProvider,
	TreeNodeDef,
	UnwrappedButton,
	UnwrappedButtonBar,
	UnwrappedTree
} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {RecentProjectHolder, RecentProjectRoot} from '../../shared/constants';
import {EllipsisVertical, FolderClosed, FolderClosedEmpty, FolderOpen} from '../icons';

const CreateOrRecentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-container'})`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
// noinspection CssUnresolvedCustomProperty
const CreateOrRecentContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-content'})`
    display: flex;
    position: relative;
    flex-direction: column;
    max-height: max(60vh, 480px);
    width: max(60vw, 640px);
    margin: min(20vh, 96px) auto;
    border: var(--f1-border);
    border-radius: var(--f1-border-radius);
    padding: 24px 24px 0;

    > div[data-w=d9-tree] {
        border: 0;
        width: 100%;
    }

    > div[data-w=d9-button-bar] {
        border-top: var(--f1-border);
    }

    span[data-w=d9-tree-node-label] {
        flex-grow: 1;
        align-self: stretch;

        > span[data-recent-category], > span[data-recent-project] {
            display: flex;
            position: relative;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;

            > span[data-operator] {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                fill: var(--f1-label-color);
                border: 1px solid transparent;
                border-radius: calc(var(--f1-border-radius) * 2);
                opacity: 0;
                cursor: pointer;
                transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

                &:hover {
                    border-color: var(--f1-primary-color);
                    box-shadow: var(--f1-primary-hover-shadow);
                    fill: var(--f1-primary-color);
                }

                > svg[data-icon=ellipsis-vertical] {
                    height: 14px;
                    transition: fill 0.3s ease-in-out;
                }
            }
        }

        > span[data-recent-category] {
            > span[data-name] {
                flex-grow: 1;
            }

            > svg {
                width: 14px;
                height: 14px;
                margin-right: 8px;
                fill: var(--f1-label-color);

                &[data-icon=folder-closed-empty] + svg[data-icon=folder-open] {
                    display: none;
                }
            }
        }

        > span[data-recent-project] {
            > span {
                display: flex;
                position: relative;
                align-items: center;
            }

            > span[data-short-name] {
                padding: 0 6px;
                height: 24px;
                margin-right: 8px;
                font-stretch: ultra-condensed;
                border-radius: 8px;
                color: var(--f1-invert-color);
                background-color: var(--f1-primary-color);
            }

            > span[data-path] {
                flex-grow: 1;
                opacity: 0.5;
                font-size: 0.85em;
                margin-left: 12px;
                margin-top: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    span[data-w=d9-tree-node-toggle] {
        &[data-expanded=true] + span[data-w=d9-tree-node-label] > span[data-recent-category] > svg[data-icon=folder-closed] {
            display: none;
        }

        &[data-expanded=false] + span[data-w=d9-tree-node-label] > span[data-recent-category] > svg[data-icon=folder-open] {
            display: none;
        }
    }

    div[data-w=d9-tree-node-container]:hover span[data-w=d9-tree-node-label] {
        > span[data-recent-category], > span[data-recent-project] {
            > span[data-operator] {
                opacity: 1;
            }
        }
    }
`;
// noinspection CssUnresolvedCustomProperty
const NoRecentProject = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-nothing-found'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
    font-size: 1.2em;
    color: var(--f1-label-color);
    padding: 8px 0 24px;
    line-height: 1.5;
`;
const ButtonBarSpacer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-or-recent-button-bar-spacer'})`
    display: block;
    position: relative;
    flex-grow: 1;
`;

const computeShortName = (name: string): string => {
	return (name ?? '').trim().split(/[\s-_]/).map(s => s[0].toUpperCase()).filter((_, i) => i < 2).join('');
};

const RecentProjectTree = (props: { root: RecentProjectRoot }) => {
	const {root} = props;

	const detective = (parentNode: Undefinable<TreeNodeDef>): Array<TreeNodeDef> => {
		// the first "value" is given by UnwrappedTree, the second "value" is given by Tree
		// only root node will have two "value"
		// @ts-ignore
		const parent = (parentNode.value.value ?? parentNode.value) as unknown as RecentProjectHolder;
		const categories = parent.categories ?? [];
		const projects = parent.projects ?? [];
		const nodes: Array<TreeNodeDef> = [];
		categories.forEach((category) => {
			const hasChild = (category.categories ?? []).length !== 0 || (category.projects ?? []).length !== 0;
			nodes.push({
				marker: category.id,
				label: <span data-recent-category={true}>
					{hasChild ? <FolderClosed/> : <FolderClosedEmpty/>}
					<FolderOpen/>
					<span data-name={true}>{category.name}</span>
					<span data-operator={true}><EllipsisVertical/></span>
				</span>,
				value: category as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `category-${category.id}`, leaf: false
			});
		});
		projects.forEach((project) => {
			nodes.push({
				marker: project.id,
				label: <span data-recent-project={true}>
					<span data-short-name={true}>{computeShortName(project.name)}</span>
					<span data-name={true}>{project.name}</span>
					<span data-path={true}>{project.path}</span>
					<span data-operator={true}><EllipsisVertical/></span>
				</span>,
				value: project as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `project-${project.id}`, leaf: true
			});
		});
		return nodes;
	};

	return <GlobalEventBusProvider>
		<UnwrappedTree data={root} detective={detective}/>
	</GlobalEventBusProvider>;
};

export const CreateOrRecentPage = () => {
	const recentProjectsRoot = window.electron.getRecentProjects();
	// TODO MOCK DATA
	recentProjectsRoot.categories = [{
		id: '1', name: 'Hello world',
		categories: [{
			id: '11', name: 'Mars',
			projects: [{
				id: '111', name: 'Hello Mars',
				path: '/Users/xxx/Documents/hello-mars', exists: true, initialized: false
			}]
		}, {id: '12', name: 'Earth'}],
		projects: [{
			id: '21', name: 'Hello world',
			path: '/Users/xxx/Documents/hello-word', exists: true, initialized: false
		}]
	}];
	recentProjectsRoot.projects = [
		{id: '91', name: 'Hello world X', path: '/Users/xxx/Documents/hello-world-x', exists: true, initialized: false}
	];
	const hasRecentProjects = (recentProjectsRoot.categories ?? []).length !== 0 || (recentProjectsRoot.projects ?? []).length !== 0;

	const onCreateClicked = () => {
	};
	const onOpenClicked = () => {
	};

	return <CreateOrRecentContainer>
		<CreateOrRecentContent>
			{hasRecentProjects
				? <RecentProjectTree root={recentProjectsRoot}/>
				: <NoRecentProject>
					No recently opened projects.
					<br/>
					Create a new project or select a directory to open an existing project.
				</NoRecentProject>}
			<UnwrappedButtonBar>
				<UnwrappedButton onClick={onCreateClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}>
					New project
				</UnwrappedButton>
				<ButtonBarSpacer/>
				<UnwrappedButton onClick={onOpenClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}>
					Open an existing project
				</UnwrappedButton>
			</UnwrappedButtonBar>
		</CreateOrRecentContent>
	</CreateOrRecentContainer>;
};
