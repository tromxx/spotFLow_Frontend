import React from "react";
import {styled} from 'styled-components'
import DefaultAvatar from "../images/default_avatar.png"

const UserContainerDiv = styled.div`
    width: 570px;
    height: 70px;
    border: 1px solid var(--grey);
    border-radius: 20px;
    outline: none;
    font-family: var(--efont);
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
    }
    button{
        width: 110px;
        height: 40px;
        border-radius: 20px;
        font-size: 20px;
        font-weight: bold;
        background-color: var(--lightblue);
        border: none;
    }
`;

const UserContainer = () =>{
    return(
        <UserContainerDiv>
            <img src={DefaultAvatar} alt="" />
            <p>nickname</p>
            <button>unfollow</button>
        </UserContainerDiv>
    );
};

export default UserContainer;