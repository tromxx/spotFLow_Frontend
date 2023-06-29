import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import 'swiper/swiper.css'
import {useEffect, useState} from "react";
import * as SC from "./SwiperComponent"
import {BsChatDots} from "react-icons/bs";
import {FaRegThumbsUp, FaThumbsUp} from "react-icons/fa";

export const DiarySwiper = () => {
  // 오버레이 표시 여부
  const [overlay, setOverlay] = useState(0);
  const [diaryTitle, setDiaryTitle] = useState("test");
  // 댓글 표시 여부
  const [chatBox, setChatBox] = useState(0);
  const [thumbs, setThumbs] = useState(0);

  function OpenChat() {
    if (chatBox === 0) setChatBox(1);
    else setChatBox(0);
  }

  function ThumbsUp() {
    if (thumbs === 0) setThumbs(1);
    else setThumbs(0);
  }

  function OverlayMode() {
    if (overlay === 0) setOverlay(1);
    else setOverlay(0);
  }

  useEffect(() => {

  }, []);
  return (
    <SC.Container>
      <SC.DiarySwipe
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
        <SC.TimeLine>
          {overlay === 1 &&
            <>
              <SC.Overlay onClick={() => OverlayMode()}>
                <SC.DiaryBox>
                  <span>{diaryTitle}</span>
                </SC.DiaryBox>
                <SC.TimeLineBox>
                  <span>TimeLine</span>
                </SC.TimeLineBox>
              </SC.Overlay>
            </>
          }
          Slide 1
        </SC.TimeLine>
      </SC.DiarySwipe>
      {chatBox === 1 &&  <SC.Comment/>}

      <SC.Btn onClick={() => OpenChat()}>
        <BsChatDots className="comment"/>
      </SC.Btn>
      <SC.Thumbs onClick={()=>ThumbsUp()}>
        {thumbs === 0 ? <FaRegThumbsUp className="thumbs-up"/> : <FaThumbsUp className="thumbs-up"/>}
      </SC.Thumbs>

    </SC.Container>
  );
};