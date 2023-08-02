import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import FollowApi from "../../api/FollowApi";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const FollowingContainer = styled.div`
    margin-top: 20px;
    .hello{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        border: 1px solid var(--grey);
        padding: 15px 30px;
        border-radius: 20px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }
        button{
            width: 75px;
            height: 30px;
            border-radius: 20px;
            background-color: var(--blue);
            border: none;
            font-family: var(--kfont);
            cursor: pointer;
        }
        p{
          cursor: pointer;
          &:hover{
            color: var(--blue);
          }
        }
    }
`

const Following = () =>{
    const [datas , setDatas] = useState();
    const [loading, setLoading] = useState(true);
    const {setFollowing, setFollower} = useContext(UserContext);

    const deleteFollowing = async(email, id) =>{
        const data = {
          email : email,
          id : id
        }
        console.log(data);
        const response = await FollowApi.delUserFollowing(data);
        setDatas(response.data.following);
        setFollowing(response.data.count.following);
        setFollower(response.data.count.follower);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await FollowApi.getUserFollowing();
            setDatas(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        };
        fetchData();
      }, []);

    const goToUserPage =(e)=>{
      console.log(e);
    }

    return(
        <FollowingContainer>
        {loading ? (
          <p>로딩중...</p>
        ) : datas.length > 0 ? (
          datas.map((data) => (
            <div className="hello" key={data.email}>
              <img src={data.profilePic} alt="" />
              <p onClick={()=>goToUserPage(data.email)}>{data.nickname}</p>
              <button onClick={()=>deleteFollowing(data.email,data.id)}>삭제하기</button>
            </div>
          ))
        ) : (
          <p>팔로잉 하고 있는 유저가 없습니다.</p>
        )}
      </FollowingContainer>
    );
};

export default Following;