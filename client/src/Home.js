import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";
import MeowListItem from "./MeowListItem";

function Home() {
  const currentuserContext = React.useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = React.useState("loading user");

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);

  React.useEffect(() => {
    async function getMeowsFromUser() {
      const profile_data = await currentuserContext.getMyProfilePromise();
      const feed = await currentuserContext.getFeedByHandlePromise(
        profile_data.profile.handle
      );
      setTweetsFromUser(feed.tweetsById);
    }
    getMeowsFromUser();

    // console.log(currentuserContext);
    // const apiUrl = "http://localhost:3000/api/me/profile";
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCurrentUser(data.profile.handle);
    //   });
  });

  let loading = "loading";
  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainSection>
        {Object.values(tweetsFromUser).map((element) => {
          return <MeowListItem tweetByID={element}></MeowListItem>;
        })}
      </MainSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

export default Home;
