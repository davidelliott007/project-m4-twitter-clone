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

  let textfieldValue;

  let maxCharCount = currentuserContext.maxCharCount;

  function handleMeowPost(event) {
    console.log("posted)");
    console.log(event.target.value);
  }

  function handleDraftMeow(event) {
    setInputCharCount(maxCharCount - event.target.value.length);
  }
  function inputClick(event) {
    console.log(event.target.value);
  }

  React.useEffect(() => {
    async function getMeowsFromUser() {
      maxCharCount = currentuserContext.maxCharCount;

      setInputCharCount(maxCharCount);
      const profile_data = await currentuserContext.getMyProfilePromise();

      setAuthorImg(profile_data.profile.avatarSrc);

      const feed = await currentuserContext.getFeedByHandlePromise(
        profile_data.profile.handle
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
            ></MeowComposerInput>
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
  margin-left: 20px;
  flex-grow: 3;
  text-align: top;
  padding: 10px;

  :focus {
    outline: 0;
    background-color: ${COLORS.secondary};
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
