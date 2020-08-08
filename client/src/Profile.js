import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import MeowListItem from "./MeowListItem";

function Profile(props) {
  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);

  function getFeed(feedhandle) {
    console.log("get Feed");
    const apiUrl = "http://localhost:3000/api/" + feedhandle + "/feed";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.tweetsById);
        console.log(data);

        setTweetsFromUser(data.tweetsById);
      });
  }
  function getCurrentUser() {
    const apiUrl = "http://localhost:3000/api/me/profile";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.profile.handle);
        return data.profile.handle;
      })
      .then((handle) => {
        getFeed(handle);
        console.log(handle);
      });
  }

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  // /api/:handle/feed

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

export default Profile;
