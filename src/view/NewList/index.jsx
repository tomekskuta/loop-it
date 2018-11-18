import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useT } from 'react-i18next/hooks';
import format from 'date-fns/format';

import Form from './Form';
import ListWrapper from '../components/ListWrapper';

import { CYCLE_PERIODS } from '../../helpers/constants';

const NewList = ({ addList }) => {
  const [t] = useT('lists');

  const [period, setPeriod] = useState('D');

  const resetForm = event => {
    event.target.name.value = '';
    event.target.cycleLength.value = 1;
    setPeriod('D');
    event.target.startDate.value = format(new Date(), 'YYYY-MM-DD');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newList = {
      name: event.target.name.value,
      cycleLength: {
        count: event.target.cycleLength.value,
        period
      },
      startDate: event.target.startDate.value
    };
    addList(newList);
    resetForm(event);
  };

  const renderLengthOptions = CYCLE_PERIODS.map(periodOption => (
    <option key={periodOption.value} value={periodOption.value}>
      {t(`periods.${periodOption.label}`)}
    </option>
  ));

  return (
    <ListWrapper title={t('newListHeader')}>
      <Form
        submit={handleSubmit}
        currentPeriod={period}
        setPeriod={e => setPeriod(e.target.value)}
        periodOptions={renderLengthOptions}
      />
    </ListWrapper>
  );
};

NewList.propTypes = {
  addList: PropTypes.func.isRequired,
  hideNewList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addList: dispatch.lists.addList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList);
