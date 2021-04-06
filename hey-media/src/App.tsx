import React from "react";
import styled from "styled-components";
import Siriwave from "react-siriwave";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Header>Hey Media</Header>
      <Siriwave color={"#3D5AFE"} speed={0.15} amplitude={0.7} cover={true} />
      <Text>Listening for command...</Text>
    </>
  );
};

export default App;

const Header = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  background: #f2f3f4;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
  text-align: center;
`;
