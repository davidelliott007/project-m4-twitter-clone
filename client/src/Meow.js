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
import { COLORS } from "./constants";

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
  const [isARetweet, setIsARetweet] = React.useState();
  const [isLiked, setIsLiked] = React.useState();
  const [isRetweeted, setIsRetweeted] = React.useState();
  const [numLikes, setNumLikes] = React.useState();
  const [numRetweets, setNumRetweets] = React.useState();
  const [tweet, setTweet] = React.useState();

  function stopPropagationButton(e) {
    e.stopPropagation();
  }

  function toggleReTweeted(e) {
    async function changeReTweeted() {
      const data = await currentuserContext.putRetweetByID(itemId, isRetweeted);

      if (data.success) {
        if (isRetweeted === true) {
          setNumRetweets(numRetweets - 1);
          setIsRetweeted(false);
        }
        if (isRetweeted === false) {
          setNumRetweets(numRetweets + 1);
          setIsRetweeted(true);
        }
      }
    }
    e.stopPropagation();

    // retweet iis a stretch goal
    //changeReTweeted();
  }

  function toggleLiked(e) {
    async function changeTweetLiked() {
      const data = await currentuserContext.putLikeTweetByID(itemId, isLiked);
      if (data.success) {
        if (isLiked === true) {
          setNumLikes(numLikes - 1);
          setIsLiked(false);
        }
        if (isLiked === false) {
          setNumLikes(numLikes + 1);
          setIsLiked(true);
        }
      }
    }
    e.stopPropagation();
    changeTweetLiked();
  }

  React.useEffect(() => {
    setIsARetweet(false);

    async function getMeowIDSync() {
      const data = await currentuserContext.getMeowByIDPromise(itemId);

      if (data === "error 500") {
        errorStaus = ERRORCODES.error500;
        setAuthor([]);
        return;
      }

      setTweet(data.tweet);

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

      setIsLiked(data.tweet.isLiked);
      setIsRetweeted(data.tweet.isRetweeted);

      setNumLikes(data.tweet.numLikes);
      setNumRetweets(data.tweet.numRetweets);

      setTweetTimeStamp(full);

      if (data.tweet.retweetFrom !== undefined) {
        setIsARetweet(true);

        //TODO: Retweets are just one object, should this code be setup
        setNumRetweets(1);
      }
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
                <MeowButton onClick={stopPropagationButton}>
                  <CustomFiMessageCircle />
                </MeowButton>
                <ButtonAndValue>
                  <MeowButton onClick={toggleReTweeted}>
                    {isARetweet ? <HighlightedFiRepeat /> : <FiRepeat />}
                  </MeowButton>
                  {isARetweet ? (
                    <ReTweetsNumHighlighted>
                      {numRetweets}
                    </ReTweetsNumHighlighted>
                  ) : (
                    <ReTweetsNum>{numRetweets}</ReTweetsNum>
                  )}
                </ButtonAndValue>
                <ButtonAndValue>
                  <MeowButton onClick={toggleLiked}>
                    {isLiked ? <FilledFiHeart /> : <FiHeart />}
                  </MeowButton>
                  {numLikes}
                </ButtonAndValue>
                <MeowButton onClick={stopPropagationButton}>
                  <FiUpload />
                </MeowButton>
              </TweetButtons>{" "}
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

const RetweetedBy = styled.div`
  font-style: Italic;
  color: ${COLORS.lightText};
`;

const CustomFiMessageCircle = styled(FiMessageCircle)`
  /* width: 20px;
height: 20px; */

  /* color: red;
  
  font-weight: ${(props) =>
    props.important ? "bold" : "normal"}; */
`;

const FilledFiHeart = styled(FiHeart)`
  fill: rgb(224, 36, 94);
  color: red;
`;

const HighlightedFiRepeat = styled(FiRepeat)`
  /* width: 20px;
height: 20px; */
  color: green;
`;

const ReTweetsNumHighlighted = styled.span`
  color: green;
`;

const ReTweetsNum = styled.span``;

const ButtonAndValue = styled.div``;

const MeowButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  width: 40px;
  height: 40px;

  :focus {
    color: ${COLORS.primary};
  }

  :hover {
    cursor: pointer;

    border-radius: 70%;
    background-color: ${COLORS.secondary};

    color: ${COLORS.primary};
  }
`;

export default Meow;
