import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";

function Tweet(props) {
  const itemId = useParams().tweetid;

  const [tweetID, settweetID] = React.useState(itemId);
  const [author, setAuthor] = React.useState();
  const [authorImg, setAuthorImg] = React.useState();
  const [handle, setHandle] = React.useState();
  const [tweetImg, settweetImg] = React.useState();
  const [tweetStatus, setTweetStatus] = React.useState();

  React.useEffect(() => {
    const apiUrl = "http://localhost:3000/api/tweet/" + itemId;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("got tweet data");
        console.log(data.tweet.media);

        setAuthor(data.tweet.author.displayName);
        setHandle(data.tweet.author.handle);

        settweetImg(data.tweet.media[0].url);
        setTweetStatus(data.tweet.status);
        setAuthorImg(data.tweet.author.avatarSrc);
      });
  }, []);

  return (
    <Wrapper>
      <Sidebar></Sidebar>
      <TweetSection>
        <Author>
          <AuthorImg src={authorImg} alt="authorImg Image" />
          <AuthorNameHandle>
            <Name>{author}</Name>
            <Handle>@{handle}</Handle>
          </AuthorNameHandle>
        </Author>
        <TweetStatus>{tweetStatus}</TweetStatus>
        <TweetImg src={tweetImg} alt="Tweet Image" />
      </TweetSection>
    </Wrapper>
  );
}

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
`;

export default Tweet;
