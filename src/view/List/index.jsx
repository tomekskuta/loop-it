import React from 'react';

import ListWrapper from '../components/ListWrapper';

const List = ({ list }) => {
  return (
    <ListWrapper title={list.name} subheader={list.nextCycleStart}>
      {list.name}
    </ListWrapper>
  );
};

export default List;
