import React from "react";
import { styled } from "styled-components";
import { AiOutlineSearch } from 'react-icons/ai';

const InputDiv = styled.div`
    position: relative;
    padding : 0;
    margin : 0;
`;
const Input = styled.input`
    width: 500px;
    height: 70px;
    border: 1px solid var(--grey);
    padding-left:70px;
    border-radius: 20px;
    outline: none;
    font-family: var(--efont);
    font-size: 20px;
`;

const SearchImg = styled(AiOutlineSearch)`
    position:absolute;
    bottom:12px;
    left:10px;
    height: 50px;
    width: 50px;
`;
const SearchBar = () =>{
    return(
        <InputDiv>
            <Input type="text"/>
            <SearchImg/>
        </InputDiv>
    );
};

export default SearchBar;