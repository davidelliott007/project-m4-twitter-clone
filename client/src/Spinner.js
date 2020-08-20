import React from "react";

import styled, { keyframes } from "styled-components";

import { Icon } from "react-icons-kit";

import { withBaseIcon } from "react-icons-kit";
import { loader } from "react-icons-kit/feather/loader";
import { useSpring, animated } from "react-spring";
import { Keyframes } from "react-spring/renderprops";

function Spinner() {
  const props = useSpring({
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    transform: "scale(1)",
    from: {
      transform: "rotate(360deg)",
    },
    config: {
      tension: 200,
      friction: 12,
    },
  });
  return (
    <>
      {/* <animated.div style={props}>
        <Icon icon={loader} size={64} />
      </animated.div> */}
    </>
  );
}

// const Container = Keyframes.Spring({
//   // Single props
//   show: { opacity: 1 },
//   // Chained animations (arrays)
//   showAndHide: [{ opacity: 1 }, { opacity: 0 }],
//   // Functions with side-effects with access to component props
//   wiggle: async (next, cancel, ownProps) => {
//     await next({ x: 100, config: config.wobbly });
//     await delay(1000);
//     await next({ x: 0, config: config.gentle });
//   },
// });

const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  display: block;
  border-radius: 50%;

  @media (prefers-reduced-motion: no-preference) {
    animation: 500ms ease-in forwards,
      ${scale} 300ms cubic-bezier(0.44, 0.11, 0.93, 0.72) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default Spinner;
