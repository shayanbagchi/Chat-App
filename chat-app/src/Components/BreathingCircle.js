import styled, { keyframes } from 'styled-components';

const backgroundContrastLight = '#3d4350';
const backgroundContrast = '#2a2f3a';

const backgroundContrastLightGradient = `linear-gradient(
  to bottom right,
  ${backgroundContrastLight},
  ${backgroundContrast}
)`;

const shadow =
  '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';

const breath = keyframes`
  0% {
     transform:scale(.9);
     box-shadow:${shadow};
  }
  50% {
    transform:scale(1);
    box-shadow: 0 0 0 0 transparent;
    opacity: 0.6
  }
    100% {
    transform:scale(.9);
    box-shadow:${shadow};
    opacity: 0.3
  }
`;

const BreathingCircle = styled.div`
  position: absolute;
  top: 0;
  left: -50vh;
  width: 98vh;
  height: 94%;
  border-radius: 50%;
  opacity: 0.3;
  background: ${backgroundContrastLightGradient};
  box-shadow:${shadow};
  animation: ${breath} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  z-index: -10;
`;

export default BreathingCircle;