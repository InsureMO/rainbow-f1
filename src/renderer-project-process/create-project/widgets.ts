import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const CreateProjectContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-container'})`
    display: grid;
    position: relative;
    grid-template-columns: 250px 1fr auto;
    grid-template-rows: auto 1fr auto;
    width: calc(100vw - 48px);
    height: 100vh;
    padding: 0 24px;
    overflow: hidden;

    > span[data-w=d9-caption] {
        grid-column: span 2;
        height: 64px;
    }

    > svg[data-icon=logo] {
        height: 48px;
        width: 48px;
        color: var(--f1-danger-color);
        align-self: center;
    }

    > div[data-w=f1-create-project-content] {
        grid-column: span 2;
    }

    > div[data-w=d9-button-bar] {
        grid-column: span 3;
        border-top: var(--f1-border);
        border-radius: 0;
    }
`;

export const CreateProjectSidebar = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-sidebar'})`
    display: flex;
    position: relative;
    flex-direction: column;
    border-top: var(--f1-border);
    border-right: var(--f1-border);
`;
export const CreateProjectContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'f1-create-project-content'})`
    display: flex;
    position: relative;
    border-top: var(--f1-border);
`;