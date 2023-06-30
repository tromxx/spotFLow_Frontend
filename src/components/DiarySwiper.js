import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import 'swiper/swiper.css'
import {useEffect, useState} from "react";
import * as SC from "./SwiperComponent"
import {BsChatDots} from "react-icons/bs";
import {FaRegThumbsUp, FaThumbsUp} from "react-icons/fa";
import dummy from "../dataSet/TimeLineData";

export const DiarySwiper = () => {
  // 오버레이 표시 여부
  const [overlay, setOverlay] = useState(0);
  // 댓글 표시 여부
  const [chatBox, setChatBox] = useState(0);
  const [thumbs, setThumbs] = useState(0);

  function OpenChat(e) {
    e.stopPropagation();
    if (chatBox === 0) setChatBox(1);
    else setChatBox(0);
  }

  function ThumbsUp(e) {
    e.stopPropagation();
    if (thumbs === 0) setThumbs(1);
    else setThumbs(0);
  }

  function OverlayMode() {
    if(chatBox === 1) setChatBox(0);
    if (overlay === 0) setOverlay(1);
    else setOverlay(0);
  }

  useEffect(() => {

  }, []);
  return (
    <SC.Container onClick={() => OverlayMode()}>
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

      >
        {dummy.map(e=> (
          <SC.TimeLine>
          {overlay === 1 &&
            <>
              <SC.Overlay>
                <SC.DiaryBox>
                  <span>diaryTitle</span>
                  <p>diaryContent</p>
                </SC.DiaryBox>
                <SC.TimeLineBox>
                  <span>{e.title}</span>
                  <p>{e.content}</p>
                </SC.TimeLineBox>
              </SC.Overlay>
            </>
          }
            <img src={e.image}/>
        </SC.TimeLine>
          )
        )
        }
      </SC.DiarySwipe>
      {chatBox === 1 &&  <SC.Comment/>}

      <SC.Btn onClick={(event) => OpenChat(event)}>
        <BsChatDots className="comment"/>
      </SC.Btn>
      <SC.Thumbs onClick={(event)=>ThumbsUp(event)}>
        {thumbs === 0 ? <FaRegThumbsUp className="thumbs-up"/> : <FaThumbsUp className="thumbs-up"/>}
      </SC.Thumbs>

    </SC.Container>
  );
};