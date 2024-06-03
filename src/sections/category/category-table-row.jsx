import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { ImageBaseUrl } from 'src/constants/BaseUrl';

import Iconify from 'src/components/iconify';
import DeleteModal from 'src/components/DeleteItem';

import EditLanguageModal from './editCategory';

export default function CategoryTableRow({
  id,
  selected,
  code,
  title,
  image,
  handleClick,
  deleteLanguage,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {code}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>
          <LazyLoadImage src={`${ImageBaseUrl}${image}`} alt={title} width={24} effect="blur" />
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <EditLanguageModal id={id} />
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteModal deleteFn={deleteLanguage} id={id} handleCloseMenu={handleCloseMenu} />
        </MenuItem>
      </Popover>
    </>
  );
}

CategoryTableRow.propTypes = {
  id: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  image: PropTypes.any,
  deleteLanguage: PropTypes.func,
};
