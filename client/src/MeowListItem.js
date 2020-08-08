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

import Sidebar from "./SideBar";

function MeowListItem({ tweetByID }) {
  const itemId = useParams().tweetid;

  const [tweetID, settweetID] = React.useState(itemId);
  const [author, setAuthor] = React.useState();
  const [authorImg, setAuthorImg] = React.useState();
  const [handle, setHandle] = React.useState();
  const [tweetImg, settweetImg] = React.useState();
  const [tweetStatus, setTweetStatus] = React.useState();
  const [tweetTimeStamp, setTweetTimeStamp] = React.useState();

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
        <FiMessageCircle />
        <FiRepeat />
        <FiHeart></FiHeart>
        <FiUpload></FiUpload>
      </TweetButtons>
    </TweetSection>
  );
}

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
