/*
Search Bar 사용 방법 
1. 꼭 콜백 함수로 부모 클래스에 선언 필요
2. 부모 클래스에서 state 값으로 저장 필요 
*/

import React from "react";
import { styled } from "styled-components";
import { AiOutlineSearch } from 'react-icons/ai';

const InputDiv = styled.div`
    position: relative;
    padding: 0;
    margin: 0;
`;

const Input = styled.input`
    height: 40px;
    border: 1px solid var(--grey);
    padding-left: 70px;
    border-radius: 20px;
    outline: none;
    font-family: var(--efont);
    font-size: 20px;
`;

const SearchImg = styled(AiOutlineSearch)`
    position: absolute;
    bottom: 7px;
    left: 10px;
    height: 30px;
    width: 30px;
`;

const SearchBar = ({ onInputChange }) => {
    const handleInputChange = (event) => {
        const userInput = event.target.value;
        onInputChange(userInput);
    };

    return (
        <InputDiv>
            <Input type="text" onChange={handleInputChange} />
            <SearchImg />
        </InputDiv>
    );
};

export default SearchBar;