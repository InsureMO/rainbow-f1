import styled from 'styled-components';
import {SideFrame, TreeNodeInnerLabel} from '../opened/sides/side-bar';

export const ProjectFrameContainer = styled(SideFrame)`
    > div[data-w=f1-wb-side-frame-body] {
        display: flex;
        flex-grow: 1;

        > div[data-w=d9-tree] {
            flex-grow: 1;
            border: 0;
            align-self: stretch;
            justify-self: stretch;
        }
    }
`;
export const NodeLabel = styled(TreeNodeInnerLabel)`
    > svg[data-icon] {
        align-self: center;
        justify-self: center;
    }

    > svg[data-icon] {
        height: 20px;
        width: 20px;
    }

    > svg[data-icon=f1-module-root],
    > svg[data-icon=f1-module-commands],
    > svg[data-icon=f1-module-envs] {
        height: 18px;
        width: 20px;
        padding-left: 1px;
    }

    > svg[data-icon=f1-module-node-files] {
        height: 16px;
        width: 18px;
        padding-left: 2px;
    }

    > svg[data-icon=f1-module-root] {
        path:first-child {
            opacity: 0.6;
        }

        path:last-child {
            opacity: 0.2;
        }
    }
`;