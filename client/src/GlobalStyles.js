import { createGlobalStyle } from "styled-components";

import { COLORS } from "./constants";

const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'Raleway', sans-serif;
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6, p, ul, li {
        margin: 0;
        padding: 0;
    }

    p {
        font-size: 16px;
    }

    a {
        color: ${COLORS.primary};
    }
    
`;

export default GlobalStyles;
