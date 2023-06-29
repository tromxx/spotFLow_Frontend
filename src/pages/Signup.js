import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi"
import Policy from "../dataSet/SpotFlowPolicy";
import LocationPolicy from "../dataSet/LocationPolicy";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};

  .policyContainer {
    width: 70vw;
    max-width: 600px;
  }   

  .readContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    color: ${props=>props.theme.textColor};
    font-weight: bold;
    font-size: 25px;
    margin: 0 auto;
    
  }
	.sign {
		margin-top: 150px;
    padding: 0;
		display: flex;
		color: #313131;
    min-width: 150px;
	}

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }
  .item5 {
    
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 90px;
    display: flex;
    align-items: center;

  .check {
        
    width: 80px; 
    height: auto; 
    line-height : normal; 
    padding: .8em .5em; 
    background-color: ${props=>props.theme.divColor};
    color: ${props=>props.theme.textColor};
    font-family: inherit; /* 폰트 상속 */
    border: ${props=>props.theme.borderColor};
    border-radius: 18px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
    cursor: pointer;
  }
}

.hint {
  display: flex;
  margin-top: -5px;
  margin-bottom: 10px;
  justify-content:right;
  align-items:center;
  font-size: 12px;
  color: #999;
}
  /* .success {
    color: royalblue;
  }
  .error {
    color: red;
  } */

  .enable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    max-width: 400px; /* 원하는 너비 설정 */
    width: 50vw;
    height: 50px;
    color: white;
    background-color: #395144;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #395144;
    font-weight: 700;
    cursor: pointer;
  }
  .enable-button:active {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    max-width: 400px; /* 원하는 너비 설정 */
    width: 50vw;
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
    font-size: 26px;
    font-weight: bold;
    max-width: 400px; /* 원하는 너비 설정 */
    width: 50vw;
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
  }
  
  .InfoNotice {
    margin: 0 auto;
  }
  #myCheckbox {
    
    margin-bottom: 50px;
  }
  label {
    font-size: 12px;
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  max-width: 400px; /* 원하는 너비 설정 */
  width: 50vw;
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  background-color: ${props=>props.theme.divColor === '#d'};
  
`;






const SignUp = () => {

    const navigate = useNavigate();

     // 키보드 입력
     const [inputId, setInputId] = useState("");
     const [inputPw, setInputPw] = useState("");
     const [inputConPw, setInputConPw] = useState("");
     const [inputNickName, setInputNickName] = useState("");
     

      // 오류 메시지
      const [idMessage, setIdMessage] = useState("");
      const [pwMessage, setPwMessage] = useState("");
      const [conPwMessage, setConPwMessage] = useState("");
      const [nickNameMessage, setNickNameMessage] = useState("");

      // 유효성 검사
     const [isId, setIsId] = useState(false);
     const [isPw, setIsPw] = useState(false)
     const [isConPw, setIsConPw] = useState(false);
     const [isNickName, setIsNickName] = useState(false);
     
    
        // 팝업
     const [modalOpen, setModalOpen] = useState(false);
     const [modalText, setModalText] = useState("중복된 아이디 입니다.");

        // 약관동의 체크박스

    const [isPolicyChecked, setIsPolicyChecked] = useState(false);
    const [isLocationPolicyChecked, setIsLocationPolicyChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsPolicyChecked(event.target.checked);
        setIsLocationPolicyChecked(event.target.checked);
      };
  

     const closeModal = () => {
        setModalOpen(false);
        // navigate('/');  
    };


    // 아이디(이메일) 정규식 확인
    const onChangId = (e) => {
        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
          }
        setInputId(e.target.value)
        if (!validateEmail(e.target.value)) {
            setIdMessage("이메일 형식으로 입력해주세요");
               
        } else {
            setIdMessage("올바른 형식입니다.");
            
        }
    }



    // 비밀번호 정규식 확인

    const onChangePw = (e) => {
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자, 영문자, 특수문자를 포함한 8~25자리로 입력해주세요')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 :)')
            setIsPw(true);
        }        
    }


    // 비밀번호 확인 창 일치 여부 

    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }

    // 닉네임 정규식 체크

    const onChangeNickName = (e) => {
        setInputNickName(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 12) {
            setNickNameMessage("2자리 이상 12자리 미만으로 입력해 주세요.");
            setIsNickName(false);    
        } else {
            setNickNameMessage("올바른 형식 입니다.");
            
        }
    }

    // 이메일(아이디) 중복확인
    const onClickIdCheck = async() => {
        console.log("axios 날리기전 " + inputId);
        const mailCheck = await AxiosApi.memberRegCheck(inputId);
        console.log(mailCheck);
        if(mailCheck.data === true) {
            setIdMessage("사용 가능한 아이디입니다.")
            setIsId(true);
        } else {
            setIdMessage("이미 사용중인 아이디입니다.")
            setIsId(false); 
        }
    }   


     // 닉네임 중복확인
     const onClickNickNameCheck = async() => {
        const nickNameCheck = await AxiosApi.memberNickname(inputNickName);
        console.log(nickNameCheck);
        if(nickNameCheck.data === true) {
            setNickNameMessage("사용 가능한 닉네임입니다.")
            setIsNickName(true);
        } else {
            setNickNameMessage("이미 사용중인 닉네임입니다.")
            setIsNickName(false); 
        }
    }   


    

    

    const onClickLogin = async() => {
        // const signUp = await AxiosApi.memberReg(inputId, inputPw, inputNickName);
       
        setModalText("인증 이메일이 발송되었습니다.");
        setModalOpen(true);
              
    }


    return(
        <Container>
        <div className="sign">
            <p>회원가입</p>    
        </div>
        <div className="policyContainer">
            <h3>약관동의</h3>
                <div className="readContainer">
                    <Policy>

                    </Policy>
                </div>
                <label for="myCheckbox">스팟플로우 회원 약관에 동의합니다(필수)</label>
                <input type="checkbox" id="myCheckbox" checked={isPolicyChecked} onChange={handleCheckboxChange}/>
            <h3>위치기반 서비스 약관 동의</h3>
                <div className="readContainer">
                    <LocationPolicy>

                    </LocationPolicy>
                </div>
                <label for="myCheckbox">스팟플로우 위치기반서비스 이용약관에 동의합니다(필수)</label>
                <input type="checkbox" id="myCheckbox" checked={isLocationPolicyChecked} onChange={handleCheckboxChange}/>
                
        </div>
        <div className="InfoNotice">
            <h3>회원정보 입력</h3>
        </div>
        <div className="item5">
            <Input type="email" placeholder="이메일" value ={inputId} onChange={onChangId} className="emailInput"/>
            <button className="check" onClick={onClickIdCheck}>중복확인</button>
        </div>
        
        <div className="hint">
                {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
        </div>
        <div className="item2">
            <Input type="password" placeholder="비밀번호" value ={inputPw} onChange={onChangePw}/>
        </div>
        <div className="hint">
                {inputPw.length > 0 && (
                <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
        </div>
        <div className="item2">
            <Input type="password" placeholder="비밀번호 확인" value ={inputConPw} onChange={onChangeConPw}/>
        </div>
        <div className="hint">
                {inputPw.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
        </div>
        <div className="item5">
            <Input type="text" placeholder="닉네임" value ={inputNickName} onChange={onChangeNickName} className="nicknameInput"/>
            <button className="check" onClick={onClickNickNameCheck}>중복확인</button>
        </div>
        <div className="hint">
                {inputNickName.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{nickNameMessage}</span>)}
        </div>

        <div className="item2">
            {/* {(isPolicyChecked && isLocationPolicyChecked && isId && isPw && isConPw && isNickName) ?  */}
            <button className="enable-button" onClick={onClickLogin}>회원가입</button> 
            {/* : <button className="disable-button">회원가입</button>} */}
            <Modal open={modalOpen} close={closeModal} header="SpotFlow">{modalText}</Modal>
        </div>
        
        </Container>
    );
};

export default SignUp;