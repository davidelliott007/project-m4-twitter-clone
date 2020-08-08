import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import MeowListItem from "./MeowListItem";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";

function Profile(props) {
  const currentuserContext = React.useContext(CurrentUserContext);
  const profileID = useParams().profileID;

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
    console.log(profileID);

    async function getMeowsFromUser() {
      //const profile_data = await currentuserContext.getMyProfilePromise();
      const profile_data = await currentuserContext.getProfileByHandlePromise(
        profileID
      );

      console.log(profile_data);

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
          <FollowingButton>Following</FollowingButton>
        </TopSection>
        <AvatarImg src={avatarImg} alt="avatar Image" />
        <DisplayName>{displayName}</DisplayName>
        <HandleFollowing>
          <Handle>@{handle}</Handle>
          {isFollowingYou && <FollowsYou>Follows You </FollowsYou>}
        </HandleFollowing>
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

const FollowsYou = styled.div`
  border-radius: 20px;
  background-color: ${COLORS.secondary};
  padding: 7px;
  margin-left: 10px;
  font-size: 12px;
`;
const Handle = styled.div`
  color: grey;
`;

const HandleFollowing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DisplayName = styled.div`
  font-weight: bold;
`;

const FollowingButton = styled.button`
  border-radius: 15px;
  background-color: blue;
  border-color: transparent;
  color: white;
  width: 150px;
  height: 30px;
  align-self: flex-end;
  margin-top: 15px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
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
`;

const AvatarImg = styled.img`
  width: 100px;
  height: 100px;
  border: 2px solid white;

  border-radius: 80px;
  position: absolute;
  top: 110px;
  margin-left: 18px;
  z-index: 5;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const MainSection = styled.div``;

export default Profile;
