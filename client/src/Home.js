import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";
import MeowListItem from "./MeowListItem";
import { COLORS } from "./constants";

function Home() {
  const currentuserContext = React.useContext(CurrentUserContext);

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);
  const [authorImg, setAuthorImg] = React.useState();
  const [inputCharCount, setInputCharCount] = React.useState();
  const [textfieldValue, setTextfieldValue] = React.useState();
  const [authorCurrentUser, setauthorCurrentUser] = React.useState();
  const [profile_data, setProfile_data] = React.useState();

  let maxCharCount = currentuserContext.maxCharCount;
  function handleMeowPost(event) {
    // console.log("posted)");
    // console.log(event.target.value);
  }

  function reloadMeows() {
    async function reloadMeowsAsynch() {
      profile_data = await currentuserContext.getMyProfilePromise();

      // console.log("profile data is ");
      // console.log(profile_data);
      const feed = await currentuserContext.getFeedByHandlePromise(
        profile_data.profile.handle
      );

      let new_object = { ...feed.tweetsById, ...tweetsFromUser };
      console.log(new_object);

      setTweetsFromUser(new_object);
    }
    reloadMeowsAsynch();
  }

  function handleDraftMeow(event) {
    setInputCharCount(maxCharCount - event.target.value.length);
    setTextfieldValue(event.target.value);
    console.log(textfieldValue);
  }
  function inputClick(event) {
    console.log(textfieldValue);

    async function postTweet() {
      let posted_value = textfieldValue;
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
      console.log("new feed");
      console.log(feed);

      //setTweetsFromUser({});
      setTweetsFromUser(feed.tweetsById);

      // console.log("postedTweetConfirmation");
      // console.log(postedTweetConfirmation);

      // // ok so we basically have to build a valid tweet from
      // let mushed_tweets = { ...postedTweetConfirmation, ...tweetsFromUser };

      // console.log("mushed_tweets");

      // console.log(mushed_tweets);

      // setTweetsFromUser(mushed_tweets);
    }
    postTweet();
    console.log(event.target.value);
  }

  function clearText(event) {
    setTextfieldValue("");
  }

  React.useEffect(() => {
    setTextfieldValue("What's meowing?");

    async function getMeowsFromUser() {
      maxCharCount = currentuserContext.maxCharCount;
      setInputCharCount(maxCharCount);

      // TODO: question for TCs - why doesn't profile_data update from insbide an asynch function?
      let local_profile_data = await currentuserContext.getMyProfilePromise();

      setProfile_data(local_profile_data);
      // console.log("profile data is ");
      // console.log(profile_data);

      // setauthorCurrentUser(profile_data.profile.author);

      // setAuthorImg(profile_data.profile.avatarSrc);

      const feed = await currentuserContext.getFeedByHandlePromise(
        local_profile_data.profile.handle
      );
      setTweetsFromUser(feed.tweetsById);
    }
    getMeowsFromUser();
  }, []);

  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainSection>
        <HomeTitle>Home</HomeTitle>
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
            <RemainingChars>{inputCharCount}</RemainingChars>
            <MeowButton onClick={inputClick}>Meow!</MeowButton>
          </CharCountAndButton>
        </MeowComposer>
        {Object.values(tweetsFromUser).map((element) => {
          return <MeowListItem tweetByID={element}></MeowListItem>;
        })}
      </MainSection>
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

const RemainingChars = styled.div`
  color: ${COLORS.lightText};
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
