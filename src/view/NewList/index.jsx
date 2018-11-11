import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useT } from 'react-i18next/hooks';
import moment from 'moment';

import Form from './Form';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { cyclePeriods } from '../../helpers';

const StyledCard = styled(Card)`
  cursor: default;
`;

const NewList = ({ addList }) => {
  const [t] = useT('lists');

  const [period, setPeriod] = useState('d');

  const resetForm = event => {
    event.target.name.value = '';
    event.target.cycleLength.value = 1;
    setPeriod('d');
    event.target.startDate.value = moment().format('YYYY-MM-DD');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newList = {
      name: event.target.name.value,
      cycleLength: {
        value: event.target.cycleLength.value,
        period
      },
      startDate: event.target.startDate.value
    };
    addList(newList);
    resetForm(event);
  };

  const renderLengthOptions = cyclePeriods.map(periodOption => (
    <option key={periodOption.value} value={periodOption.value}>
      {t(`periods.${periodOption.label}`)}
    </option>
  ));

  return (
    <StyledCard>
      <CardHeader title={t('newListHeader')} />
      <CardContent>
        <Form
          submit={handleSubmit}
          currentPeriod={period}
          setPeriod={e => setPeriod(e.target.value)}
          periodOptions={renderLengthOptions}
        />
      </CardContent>
    </StyledCard>
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
