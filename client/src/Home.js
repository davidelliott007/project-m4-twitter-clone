import React from "react";
import styled, { ThemeConsumer } from "styled-components";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";
import MeowListItem from "./MeowListItem";
import { COLORS } from "./constants";
import { ERRORCODES } from "./constants";
import Error505 from "./Error505";
import Spinner from "./Spinner";
import SpinnerJustKF from "./SpinnerJustKF";

import { useHistory } from "react-router-dom";

let keySelectedMeowIndex = 0;
let tweets_count = 0;
let outside_tweets;
let errorStaus = ERRORCODES.good;

function Home() {
  const currentuserContext = React.useContext(CurrentUserContext);
  let history = useHistory();

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);
  const [authorImg, setAuthorImg] = React.useState();
  const [inputCharCount, setInputCharCount] = React.useState();
  const [textfieldValue, setTextfieldValue] = React.useState();
  const [profile_data, setProfile_data] = React.useState();

  let maxCharCount = currentuserContext.maxCharCount;

  let yellowText;
  let redText;
  function handleDraftMeow(event) {
    setInputCharCount(maxCharCount - event.target.value.length);

    setTextfieldValue(event.target.value);
    console.log(textfieldValue);
  }
  function inputClick(event) {
    console.log(textfieldValue);

    async function postTweet() {
      let last_tweet = tweetsFromUser[tweetsFromUser.length - 1];
      const postedTweetConfirmation = await currentuserContext.postTweet(
        textfieldValue,
        last_tweet,
        profile_data
      );

      const feed = await currentuserContext.getFeedByHandlePromise(
        profile_data.profile.handle
      );
      // tweetsFromUser, setTweetsFromUser;
      // tweetsFromUser;
      // feed.tweetsById[0];

      console.log(feed.tweetsById[0].id);
      console.log(postedTweetConfirmation);
      // if feed.tweetsById[0]
      if (feed.tweetsById[0].id === postedTweetConfirmation.tweet.id) {
        setTweetsFromUser(feed.tweetsById);
      }

      //setTweetsFromUser({});

      // // ok so we basically have to build a valid tweet from

      // let mushed_tweets = { ...postedTweetConfirmation, ...tweetsFromUser };

      // console.log("mushed_tweets");

      // console.log(mushed_tweets);

      // setTweetsFromUser(mushed_tweets);
    }

    if (inputCharCount > 0) {
      console.log("inputCharCount");
      // console.log(tweetsFromUser[0]);
      let temp = tweetsFromUser[0];
      temp.status = "//////loading";
      temp.id = -1;
      let temps = outside_tweets;
      temps.unshift(temp);
      console.log(temps);
      setTweetsFromUser(temps);

      // const [tweetsFromUser, setTweetsFromUser] = React.useState([]);

      // tweetsFromUser[tweetsFromUser.length - 1];
      postTweet();
    }
  }

  function clearText(event) {
    setTextfieldValue("");
  }

  function highLightTweet() {
    outside_tweets = Object.values(outside_tweets).map((element, i) => {
      if (i === keySelectedMeowIndex) {
        element.isHighlighted = true;
      } else {
        element.isHighlighted = false;
      }

      return element;
    });
    setTweetsFromUser(outside_tweets);
  }

  function loadTweet(event) {
    console.log("load tweet");
    let currently_selected = outside_tweets[keySelectedMeowIndex];

    console.log(currently_selected);
    history.push(`/tweet/${currently_selected.id}`);
  }

  function keyPressHandler(event) {
    switch (event.key) {
      case "Enter": {
        loadTweet(event.target);
        //selectBook();
        // handleSelect(ev.target.value);

        return;
      }
      case "ArrowUp": {
        keySelectedMeowIndex = keySelectedMeowIndex - 1;
        if (keySelectedMeowIndex < 0) {
          keySelectedMeowIndex = 0;
        }
        console.log(keySelectedMeowIndex);

        highLightTweet();
        return;
      }
      case "ArrowDown": {
        keySelectedMeowIndex = keySelectedMeowIndex + 1;
        if (keySelectedMeowIndex > tweets_count) {
          keySelectedMeowIndex = tweets_count;
        }
        console.log(keySelectedMeowIndex);
        highLightTweet();

        return;
      }
      case "Escape": {
        // clear();
      }
    }
  }

  React.useEffect(() => {
    setTextfieldValue("What's meowing?");

    async function getMeowsFromUser() {
      maxCharCount = currentuserContext.maxCharCount;
      setInputCharCount(maxCharCount);

      // TODO: question for TCs - why doesn't profile_data update from insbide an asynch function?
      let local_profile_data = await currentuserContext.getMyProfilePromise();

      if (local_profile_data === "error 500") {
        console.log("profile data is ");
        console.log(local_profile_data);
        errorStaus = ERRORCODES.error500;
        setTweetsFromUser([]);

        return;
      }

      setProfile_data(local_profile_data);

      // setauthorCurrentUser(profile_data.profile.author);

      setAuthorImg(local_profile_data.profile.avatarSrc);

      const feed = await currentuserContext.getFeedByHandlePromise(
        local_profile_data.profile.handle
      );
      // TODO going to make the change from object to array here, to see if that helps with refresh

      console.log("first tweet");
      let test_obj = { isHighlighted: false };
      let combined = { ...feed.tweetsById[0], ...test_obj };
      console.log(feed.tweetsById[0]);
      console.log(combined);

      setTweetsFromUser(feed.tweetsById);

      outside_tweets = feed.tweetsById;

      tweets_count = Object.values(feed.tweetsById).length - 1;
    }
    getMeowsFromUser();
    window.addEventListener("keydown", keyPressHandler);
  }, []);

  //TODO note for josh - is the error checking here the best way to do this?  Seems Janky
  return (
    <Wrapper>
      {console.log(profile_data)}
      <Sidebar></Sidebar>
      {errorStaus === ERRORCODES.error500 ? (
        <Error505></Error505>
      ) : (
        <MainSection>
          <HomeTitle>Home</HomeTitle>
          {profile_data === undefined ? (
            <SpinnerJustKF></SpinnerJustKF>
          ) : (
            <MeowComposer>
              <AuthorAndIput>
                <AuthorImg src={authorImg} alt="authorImg Image" />
                <MeowComposerInput
                  type="text"
                  value={textfieldValue}
                  onChange={handleDraftMeow}
                  onClick={clearText}
                >
                  {textfieldValue}
                </MeowComposerInput>
              </AuthorAndIput>
              <CharCountAndButton>
                <RemainingChars
                  style={{
                    color:
                      inputCharCount <= 0
                        ? `${COLORS.redText}`
                        : inputCharCount <= 55
                        ? `${COLORS.yellowText}`
                        : `${COLORS.lightText}`,
                  }}
                >
                  {inputCharCount}
                </RemainingChars>

                {inputCharCount > 0 ? (
                  <MeowButton onClick={inputClick}>Meow!</MeowButton>
                ) : (
                  <MeowButtonPassive>No Meow!</MeowButtonPassive>
                )}
              </CharCountAndButton>
            </MeowComposer>
          )}

          {Object.values(tweetsFromUser).length > 0 ? (
            Object.values(tweetsFromUser).map((element, i) => {
              if (element.id === -1 && i == 0) {
                return <SpinnerJustKF></SpinnerJustKF>;
              } else if (element.id !== -1) {
                return (
                  <MeowListItem
                    tweetByID={element}
                    key={element.id}
                  ></MeowListItem>
                );
              }
            })
          ) : (
            <SpinnerJustKF></SpinnerJustKF>
          )}
        </MainSection>
      )}
    </Wrapper>
  );
}

const MeowComposer = styled.div``;

const AuthorAndIput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
`;

const MeowComposerInput = styled.textarea`
  height: 200px;
  border: none;
  border-radius: 3px;
  background-color: ${COLORS.inputBG};
  color: ${COLORS.lightText};
  margin-left: 20px;
  flex-grow: 3;
  text-align: top;
  padding: 10px;

  :focus {
    outline: 0;
    background-color: ${COLORS.secondary};
    color: black;
  }
`;

const RemainingChars = styled.div``;

const RemainingCharsYellow = styled.div`
  color: yellow;
`;

const RemainingCharsRed = styled.div`
  color: red;
`;

const MeowButton = styled.button`
  border-radius: 15px;
  background-color: blue;
  border-color: transparent;
  color: white;
  width: 80px;
  height: 30px;
  margin-left: 10px;
  :hover {
    cursor: pointer;

    background-color: ${COLORS.primary};
    border-radius: 20px;
  }
`;

const MeowButtonPassive = styled.button`
  border-radius: 15px;
  background-color: COLORS.meowButtonFade;
  border-color: transparent;
  color: grey;
  width: 80px;
  height: 30px;
  margin-left: 10px;
`;

const CharCountAndButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

const HomeTitle = styled.div`
  font-weight: bold;

  padding-bottom: 20px;
  padding-top: 20px;
`;

const AuthorImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

export default Home;
