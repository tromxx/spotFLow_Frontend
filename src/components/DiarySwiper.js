import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import {styled} from "styled-components";
import 'swiper/swiper.css'
import {useEffect, useMemo, useState} from "react";

const DiarySwipe = styled(Swiper)`
  width: 70vw;
  height: 90vh;
  background-color: white;
  display: flex;
`;
const TimeLine = styled(SwiperSlide)`
  width: 70vw;
  height: 90vh;
  background-color: #ccc;
`;
const Container = styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex-direction: column;
  /* background-color: gray; */
  position: relative;
  top: 7vh;
  background-color: black;
  justify-content: center;

  * {
    box-sizing: border-box;
  }
`;


const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: 3px solid #d9d9d9;
  background-color: #61dafb;
  z-index: 3;
`;

export const DiarySwiper = () => {
  const [overlay, setOverlay] = useState(0);
  const [top, setTop] = useState("55vh");
  const [content, setContent] = useState("test");
  function MoveOverLay(value) {
    if (top === "55vh") setTop("0");
    else setTop("55vh");
    if (overlay === 0) setOverlay(1);
  }
  function OverlayMode() {
    if (overlay === 0) setOverlay(1);
    else setOverlay(0);
  }
  const Overlay = useMemo(() => {
    return {
      width: "35vw",
      height: "36.5vh",
      top: top,
      right: 0,
      backgroundColor: "rgb(0,0,0,30%)",
      position: "absolute",
      zIndex: 2,
      color: "white",
      padding: "50px",
      fontSize: "3vh"
    }
  }, [top]);

  useEffect(() => {

  }, []);
  return (
    <Container>
      <DiarySwipe
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        onClick={()=>OverlayMode()}
      >
        <TimeLine>
          {overlay === 1 &&
            <div style={Overlay} onClick={()=>OverlayMode()}>
              {content}
            </div>
          }
          Slide 1
        </TimeLine>
        <Btn onClick={()=>MoveOverLay()}/>
      </DiarySwipe>
    </Container>
  );
};