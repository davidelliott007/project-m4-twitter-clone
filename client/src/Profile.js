import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import MeowListItem from "./MeowListItem";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
function Profile(props) {
  const currentuserContext = React.useContext(CurrentUserContext);
  const profileID = useParams().profileID;

  const [tweetsFromUser, setTweetsFromUser] = React.useState([]);
  const [avatarImg, setAvatarImg] = React.useState();
  const [bannerImg, setBannerImg] = React.useState();
  const [displayName, setDisplayName] = React.useState();
  const [handle, setHandle] = React.useState();
  const [location, setLocation] = React.useState();
  const [joined, setJoined] = React.useState();
  const [isFollowingYou, setIsFollowingYou] = React.useState();
  const [numFollowers, setNumFollowers] = React.useState();
  const [numFollowing, setNumFollowing] = React.useState();
  const [bio, setBio] = React.useState([]);
  const [isBeingFollowedByYou, setIsBeingFollowedByYou] = React.useState();

  React.useEffect(() => {
    // console.log(profileID);

    async function getMeowsFromUser() {
      const profile_data = await currentuserContext.getProfileByHandlePromise(
        profileID
      );

      // console.log(profile_data);

      setAvatarImg(profile_data.profile.avatarSrc);
      setBannerImg(profile_data.profile.bannerSrc);
      setDisplayName(profile_data.profile.displayName);
      setHandle(profile_data.profile.handle);
      setLocation(profile_data.profile.location);

      let date = new Date(profile_data.profile.joined);

      const formattedDate = format(date, "MMMM yyyy");

      setJoined("Joined " + formattedDate);
      setIsFollowingYou(profile_data.profile.isFollowingYou);
      setNumFollowers(profile_data.profile.numFollowers);
      setNumFollowing(profile_data.profile.numFollowing);
      setBio(profile_data.profile.bio);
      setIsBeingFollowedByYou(profile_data.profile.isBeingFollowedByYou);
      // console.log(profile_data);
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
          <FollowingButton>
            {isBeingFollowedByYou ? "Following" : "Not Following"}
          </FollowingButton>
        </TopSection>
        <AvatarImg src={avatarImg} alt="avatar Image" />
        <DisplayName>{displayName}</DisplayName>
        <HandleFollowing>
          <Handle>@{handle}</Handle>
          {isFollowingYou && <FollowsYou>Follows You </FollowsYou>}
        </HandleFollowing>
        <Bio>{bio}</Bio>
        <LocationJoined>
          <LocationDiv>
            <SpacedFiMapPin />
            {location}
          </LocationDiv>
          <CalendarDiv>
            <SpacedFiCalendar />
            {joined}
          </CalendarDiv>
        </LocationJoined>
        <Followers>
          <FollowDiv>
            <NumFollowersDiv>{numFollowers}</NumFollowersDiv>
            Followers
          </FollowDiv>
          <FollowDiv>
            <NumFollowersDiv>{numFollowing}</NumFollowersDiv>
            Following
          </FollowDiv>
        </Followers>
        <LowerActionBar>
          <LowerActionBarButton>Tweets</LowerActionBarButton>
          <LowerActionBarButton>Media</LowerActionBarButton>
          <LowerActionBarButton>Links</LowerActionBarButton>
        </LowerActionBar>
        <Seperator></Seperator>
        {Object.values(tweetsFromUser).map((element) => {
          return <MeowListItem tweetByID={element}></MeowListItem>;
        })}
      </MainSection>
    </Wrapper>
  );
}

const Seperator = styled.div`
  border-top: 1px solid ${COLORS.lightText};
  padding-bottom: 10px;
`;

const LowerActionBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  align-items: stretch;
`;

const LowerActionBarButton = styled.button`
  border-color: transparent;
  background-color: transparent;
  color: ${COLORS.darkText};
  height: 30px;
  border-bottom: 1px solid white;
  min-width: 100px;
  max-width: 300px;

  :hover {
    cursor: pointer;
    color: darkText;

    color: ${COLORS.primary};
    border-bottom: 1px solid ${COLORS.primary};
  }
`;

const SpacedFiMapPin = styled(FiMapPin)`
  margin-right: 5px;
  /* color: red;
  
  font-weight: ${(props) => (props.important ? "bold" : "normal")}; */
`;

const SpacedFiCalendar = styled(FiCalendar)`
  margin-right: 5px;
  /* color: red;
  
  font-weight: ${(props) => (props.important ? "bold" : "normal")}; */
`;

const NumFollowersDiv = styled.div`
  font-weight: bold;
  color: black;
  padding: 3px;
`;

const Bio = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;
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

const LocationDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 30px;
`;
const CalendarDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const LocationJoined = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.lightText};
`;

const FollowDiv = styled.div`
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.lightText};
`;

const Followers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
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
