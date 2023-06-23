import React, { useCallback, useRef } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';
import { GrFormPreviousLink , GrFormNextLink } from "react-icons/gr";
//import { LeftOutlined, RightOutlined } from '@ant-design/icons';


const Sliderheader = styled.div`
    display:flex;
    align-items:center;
    justify-content:start;
    width: 100%;
    height: 30px;
    /* border: 1px solid; */
    border-top: 10px solid #00b4d8;


     .left {
        margin: 30px;
        width: 50%;
     }

     .right {
        width: 50%;
        display:flex;
        justify-content:end;
        margin: 30px;
     }
`;

const Wrap = styled.div`
    border-top:5px solid lightblue;
    position: relative;
    padding-bottom: 30px;
    overflow: hidden;
    width: 100%;
    height: 33.3%;
    margin:0px;
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
    margin-top:20px;
    position: relative; // 추가
    width: 200%;    
    height: 150%;
    text-align: center;

    img {
        /* max-width: 250px */
        width: 180px;
        height: 120px;
        vertical-align: top;
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
`;

const NextButton = styled.button`
    color: white;
    ${defaultButtonStyle}
    right: 0;
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

// 4. 샘플이미지
const images = [
    {
        src: "https://i.pinimg.com/474x/6d/23/89/6d2389ac0bbd5afe74a2633b872d14fc.jpg",
        title: "역삼동"
    },
    {
        src: "https://i.pinimg.com/474x/b3/91/3e/b3913eb2cfef207381eb28d8033229ba.jpg",
        title: "강남역"
    },
    {
        src: "https://i.pinimg.com/474x/39/03/d4/3903d4a7dfd82def0c1a825416a69853.jpg",
        title: "삼전동"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
        title: "롯데월드"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212614_fawslbwd.jpg",
        title: "청계산"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212649_esiekzxf.jpg",
        title: "우주"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212707_zcrkccgp.jpg",
        title: "용인"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
        title: "구리시"
    },
];

const MainSlider = (props) => {
	
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
        slidesToShow: 5,
        slidesToScroll: 5,
        
        // 2. custom pagination을 만듭니다.
        // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
        customPaging: function(i) {
            const imgSrc = images[i].src;
            return (
                <PagingAnchor>
                    <Paging src={imgSrc} />
                </PagingAnchor>
            );
        },
    };
    
	// 5. custom arrows 동작 함수를 만듭니다.
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    return (
        <>
            <Sliderheader>
                <div className='left'>
                    <div> {props.name}</div>           
                </div>
                <div className='right'>
                    <div>See All</div>
                </div>
            </Sliderheader>
            <Wrap>
                <Slick ref={slickRef} {...settings}>
                    
                
                    {images.map((v, i) => {
                        return (

                            <SlickItems key={`${v.title}_${i}`}>     
                                <img src={v.src}  />
                                <h2 style={{fontSize:"15px", color:"black", zIndex:"2"}}>{v.title}</h2>      
                            </SlickItems>

                        )
                    })}
                </Slick>
                <>
                    <PrevButton onClick={previous}>
                        <GrFormPreviousLink style={{fontSize:"30px" }}/>
                            <span className="hidden"></span>
                    </PrevButton>

                    <NextButton onClick={next}>
                        <GrFormNextLink  style={{fontSize:"30px"}}/>
                        <span className="hidden"></span>
                    </NextButton>
                </>
            </Wrap>
        </>
    );
};

export default MainSlider;