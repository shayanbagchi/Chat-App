import styled, { keyframes } from 'styled-components';

const backgroundColor = '#2b2a2f';
const backgroundColorLight = '#414144';
const backgroundLightGradient = `linear-gradient(
  to bottom right,
  ${backgroundColorLight},
  ${backgroundColor}
)`;

const medium = '320px';

const shadow =
  '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';

const breath = keyframes`
  0% {
     transform:scale(1.1);
     box-shadow:${shadow};
  }
  50% {
    transform:scale(0.6);
    box-shadow: 0 0 0 0 transparent;
    opacity: 0.3;
  }
    100% {
    transform:scale(1.1);
    box-shadow:${shadow};
    opacity: 0.4;
  }
`;

const BreathingCircleInner = styled.div`
  position: absolute;
  top: 0;
  left: -50vh;
  width: 98vh;
  height: 94%;
  border-radius: 50%;
  opacity: 0.4;
  background: ${backgroundLightGradient};
  box-shadow: ${shadow};
  transform: scale(1.1);
  z-index: -10;
  @media (min-width: ${medium}) {
    animation: ${breath} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 1s;
  }
`;

export default BreathingCircleInner;