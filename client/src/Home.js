import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import { CurrentUserContext } from "./CurrentUserContext";

function Home() {
  const currentuserContext = React.useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = React.useState("loading user");
  React.useEffect(() => {
    console.log(currentuserContext);
    const apiUrl = "http://localhost:3000/api/me/profile";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.profile.handle);
      });
  });

  let loading = "loading";
  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainSection>
        {currentUser}
        Home Main Secion
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
