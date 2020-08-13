import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./catlogo.svg";
import { COLORS } from "./constants";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

// TODO PUT IN THE DYSLEIXC FONT

function Sidebar(props) {
  return (
    <Wrapper>
      <Logo width={30} height={30}></Logo>
      <MenuItem>
        <FiHome></FiHome>
        <StyledLink activeClassName="active" to="/">
          Home
        </StyledLink>
      </MenuItem>

      <MenuItem>
        <FiUser></FiUser>
        <StyledLink activeClassName="active" to="/treasurymog">
          Profile
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <FiBell></FiBell>
        <StyledLink activeClassName="active" to="/Notifications">
          Notifications
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <FiBookmark></FiBookmark>
        <StyledLink activeClassName="active" to="/Bookmarks">
          Bookmarks
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <MeowButton>Meow</MeowButton>
      </MenuItem>
    </Wrapper>
  );
}
const StyledLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  padding-left: 10px;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeowButton = styled.button`
  border-radius: 15px;
  background-color: blue;
  border-color: transparent;
  color: white;
  width: 150px;
  height: 30px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  :hover {
    cursor: pointer;

    background-color: ${COLORS.primary};
    border-radius: 20px;
  }
`;

export default Sidebar;
