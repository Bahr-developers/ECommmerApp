import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { LanguageUtils } from 'src/utils/language.utils';

import { QueryKey } from 'src/Query/QueryKey';
import { useLanguage } from 'src/Query/AllQueryFn';

import Scrollbar from 'src/components/scrollbar';

import AddLanguageModal from '../AddLanguage';
import LanguageTableRow from '../language-table-row';
import { applyFilter, getComparator } from '../utils';
import LanguageTableHead from '../language-table-head';
import TranslateTableToolbar from '../language-table-toolbar';

export default function LanguageView() {
  const queryClient = useQueryClient();

  // get Language
  const getLanguage = useLanguage();
  const languages = getLanguage?.data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [order, setOrder] = useState('asc');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [orderBy, setOrderBy] = useState('name');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = languages.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const dataFiltered = applyFilter({
    inputData: languages,
    comparator: getComparator(order, orderBy),
  });

  // delete language mutation FN
  const deleteLanguage = useMutation({
    mutationFn: LanguageUtils.deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.language] });
    },
    onError: (err) => {
      console.log('err', err);
      toast.err('Something went wrong');
    },
  });

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Language</Typography>

        <AddLanguageModal />
      </Stack>

      <Card>
        <TranslateTableToolbar numSelected={selected.length} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <LanguageTableHead
                order={order}
                orderBy={orderBy}
                rowCount={languages?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'code', label: 'code' },
                  { id: 'title', label: 'title' },
                  { id: 'image', label: 'image' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered?.map((row) => (
                  <LanguageTableRow
                    key={row.id}
                    id={row.id}
                    code={row.code}
                    title={row.title}
                    image={row.image_url}
                    selected={selected.indexOf(row.code) !== -1}
                    handleClick={(event) => handleClick(event, row.code)}
                    deleteLanguage={deleteLanguage.mutate}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
