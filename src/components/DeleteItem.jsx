import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast';

import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from './iconify';

export default function DeleteModal({ deleteFn, id, handleCloseMenu }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteCloseBtn = () => {
    setOpen(false);
    deleteFn(id);
    toast.success('deleted successfully');
    handleCloseMenu();
  };

  return (
    <>
      <Typography
        onClick={handleClickOpen}
        sx={{ color: 'error.main', padding: '0', display: 'flex', alignItems: 'center' }}
      >
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Delete
      </Typography>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-slide-description ${id}`}>
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            sx={{
              backgroundColor: 'red',
              padding: '3px',
              color: 'white',
              ':hover': { backgroundColor: 'red', color: 'white' },
            }}
            onClick={deleteCloseBtn}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteModal.propTypes = {
  id: PropTypes.string,
  deleteFn: PropTypes.func,
  handleCloseMenu: PropTypes.func,
};
