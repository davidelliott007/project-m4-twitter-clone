import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";
import MeowListItem from "./MeowListItem";

function Home() {
  const currentuserContext = React.useContext(CurrentUserContext);

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);

  function handleMeowPost(event) {
    console.log("posted)");
    console.log(event.target.value);
  }

  function handleDraftMeow(event) {
    console.log(event.target.value);
  }

  React.useEffect(() => {
    async function getMeowsFromUser() {
      const profile_data = await currentuserContext.getMyProfilePromise();
      const feed = await currentuserContext.getFeedByHandlePromise(
        profile_data.profile.handle
      );
      setTweetsFromUser(feed.tweetsById);
    }
    getMeowsFromUser();
  });

  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainSection>
        <MeowComposer>
          <form onSubmit={handleMeowPost} onChnage={handleDraftMeow}></form>
        </MeowComposer>
        {Object.values(tweetsFromUser).map((element) => {
          return <MeowListItem tweetByID={element}></MeowListItem>;
        })}
      </MainSection>
    </Wrapper>
  );
}

const MeowComposer = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

export default Home;
