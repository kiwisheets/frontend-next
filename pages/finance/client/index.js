import React, { useState, useRef, useEffect } from 'react';
import {
  Checkbox,
  Fade,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import CLIENT_COUNT from '@/graphql/queries/clientCount';
import CLIENTS_LIST from '@/graphql/queries/clientsList';

import FullPanelSpinner from '@/components/FullPanelSpinner';
import { EnhancedTableHead, TableToolbar } from '@/components/Table';
import NextLink from '@/components/Link';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const tableHead = [
  // {
  //   id: 'id', numeric: false, disablePadding: false, label: 'ID',
  // },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'name2',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

export default function ClientsDashboard() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const highestPage = useRef(0);

  const { loading: countLoading, data: count } = useQuery(CLIENT_COUNT);

  const { loading, data, fetchMore } = useQuery(CLIENTS_LIST, {
    variables: {
      page: 0,
    },
  });

  const rows = data ? data.clients : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (page > highestPage.current) {
      fetchMore({
        variables: {
          page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            clients: [...prev.clients, ...fetchMoreResult.clients],
          };
        },
      });
      highestPage.current = page;
    }
  }, [page, fetchMore]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Fade in>
      <Paper>
        <TableToolbar numSelected={selected.length} title="Clients" />
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={tableHead}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={row.id}
                      selected={isItemSelected}
                      tabIndex={-1}
                      hover
                      // onClick={() => history.push(`client/${row.id}`)}
                      // style={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleSelect(event, row.id)}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row">
                        <Link component={NextLink} href={`client/${row.id}`}>
                          <Tooltip title="Test">
                            <>{row.name}</>
                          </Tooltip>
                        </Link>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  );
                })}
              {loading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <FullPanelSpinner />
                  </TableCell>
                </TableRow>
              )}
              {/* {emptyRows > 0 && (
              <TableRow style={{ height: (53) * emptyRows }}>
                <TableCell colSpan={6}>
                  { loading && <FullPanelSpinner />}
                </TableCell>
              </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={(() => {
            if (count) {
              return count.clientCount;
            }
            return 0;
          })()}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fade>
  );
}
