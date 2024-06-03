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

import { CategoryUtils } from 'src/utils/category.utils';

import { QueryKey } from 'src/Query/QueryKey';
import { useCategory } from 'src/Query/AllQueryFn';

import Scrollbar from 'src/components/scrollbar';

import AddCategoryModal from '../AddCategory';
import CategoryTableRow from '../category-table-row';
import { applyFilter, getComparator } from '../utils';
import CategoryTableHead from '../category-table-head';
import TranslateTableToolbar from '../category-table-toolbar';

export default function CategoryView() {
  const queryClient = useQueryClient();

  // get Language
  const getCategory = useCategory();
  const category = getCategory?.data;

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
      const newSelecteds = category.map((n) => n.code);
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
    inputData: category,
    comparator: getComparator(order, orderBy),
  });

  // delete language mutation FN
  const deleteLanguage = useMutation({
    mutationFn: CategoryUtils.deleteLanguage,
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
        <Typography variant="h4">Category</Typography>

        <AddCategoryModal />
      </Stack>

      <Card>
        <TranslateTableToolbar numSelected={selected.length} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CategoryTableHead
                order={order}
                orderBy={orderBy}
                rowCount={category?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'name' },
                  { id: 'categoryId', label: 'categoryId' },
                  { id: 'image', label: 'image' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered?.map((row) => (
                  <CategoryTableRow
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    category={row.category_id}
                    image={row.image_url}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
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
