import {createGlobalStyle} from 'styled-components';

export const GlobalStyles: any = createGlobalStyle`
    html, body {
        font-family: 'Noto Sans SC', 'Noto Sans JP', 'Roboto Mono', Arial, Helvetica, sans-serif;
        font-size: 14px;
    }

    @media (prefers-color-scheme: dark) {
        body {
            background: #020202;
            color: #fdfdfd;
        }
    }

    @media (prefers-color-scheme: light) {
        body {
            background-color: #fdfdfd;
            color: #020202;
        }
    }
`;
