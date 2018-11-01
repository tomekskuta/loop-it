import React from 'react';
import styled from 'styled-components';
import strings from '../../locale';

const Text = styled.h2`
  margin-top: 3em;
  text-align: center;
  width: 100%;
  cursor: pointer;
`;

const NoListsInfo = () => <Text>{strings.noLists}</Text>;

export default NoListsInfo;
