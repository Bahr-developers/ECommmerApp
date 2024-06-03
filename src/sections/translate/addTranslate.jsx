import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Grid, Modal, Button, TextField, Typography } from '@mui/material';

import { TranslateUtils } from 'src/utils/translate.utils';

import { QueryKey } from 'src/Query/QueryKey';
import { useLanguage } from 'src/Query/AllQueryFn';

import Iconify from 'src/components/iconify';

const AddTranslateModal = () => {
  const queryClient = useQueryClient();
  const langauge = useLanguage()?.data;
  const [open, setOpen] = useState(false);

  const addTranslate = useMutation({
    mutationFn: TranslateUtils.addTranslate,
    onSuccess: () => {
      toast.success('Translate successfully added');
      queryClient.invalidateQueries({ queryKey: [QueryKey.translate] });
    },
    onError: (err) => {
      console.error(err, 'translate');
      toast.error('Something went wrong');
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTranslate = (e) => {
    e.preventDefault();
    const definition = {};

    // eslint-disable-next-line
    langauge.forEach((el) => (definition[el.code] = e.target[el.title].value));

    e.preventDefault();
    addTranslate.mutate({
      code: e.target.translateCode.value,
      definition,
      type: 'content',
    });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={() => setOpen(true)}
      >
        New Translate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleAddTranslate}
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
            Add Translate
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Enter translate code"
              name="translateCode"
              sx={{ marginBottom: '18px' }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {langauge?.map((lan) => (
              <TextField
                key={lan.id}
                fullWidth
                multiline
                name={`${lan.title}`}
                sx={{ marginBottom: '18px' }}
                label={`Enter value ${lan.code}`}
                required
              />
            ))}
          </Grid>
          <Grid item xs={12} sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="outlined" onClick={handleClose} sx={{ ml: 1 }}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default AddTranslateModal;
