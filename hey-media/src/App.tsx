import React from 'react';
import styled from 'styled-components';

const App: React.FunctionComponent = () => {
  return (
    <Header>
      Hey Media
    </Header>
  );
}

export default App;

const Header = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 16px auto;
  text-align: center;
`;
