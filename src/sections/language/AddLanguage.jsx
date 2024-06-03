import toast from 'react-hot-toast';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// eslint-disable-next-line import/no-unresolved
import { Grid, Modal, Button, TextField, Typography } from '@mui/material';

import { LanguageUtils } from 'src/utils/language.utils';

import { QueryKey } from 'src/Query/QueryKey';

import Iconify from 'src/components/iconify';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddLanguageModal = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('No selected file');
  const [file, setFile] = useState('');

  // add Language
  const addLanguageFn = useMutation({
    mutationFn: LanguageUtils.addLanguage,
    onSuccess: () => {
      toast.success('Language added successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKey.language] });
    },
    onError: (err) => {
      console.log('err language', err);
      toast.error('Something went wrong');
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileImage = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setFileName(files.name);
      setImage(URL.createObjectURL(files));
    }
  };

  const handleAddTranslate = (e) => {
    e.preventDefault();

    const language = {
      code: e.target.languageCode.value,
      title: e.target.languageTitle.value,
      image: file,
    };

    addLanguageFn.mutate({
      code: language.code,
      title: language.title,
      image: language.image,
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
        New Language
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        component="form"
        onSubmit={handleAddTranslate}
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
          <Typography component="p" sx={{ marginBottom: '20px', fontSize: '20px' }}>
            Add Language
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              multiline
              label="language code"
              name="languageCode"
              inputProps={{ maxLength: 2 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: '20px' }}>
            <TextField fullWidth multiline label="language title" name="languageTitle" />
          </Grid>
          <Grid
            sx={{
              marginBottom: '20px',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<RiUploadCloudFill />}
            >
              Upload image
              <VisuallyHiddenInput type="file" name="languageImage" onChange={handleFileImage} />
            </Button>

            {image.length ? (
              <img src={image} alt="languageImage" width={60} />
            ) : (
              <Typography component="p">{fileName}</Typography>
            )}
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

export default AddLanguageModal;
