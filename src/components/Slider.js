import React, { useCallback, useRef, useContext,useState, useEffect } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { RiHeart3Fill } from "react-icons/ri";
import { GrFormPreviousLink , GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import DiaryApi from '../api/DiaryApi';
import { UserContext } from '../context/UserStore';

// import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Sliderheader = styled.div`
    display:flex;
    align-items:center;
    justify-content:start;
    width: 100%;
    height: 30px;
    /* border: 1px solid; */
    background-color: white;
    border-top: 5px solid #2DCDDF ;
    border-top: ${(props) => props.theme.bgColor === '#171010' ? "5px solid white" : "5px solid #2DCDDF"};
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "grey" : "white"};

     .left {
        margin: 30px;
        width: 50%;
        font-family: 'Black Han Sans', sans-serif;
     }

     .right {
        width: 50%;
        display:flex;
        justify-content:end;
        margin: 30px;
        &:hover{
            color: gray;
            font-weight: bold;
        }
        font-family: 'Black Han Sans', sans-serif;
     }
`;

const Wrap = styled.div`

    * {
        font-family: 'Prompt', sans-serif;
        font-style: var(--kfont);
    }
    border-top:1px solid #2DCDDF;
    border-top: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "1px solid #2DCDDF"};
    position: relative;
    padding-bottom: 30px;
    overflow: hidden;
    width: 100%;
    height: 45%;
    margin:10px;
    margin-top: 0px;
    
	
    // 1. Global style 추가했던 것을 슬라이드 상단에 Wrap을 만들어 여기서 선언했습니다.
    .slick-slide {
        display: inline-block;

    }
	
    // 2. 제가 추가한 커스텀 클래스입니다.
    // pagination 부분입니다.
    .slick-dots.slick-thumb {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: 0;
        margin: 0;
        list-style: none;
        transform: translate(-50%);

        li {
            position: relative;
            display: inline-block;
			
            &.slick-active {
                span {
                    filter: none;
                }
            }
        }
    }  
`;

// 슬라이딩 개별 아이템 스타일링
const SlickItems = styled.div`
      position: relative; 
    width: 50%;  // Change this line
    height: 250px;
    text-align: center;


    .item {
        width: 95%;
        height:100%;
        position: relative;
    }

    

    .item-header {

        display:flex;
        justify-content:start;
        flex-direction: row;
        width: 100%;
        height: 20px;
        position: absolute;
        top:0px;
        right: -10px;
        z-index:1000;
         img {
            position:relative;
            top:5px;
            width: 25px;
            height: 25px;
            border-radius: 15px;
         }
         .timeline {
            display:flex;
            justify-content:center;
            position: absolute;
            top:15px;
            right: 20px;
            z-index: 10000;
            width: 30px;
            height:20px;

            .timeline img {
                background-color: white;
                border-radius:15px;
            }

            button {
                width:10px;
                height:10px;
                margin:2px;
                border-radius:100%;
                border:none;
                background-color: rgb(255,255,255,0.8)
            }
            button:hover {
                background-color: black;
            }
         }
    }

   // margin-top:10px;
    color: ${props=>props.theme.textColor};
    
   

    img {
        /* max-width: 250px */
        margin: 10px;
        margin-bottom:30px;
        width: 100%;
        height: 100%;
        vertical-align: top;
        padding: 0%;

    }

    .item-bottom {
        position: absolute;
        bottom:0;
        display:flex;
        justify-content:start;
        align-items:center;
        margin:0px;
        margin-left:10px;
        width: 99%;
        height: 40px;
     //   border:1px solid;

            .like {
                display:flex;
                margin:10px;   
                flex-direction:row;
                justify-content: center;
                align-items:center;
                background-color: white;
                color: #FF6F91;
                 /* background-color: rgb(117 190 218 / 0.2);
                color:white; */
                font-size:12px;
                border-radius: 15px;
                width: 45px;
                height:20px;
                
            }
    }
    
`;
//     width: 100%;    
//     height: 200px;
//     text-align: center;

//     img {
//         max-width: 100%;
//         height: 70%;
//         vertical-align: top;
//     }
// `;

const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 50px);
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${defaultButtonStyle}
    color:white;
    left: 0;
    top: 35%;
`;

const NextButton = styled.button`
    color: white;
    ${defaultButtonStyle}
    right: 0;
    top: 35%;
`;

const defaultIconStyle = css`
    font-size: 22px;
    color: #dedede;

    &:focus,
    &:hover {
        color: #666;
    }
`;

// const PrevIcon = styled(LeftOutlined)`
//     ${defaultIconStyle}
// `;

// const NextIcon = styled(RightOutlined)`
//     ${defaultIconStyle}
// `;

const PagingAnchor = styled.a`
    display: block;
    width: 50px;
    height: 50px;

    img {
        width: 100%;
        height: 100%;
        
        
    }
    h2 {
        width: 100%;
        height: 30px;
        font-size:300px;
        
    }
`;

// 3. custom pagination을 만듭니다.
// background를 통해 이미지를 넣어줍니다.
// filter를 통해 흑백으로 보이게 하고 active가 되면 흑백을 제거합니다. (31라인참고)
const Paging = styled.span`
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background: url(${props => props.src})no-repeat;
    background-size: 100% 100%;
    filter: grayscale(1);
`;




const MainSlider = ({setIsSearch,isSearch,data,fetchFriendData,email, names,setIsAll,setIsType}) => {

    const [isMobile, setIsMobile] = useState(3);
   // const [data,setData] = useState([]);



    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 668) {
            setIsMobile(1);
          } else  if (window.innerWidth <= 1268 && window.innerWidth > 1068) {
            setIsMobile(4);
          } 
          else  if (window.innerWidth <= 1068  && window.innerWidth > 868) {
            setIsMobile(3);
          } else  if (window.innerWidth <= 868) {
            setIsMobile(2);
          } 
          else  if (window.innerWidth > 1308) {
            setIsMobile(3);
          } 

          
        //   else {
        //     setIsMobile(5);
        //   }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const user = useContext(UserContext);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await DiaryApi.findMyDiary(user.email);
    //             if(res) {
    //                 console.log(res.data)
    //                 setData(res.data.filter(e=> e.delete === false ));
    //             }
    //         } catch (error) {
    //             console.error("데이터 불러오기실패 : ", error);
    //         }
    //     };
    //     fetchData();
    //     console.log(data);
    // }, []); 

    
    const navi = useNavigate();
	
    // 5. custom arrows를 만들어 ref를 통해 제어합니다.
    const slickRef = useRef(null);

	// 6. slick에 추가할 세팅입니다.
    const settings = {
        dots: false,
        
        // 2. 제가 추가한 커스텀 클래스입니다. (pagination)
        dotsClass: "slick-dots slick-thumb",
        
        // 5. custom arrows를 만들기 위해 기본 arrows옵션을 false로 합니다.
        arrows: false,
        infinite: true,
        slidesToShow: isMobile,
        slidesToScroll: isMobile,
        
        // 2. custom pagination을 만듭니다.
        // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
        customPaging: function(i) {
           // const imgSrc = images[i].src;
            return (
                <PagingAnchor>
                    <Paging src={data.timeLineList[0].image} />
                </PagingAnchor>
            );
        },
    };
    
	// 5. custom arrows 동작 함수를 만듭니다.
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    const [selectedImageKey, setSelectedImageKey] = useState(0);


    

    return (
        <>
            <Sliderheader>
                <div className='left'>
                    <div>{names}</div>           
                </div>
                <div className='right'>
                    {isSearch && <div onClick={()=> setIsSearch(false)}></div>}
                   { !isSearch && <div onClick={()=>{
                            setIsAll(false);
                            setIsType();
                         }}>See All</div> }
                         </div>
            </Sliderheader>
            <Wrap>
                <Slick ref={slickRef} {...settings}>
                    
                
                    {data.map((v, i) => {
                        return (

                            <SlickItems key={v.id} onClick={()=>{ navi(`/diary/detail/${v.id}`)}} key={`${v.title}_${i}`}>
                                <div className='item'> 
                                       <div className='item-header'>
                                            <img src={v.customer.profilePic} alt="" />
                                             <p>
                                                {v.customer.nickName}
                                            </p>   

                                                <div className='timeline'>
                                                { v.timeLineList.map((e,index)=> 
                                                    {   
                                                        return(
                                                        // <img className='timeline-img' style={{position:"relative",right:"0", width:"30px",height:"30px"}} src={e.image}></img>
                                                            <button key={e.id} onClick={()=> setSelectedImageKey(index) }></button>
                                                    )}
                                                )    
                                                }
                                                </div>
                                        </div>
                                        <img  src={ v.timeLineList[selectedImageKey].image }/>
                                        <div className='item-bottom' style={{fontSize:"15px", color:"black", zIndex:"2"}}>
                                            <div className='like'><RiHeart3Fill style={{marginRight:"3px"}}/>{v.like}</div>
                                            {v.title}
                                        </div>      
                                </div>
                            </SlickItems>

                        )
                    })}
                </Slick>
               
            </Wrap>
        </>
    );
};

export default MainSlider;