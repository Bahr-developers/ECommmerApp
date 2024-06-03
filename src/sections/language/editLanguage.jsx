import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { RiUploadCloudFill } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// eslint-disable-next-line import/no-unresolved
import { Grid, Modal, Button, TextField, Typography, InputLabel } from '@mui/material';

import { LanguageUtils } from 'src/utils/language.utils';

import { QueryKey } from 'src/Query/QueryKey';
import { useLanguage } from 'src/Query/AllQueryFn';
import { ImageBaseUrl } from 'src/constants/BaseUrl';

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

const EditLanguageModal = ({ id }) => {
  const languages = useLanguage()?.data;
  const getLanguageById = languages?.find((item) => item.id === id);

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');

  // add Language
  const editLanguageFn = useMutation({
    mutationFn: LanguageUtils.editLanguage,
    onSuccess: () => {
      toast.success('Language edited successfully');
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
      setImage(URL.createObjectURL(files));
    }
  };

  const handleEditTranslate = (e) => {
    e.preventDefault();

    const language = {
      title: e.target.languageTitle.value || '',
      image: file || '',
    };

    editLanguageFn.mutate({
      id,
      title: language.title,
      image: language.image,
    });

    setOpen(false);
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        component="form"
        onSubmit={handleEditTranslate}
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
            Edit Language
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: '20px' }}>
            <InputLabel sx={{ marginBottom: '5px' }}>Language title</InputLabel>
            <TextField
              fullWidth
              multiline
              name="languageTitle"
              defaultValue={getLanguageById?.title}
            />
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
              <img
                src={`${ImageBaseUrl}${getLanguageById?.image_url}`}
                alt="languageImage"
                width={60}
              />
            )}
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

EditLanguageModal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditLanguageModal;
