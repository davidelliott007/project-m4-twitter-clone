import React from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";

import { withBaseIcon } from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

function Error505(props) {
  return (
    <Wrapper>
      <Icon icon={bomb} size={64} />
      <ErrorText>
        An unkown error has occured.
        <p> Please try refreshing the page, or contact support.</p>
      </ErrorText>
    </Wrapper>
  );
}

const ErrorText = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Error505;
