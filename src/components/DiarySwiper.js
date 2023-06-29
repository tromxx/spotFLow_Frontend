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
  border-radius: 15px;
`;
const TimeLine = styled(SwiperSlide)`
  width: 70vw;
  height: 90vh;
  background-color: #ccc;
  padding: 20px;
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
  const [top, setTop] = useState("90vh");
  const [diaryTitle, setDiaryTitle] = useState("test");

  function OpenChat(value) {
    if (top === "90vh") setTop("55vh");
    else setTop("90vh");
  }

  function OverlayMode() {
    if (overlay === 0) setOverlay(1);
    else setOverlay(0);
  }

  const Overlay = useMemo(() => {
    return {
      width: "35vw",
      height: top,
      top: 0,
      right: 0,
      backgroundColor: "rgb(0,0,0,30%)",
      position: "absolute",
      zIndex: 2,
      color: "white",
      padding: "50px",
      fontSize: "3vh"
    }
  }, [top]);
  const DiaryBox = useMemo(() => {
    return {
      width: "100%",
      height: "55vh"
    }
  }, []);
  const TimeLineBox = useMemo(() => {
    return {
      width: "100%",
      height: "55vh"
    }
  }, []);

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
        onClick={() => OverlayMode()}
      >
        <TimeLine>
          {overlay === 1 &&
            <>
              <div style={Overlay} onClick={() => OverlayMode()}>
                <div style={DiaryBox}>
                  <span>{diaryTitle}</span>
                </div>
                {top !== "55vh" &&
                  (<div style={TimeLineBox}>
                    <span>TimeLine</span>
                  </div>)
                }
              </div>

            </>
          }
          Slide 1
        </TimeLine>
        {overlay === 1 &&
          <Btn onClick={() => OpenChat()}/>
        }
      </DiarySwipe>
    </Container>
  );
};