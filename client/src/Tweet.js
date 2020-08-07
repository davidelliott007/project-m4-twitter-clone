import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";

function Tweet(props) {
  const itemId = useParams().tweetid;

  const [tweetID, settweetID] = React.useState(itemId);
  const [author, setAuthor] = React.useState();

  React.useEffect(() => {
    const apiUrl = "http://localhost:3000/api/tweet/" + itemId;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("got tweet data");
        console.log(data.tweet.author.displayName);

        setAuthor(data.tweet.author.displayName);
      });
  }, []);

  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <MainSection>{author}</MainSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

export default Tweet;
