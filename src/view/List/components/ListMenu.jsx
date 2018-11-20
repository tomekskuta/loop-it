import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useT } from 'react-i18next/hooks';
import format from 'date-fns/format';

import { FormGroup, Button, TextField, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Row = styled(FormGroup)`
  margin: ${({ margin }) => margin || 1}em 0 1em;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  margin-left: 1em;
`;

const ListMenu = ({
  deleteList,
  periodOptions,
  cycleLength,
  setCycleLength,
  currentPeriod,
  setPeriod,
  startDate,
  setStartDate
}) => {
  const [t, i18n] = useT('lists');

  return (
    <Fragment>
      <Row row>
        <TextField
          name="cycleLength"
          label={t('Cycle length')}
          type="number"
          defaultValue={cycleLength}
          inputProps={{
            min: 1,
            step: 1
          }}
          onChange={setCycleLength}
        />
        <Select value={currentPeriod} onChange={setPeriod} native>
          {periodOptions}
        </Select>
      </Row>
      <Row>
        <TextField
          name="startDate"
          type="date"
          label={t('Cycle start')}
          defaultValue={format(startDate, 'YYYY-MM-DD')}
          required
          onChange={setStartDate}
        />
      </Row>
      <Row margin="3">
        <Button variant="outlined" onClick={deleteList}>
          {t('delete list')}
          <StyledDeleteIcon />
        </Button>
      </Row>
    </Fragment>
  );
};

ListMenu.propTypes = {
  deleteList: PropTypes.func.isRequired,
  periodOptions: PropTypes.arrayOf(PropTypes.node).isRequired,
  cycleLength: PropTypes.number.isRequired,
  setCycleLength: PropTypes.func.isRequired,
  currentPeriod: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired
};

export default ListMenu;
