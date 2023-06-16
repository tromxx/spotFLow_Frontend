import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';

const HeaderBarDiv = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--grey);
    p {
        font-family: var(--efont);
        font-size: 20px;
        padding-right: 70px;
    }
    img{
        padding-left: 70px;
    }
`;

const HeaderBar = () => {
    return (
        <HeaderBarDiv>
            <img src={Logo} alt="not working" />
            <p>Login / Signup</p>
        </HeaderBarDiv>
    );
};

export default HeaderBar;
