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
import { CurrentUserContext } from "./CurrentUserContext";
import SpinnerJustKF from "./SpinnerJustKF";
import { ERRORCODES } from "./constants";
import Error505 from "./Error505";

import Sidebar from "./SideBar";
let errorStaus = ERRORCODES.good;

function Meow(props) {
  const currentuserContext = React.useContext(CurrentUserContext);

  const itemId = useParams().tweetid;

  const [author, setAuthor] = React.useState();
  const [authorImg, setAuthorImg] = React.useState();
  const [handle, setHandle] = React.useState();
  const [tweetImg, settweetImg] = React.useState();
  const [tweetStatus, setTweetStatus] = React.useState();
  const [tweetTimeStamp, setTweetTimeStamp] = React.useState();

  React.useEffect(() => {
    async function getMeowIDSync() {
      const data = await currentuserContext.getMeowByIDPromise(itemId);

      if (data === "error 500") {
        errorStaus = ERRORCODES.error500;
        setAuthor([]);
        return;
      }

      setAuthor(data.tweet.author.displayName);
      setHandle(data.tweet.author.handle);

      if (data.tweet.media !== undefined && data.tweet.media.length > 0) {
        settweetImg(data.tweet.media[0].url);
      }
      setTweetStatus(data.tweet.status);
      setAuthorImg(data.tweet.author.avatarSrc);

      let date = new Date(data.tweet.timestamp);
      let date_string = date.toDateString();
      let time_string = date.toLocaleTimeString("en-US");
      let full = time_string + " - " + date_string;

      setTweetTimeStamp(full);
    }

    getMeowIDSync();
  }, []);

  return (
    <Wrapper>
      <Sidebar></Sidebar>
      {author === undefined ? (
        <SpinnerJustKF></SpinnerJustKF>
      ) : (
        <div>
          {errorStaus === ERRORCODES.error500 ? (
            <Error505></Error505>
          ) : (
            <TweetSection>
              <NavigationArrow>
                <FiArrowLeft></FiArrowLeft> <MeowTitle>Meow</MeowTitle>
              </NavigationArrow>
              <Seperator />
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
                <FiMessageCircle tabIndex="0" />
                <FiRepeat tabIndex="0" />
                <FiHeart tabIndex="0"></FiHeart>
                <FiUpload tabIndex="0"></FiUpload>
              </TweetButtons>
            </TweetSection>
          )}
        </div>
      )}
    </Wrapper>
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
`;
const DateSection = styled.div`
  color: gray;
  font-size: 13px;
  padding-top: 10px;
`;

export default Meow;
