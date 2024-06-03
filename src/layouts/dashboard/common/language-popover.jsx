import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useLanguage } from 'src/Query/AllQueryFn';
import { ImageBaseUrl } from 'src/constants/BaseUrl';

export default function LanguagePopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const LANGS = useLanguage()?.data;

  const [language, setLanguage] = useState('uz');

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    setAnchorEl(null);
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(anchorEl && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img
          src={`${ImageBaseUrl}${
            LANGS?.find((lang) => lang.code === localStorage.getItem('language'))?.image_url
          }`}
          alt="salom"
          width={30}
          height={30}
        />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => handleClose(language)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS?.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleClose(option.code)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box
              component="img"
              alt={option.title}
              src={`${ImageBaseUrl}${option.image_url}`}
              sx={{ width: 28, mr: 2 }}
            />
            {option.title}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
