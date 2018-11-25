import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useT } from 'react-i18next/hooks';
import format from 'date-fns/format';

import { TextField, Button, FormGroup, Select } from '@material-ui/core';

const Row = styled(FormGroup)`
  margin: 1em 0;
`;

const Form = ({ submit, periodOptions, currentPeriod, setPeriod }) => {
  const [t] = useT('lists');

  return (
    <form onSubmit={submit}>
      <Row>
        <TextField autoFocus name="name" label={t('Name')} required />
      </Row>
      <Row row>
        <TextField
          name="cycleLength"
          label={t('Cycle length')}
          type="number"
          defaultValue={1}
          inputProps={{
            min: 1,
            step: 1
          }}
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
          defaultValue={format(new Date(), 'YYYY-MM-DD')}
          required
        />
      </Row>
      <FormGroup>
        <Button type="submit" variant="outlined">
          {t('add')}
        </Button>
      </FormGroup>
      <p>* - {t('fields required')}</p>
    </form>
  );
};

Form.propTypes = {
  submit: PropTypes.func.isRequired,
  periodOptions: PropTypes.node.isRequired,
  currentPeriod: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired
};

export default Form;
