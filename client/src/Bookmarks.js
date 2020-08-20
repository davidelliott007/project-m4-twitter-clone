import React from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";

function Bookmarks(props) {
  return (
    <Wrapper>
      <Sidebar></Sidebar>

      <MainSection>Bookmarks</MainSection>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;
const MainSection = styled.div``;

export default Bookmarks;
