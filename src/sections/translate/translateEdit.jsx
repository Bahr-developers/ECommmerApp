import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// eslint-disable-next-line import/no-unresolved
import { Grid, Modal, Button, TextField, Typography } from '@mui/material';

import { TranslateUtils } from 'src/utils/translate.utils';

import { QueryKey } from 'src/Query/QueryKey';
import { useLanguage, useTranslate } from 'src/Query/AllQueryFn';

import Iconify from 'src/components/iconify';

const EditTranslate = ({ id, handleCloseMenu }) => {
  const translate = useTranslate()?.data;

  const getTranslateById = translate?.find((item) => item.id === id);

  const translateDef = {};
  getTranslateById?.definition.forEach((item) => {
    translateDef[item?.language?.code] = item?.value;
  });

  const language = useLanguage()?.data;

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  // edit translate
  const editTranslateFn = useMutation({
    mutationFn: TranslateUtils.editTranslate,
    onSuccess: () => {
      toast.success('Translate edited successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKey.translate] });
    },
    onError: (err) => {
      console.log('err Translate', err);
      toast.error('Something went wrong');
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditTranslate = (e) => {
    e.preventDefault();
    const definition = {};

    // eslint-disable-next-line no-return-assign
    language.forEach((el) => (definition[el.code] = e.target[el.title].value));
    editTranslateFn.mutate({
      id,
      definition,
    });
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <div>
      <Typography
        onClick={() => setOpen(true)}
        sx={{
          color: 'warning.main',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleEditTranslate}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <Typography component="h3" sx={{ fontSize: '20px', marginBottom: '15px' }}>
            Edit Translate
          </Typography>
          <Grid item xs={12}>
            {language?.map((lan) => (
              <>
                <Typography>{`Enter value ${lan.code}`}</Typography>
                <TextField
                  key={lan.id}
                  fullWidth
                  multiline
                  name={`${lan.title}`}
                  sx={{ marginBottom: '18px' }}
                  defaultValue={translateDef[lan?.code]}
                  required
                />
              </>
            ))}
          </Grid>
          <Grid item xs={12} sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="outlined" onClick={handleClose} sx={{ ml: 1 }}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

EditTranslate.propTypes = {
  id: PropTypes.string.isRequired,
  handleCloseMenu: PropTypes.func,
};

export default EditTranslate;
