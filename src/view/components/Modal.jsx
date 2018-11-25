import React from 'react';
import PropTypes from 'prop-types';
import { useT } from 'react-i18next/hooks';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core';

const Modal = ({ open, onClose, onSubmit, title, contentText, submitText, cancelText }) => {
  const [t] = useT();

  const handleSubmit = () => {
    if (!!onSubmit) onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>{submitText || t('ok')}</Button>
        {onSubmit && <Button onClick={onClose}>{cancelText || t('cancel')}</Button>}
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  contentText: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  cancelText: PropTypes.string
};

Modal.defaultProps = {
  onSubmit: null,
  title: '',
  submitText: '',
  cancelText: ''
};

export default Modal;
