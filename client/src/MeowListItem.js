import React from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
import { COLORS } from "./constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function MeowListItem({ tweetByID, authorCurrentUser, isSelected }) {
  const currentuserContext = React.useContext(CurrentUserContext);
  let history = useHistory();

  function toggleLiked(e) {
    async function changeTweetLiked() {
      const data = await currentuserContext.putLikeTweetByID(
        tweetByID.id,
        isLiked
      );
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

  function toggleReTweeted(e) {
    console.log(tweetByID);

    async function changeReTweeted() {
      const data = await currentuserContext.putRetweetByID(
        tweetByID.id,
        isRetweeted
      );
      console.log(data);

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

  function handleTweetClicked(e) {
    history.push(`/tweet/${tweetByID.id}`);
  }

  function goToProfile(e) {
    console.log(tweetByID);
    e.stopPropagation();
    history.push(`/${tweetByID.author.handle}`);

    // history.push(`/${handlepassed}`);
  }

  const [author, setAuthor] = React.useState();
  const [authorImg, setAuthorImg] = React.useState();
  const [handle, setHandle] = React.useState();
  const [tweetImg, settweetImg] = React.useState();
  const [tweetStatus, setTweetStatus] = React.useState();
  const [tweetTimeStamp, setTweetTimeStamp] = React.useState();
  const [isLiked, setIsLiked] = React.useState();
  const [isRetweeted, setIsRetweeted] = React.useState();
  const [isARetweet, setIsARetweet] = React.useState();

  const [numLikes, setNumLikes] = React.useState();
  const [numRetweets, setNumRetweets] = React.useState();

  React.useEffect(() => {
    setIsARetweet(false);

    console.log(tweetByID);

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
    setIsRetweeted(tweetByID.isRetweeted);

    setNumLikes(tweetByID.numLikes);
    setNumRetweets(tweetByID.numRetweets);

    if (tweetByID.retweetFrom !== undefined) {
      console.log("retweetID");
      console.log(tweetByID);
      setIsARetweet(true);
      console.log(tweetByID.retweetFrom);
    }

    // console.log(isLiked);
    // console.log(tweetByID.isLiked);
  }, []);

  return (
    <div tabIndex="0" aria-label="View Tweet" aria-required="true">
      {isARetweet ? (
        <RetweetedBy>
          <FiRepeat></FiRepeat> Remeowed {tweetByID.retweetFrom.displayName}
        </RetweetedBy>
      ) : (
        ""
      )}
      <TweetSection
        onClick={handleTweetClicked}
        style={{
          border: tweetByID.isHighlighted
            ? "2px solid hotpink"
            : "2px solid #bbb",
        }}
      >
        <Author>
          <AuthorImg src={authorImg} alt="authorImg Image" />

          <AuthorNameHandle onClick={goToProfile}>
            <Name>{author}</Name>
            <Handle>@{handle}</Handle>
          </AuthorNameHandle>
        </Author>
        <TweetStatus>{tweetStatus}</TweetStatus>
        {tweetImg ? <TweetImg src={tweetImg} alt="Tweet Image" /> : ""}

        <DateSection>{tweetTimeStamp}</DateSection>
        <Seperator />
        <TweetButtons>
          <MeowButton>
            <CustomFiMessageCircle />
          </MeowButton>
          <MeowButton onClick={toggleReTweeted}>
            {isRetweeted ? <HighlightedFiRepeat /> : <FiRepeat />} {numRetweets}
          </MeowButton>
          <MeowButton onClick={toggleLiked}>
            {isLiked ? <FilledFiHeart /> : <FiHeart />} {numLikes}
          </MeowButton>
          <MeowButton>
            <FiUpload />
          </MeowButton>
        </TweetButtons>
      </TweetSection>
    </div>
  );
}

const TweetSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #bbb;
  border-radius: 2px;
  padding: 15px;
  margin-bottom: 25px;
  :hover {
    cursor: pointer;
    border: 2px solid hotpink !important;
  }
`;

const RetweetedBy = styled.div`
  font-style: Italic;
  color: ${COLORS.lightText};
`;

const CustomFiMessageCircle = styled(FiMessageCircle)`
/* width: 20px;
height: 20px; */

  /* color: red;
  
  font-weight: ${(props) => (props.important ? "bold" : "normal")}; */
`;

const FilledFiHeart = styled(FiHeart)`
  /* width: 20px;,,=,,,,,,,,,,,,,,,,
height: 20px; */h
  fill: red;
  color: red;
`;

const HighlightedFiRepeat = styled(FiRepeat)`
  /* width: 20px;
height: 20px; */
  color: ${COLORS.primary};
`;

const MeowButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  //TODO put in background hover state and focus state that is a round bg as well as cool like animations

  :focus {
    color: ${COLORS.primary};
    border-color: transparent;
  }

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
  border-bottom: 1px solid transparent;

  :hover {
    cursor: pointer;
    color: darkText;

    color: ${COLORS.primary};
    border-bottom: 1px solid ${COLORS.primary};
  }
`;

const Handle = styled.div`
  color: grey;
  border-bottom: 1px solid transparent;
  :hover {
    cursor: pointer;
    color: darkText;

    color: ${COLORS.primary};
    border-bottom: 1px solid ${COLORS.primary};
  }
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

const DateSection = styled.div`
  color: gray;
  font-size: 13px;
  padding-top: 10px;
`;

export default MeowListItem;
