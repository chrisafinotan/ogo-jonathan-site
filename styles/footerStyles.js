import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const FooterNav = styled(motion.div)`
    height: 300px;
    margin-top: 296px;

`;

export const FooterContent = styled.div`
    color: ${(props) => props.theme.inv_text};
    font-size: 22px;
    font-weight: 600;
    flex: 1;
    // height: fit-content;
    span {
        // height: 1em;
        height: fit-content;
    }
    ${(props) =>
        props.wider &&
        css`
            flex: 2;
        `}
`;

export const FooterSocial = styled.div`
    display: flex;
    position: relative;
    a {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        padding: 8px;
        svg {
            width: 100%;
            height: 100%;
        }
    }
`;
