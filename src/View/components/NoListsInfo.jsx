import React from 'react';
import styled from 'styled-components';

import strings from '../../locale';

const Text = styled.h3`
  color: paleturquoise;
`;

const NoListsInfo = () => <Text>{strings.noLists}</Text>;

export default NoListsInfo;
