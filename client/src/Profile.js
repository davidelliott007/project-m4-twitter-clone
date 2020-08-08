import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import MeowListItem from "./MeowListItem";
import { CurrentUserContext } from "./CurrentUserContext";

function Profile(props) {
  const currentuserContext = React.useContext(CurrentUserContext);

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);
  const [avatarImg, setAvatarImg] = React.useState([]);
  const [bannerImg, setBannerImg] = React.useState([]);
  const [displayName, setDisplayName] = React.useState([]);
  const [handle, setHandle] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [joined, setJoined] = React.useState([]);
  const [isFollowingYou, setIsFollowingYou] = React.useState([]);
  const [numFollowers, setNumFollowers] = React.useState([]);
  const [numFollowing, setNumFollowing] = React.useState([]);

  React.useEffect(() => {
    async function getMeowsFromUser() {
      const profile_data = await currentuserContext.getMyProfilePromise();

      setAvatarImg(profile_data.profile.avatarSrc);
      setBannerImg(profile_data.profile.bannerSrc);
      setDisplayName(profile_data.profile.displayName);
      setHandle(profile_data.profile.handle);
      setLocation(profile_data.profile.location);
      setJoined(profile_data.profile.joined);
      setIsFollowingYou(profile_data.profile.isFollowingYou);
      setNumFollowers(profile_data.profile.numFollowers);
      setNumFollowing(profile_data.profile.numFollowing);

      console.log(profile_data);
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
        <TopSection>
          <Banner
            style={{
              backgroundImage: "url(" + bannerImg + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            alt="banner Image"
          />

          <UnderBanner>
            <TopUserSection>
              <AvatarImg src={avatarImg} alt="avatar Image" />
            </TopUserSection>
          </UnderBanner>
        </TopSection>
        {displayName}
        {handle}
        {joined}
        {location}
        {numFollowers} Followers
        {numFollowing} Following
        {Object.values(tweetsFromUser).map((element) => {
          return <MeowListItem tweetByID={element}></MeowListItem>;
        })}
      </MainSection>
    </Wrapper>
  );
}

const FollowingButton = styled.button`
  border-radius: 15px;
  background-color: blue;
  border-color: transparent;
  color: white;
  width: 150px;
  height: 30px;
  margin-left: 100px;
`;

const DisplayName = styled.div``;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

const UnderBanner = styled.div`
  position: absolute;
  top: 110px;
  z-index: 5;
`;

const TopUserSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const Banner = styled.div`
  height: 150px;
  z-index: 1;
`;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

export default Profile;
