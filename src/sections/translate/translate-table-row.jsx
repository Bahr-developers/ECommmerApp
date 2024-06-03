import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { TranslateUtils } from 'src/utils/translate.utils';

import { QueryKey } from 'src/Query/QueryKey';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import DeleteModal from 'src/components/DeleteItem';

import EditTranslate from './translateEdit';

export default function TranslateTableRow({ id, selected, code, type, definition, handleClick }) {
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const queryClient = useQueryClient();

  // delete Translate
  const deleteTranslateFn = useMutation({
    mutationFn: TranslateUtils.deleteTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.translate] });
    },
    onError: (err) => {
      console.log('err Translate', err);
      toast.error('Something went wrong');
    },
  });

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

        <TableCell>
          <Label color={(type === 'error' && 'content') || 'success'}>{type}</Label>
        </TableCell>

        <TableCell>
          {definition?.length ? (
            definition.map((el) => (
              <Typography
                component="div"
                key={el?.language.code}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Typography>{el?.language?.code}:</Typography>
                <Typography>{el?.value}</Typography>
              </Typography>
            ))
          ) : (
            <Typography>definition is not available</Typography>
          )}
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
          <EditTranslate id={id} handleCloseMenu={handleCloseMenu} />
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteModal deleteFn={deleteTranslateFn.mutate} id={id} />
        </MenuItem>
      </Popover>
    </>
  );
}

TranslateTableRow.propTypes = {
  id: PropTypes.string,
  code: PropTypes.string,
  type: PropTypes.string,
  definition: PropTypes.array,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
