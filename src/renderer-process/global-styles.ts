import {CssVars} from '@rainbow-d9/n2';
import {createGlobalStyle} from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const GlobalStyles: any = createGlobalStyle`
    html, body {
        font-family: 'Noto Sans SC', 'Noto Sans JP', 'Roboto Mono', Arial, Helvetica, sans-serif;
        font-size: 14px;
    }

    body {
        background-color: #fdfdfd;
        color: #020202;
        --f1-row-height: 32px;
        --f1-label-color: #808080;
        --f1-label-ligther-color: #c0c0c0;
        --f1-primary-color: #5f88d6;
        --f1-hover-color: #eef6fd;
        --f1-invert-color: #fff;
        --f1-primary-shadow: ${CssVars.PRIMARY_SHADOW};
        --f1-primary-hover-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};

        --f1-border: 1px solid #e9e9e9;
        --f1-border-radius: 4px;
        --d9-font-variant: none;
        --d9-font-color: #444;
        --d9-primary-color: var(--f1-primary-color);
    }

    @media (prefers-color-scheme: dark) {
        body {
            background: #020202;
            color: #fdfdfd;
            --f1-label-color: #c7c7c7;
            --d9-font-color: #eee;
        }
    }

    @media (prefers-color-scheme: light) {
    }
`;
