import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMessageCircle,
  FiRepeat,
  FiHeart,
  FiUpload,
} from "react-icons/fi";
import { COLORS } from "./constants";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";

function MeowListItem({ tweetByID }) {
  const currentuserContext = React.useContext(CurrentUserContext);

  function toggleLiked(e) {
    console.log(tweetByID.id);
    console.log(tweetByID);

    async function getMeowIDSync() {
      const data = await currentuserContext.putLikeTweetByID(
        tweetByID.id,
        isLiked
      );
      if (data.success) {
        setIsLiked(!isLiked);
      }
    }
    getMeowIDSync();

    console.log(e.target);
  }

  const [author, setAuthor] = React.useState();
  const [authorImg, setAuthorImg] = React.useState();
  const [handle, setHandle] = React.useState();
  const [tweetImg, settweetImg] = React.useState();
  const [tweetStatus, setTweetStatus] = React.useState();
  const [tweetTimeStamp, setTweetTimeStamp] = React.useState();
  const [isLiked, setIsLiked] = React.useState();

  React.useEffect(() => {
    setAuthor(tweetByID.author.displayName);
    setHandle(tweetByID.author.handle);
    if (tweetByID.media[0] !== undefined) {
      settweetImg(tweetByID.media[0].url);
    }
    setTweetStatus(tweetByID.status);
    setAuthorImg(tweetByID.author.avatarSrc);
    let date = new Date(tweetByID.timestamp);
    let date_string = date.toDateString();
    let time_string = date.toLocaleTimeString("en-US");
    let full = time_string + " - " + date_string;
    setTweetTimeStamp(full);
    setIsLiked(tweetByID.isLiked);

    console.log(tweetByID);
  }, [tweetByID]);

  return (
    <TweetSection>
      <Author>
        <AuthorImg src={authorImg} alt="authorImg Image" />
        <AuthorNameHandle>
          <Name>{author}</Name>
          <Handle>@{handle}</Handle>
        </AuthorNameHandle>
      </Author>
      <TweetStatus>{tweetStatus}</TweetStatus>
      <TweetImg src={tweetImg} alt="Tweet Image" />
      <DateSection>{tweetTimeStamp}</DateSection>
      <Seperator />
      <TweetButtons>
        <MeowButton>
          <CustomFiMessageCircle />
        </MeowButton>
        <MeowButton>
          <FiRepeat />
        </MeowButton>
        <MeowButton onClick={toggleLiked}>
          {isLiked ? <FiHeart /> : <FilledFiHeart />}
        </MeowButton>
        <MeowButton>
          <FiUpload />
        </MeowButton>
      </TweetButtons>
    </TweetSection>
  );
}

const CustomFiMessageCircle = styled(FiMessageCircle)`
/* width: 20px;
height: 20px; */

  /* color: red;
  
  font-weight: ${(props) => (props.important ? "bold" : "normal")}; */
`;

const FilledFiHeart = styled(FiHeart)`
  /* width: 20px;
height: 20px; */
  fill: red;
  color: red;
`;

const MeowButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  :hover {
    cursor: pointer;

    color: ${COLORS.primary};
  }
`;

const MeowTitle = styled.div`
  padding-left: 10px;
`;

const NavigationArrow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  width: 90px;
`;

const Seperator = styled.div`
  margin-top: 10px;
  border-top: 1px solid #bbb;
  padding-bottom: 10px;
`;

const TweetButtons = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.7;
  justify-content: space-around;
  /* padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px; */
`;

const Name = styled.div`
  font-weight: bold;
`;

const Handle = styled.div`
  color: grey;
`;

const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuthorNameHandle = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const AuthorImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

const TweetImg = styled.img`
  width: 400px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const TweetStatus = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TweetSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #bbb;
  border-radius: 2px;
  padding: 15px;
  margin-bottom: 25px;
`;
const DateSection = styled.div`
  color: gray;
  font-size: 13px;
  padding-top: 10px;
`;

export default MeowListItem;
