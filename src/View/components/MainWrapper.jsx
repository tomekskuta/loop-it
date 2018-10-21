import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${props => (props.theme.colors ? props.theme.colors.mainBackground : '#fff')};
`;

export default MainWrapper;
