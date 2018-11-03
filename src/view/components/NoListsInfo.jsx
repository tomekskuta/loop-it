import React from 'react';
import styled from 'styled-components';
import { useT } from 'react-i18next/hooks';

const Text = styled.h2`
  margin-top: 3em;
  text-align: center;
  width: 100%;
  cursor: pointer;
`;

const NoListsInfo = () => {
  const [t] = useT();
  return <Text>{t('noLists')}</Text>;
};

export default NoListsInfo;
