import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { formatCurrency } from 'helper/mixins/IdrCurrency'

const columns = [
    { 
        id: 'komoditas', 
        label: 'Komoditas', 
        minWidth: '160px'
    },
    { 
        id: 'size', 
        label: 'Size', 
        minWidth: 100 
    },
    {
        id: 'harga',
        label: 'Harga',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'kota',
        label: 'Kota',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'provinsi',
        label: 'Provinsi',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(items) {
    if(items.length) {
        return items.map((item) => {
            return { 
                komoditas: hasAvailabilityData(item.komoditas), 
                size: hasAvailabilityData(item.size), 
                harga: hasAvailabilityData(item.price, 'price'), 
                kota: hasAvailabilityData(item.area_kota), 
                provinsi: hasAvailabilityData(item.area_provinsi) 
            };
        })
    }

    return []
} 

function hasAvailabilityData(data, type) {
    if(!!data) {
        if(type === 'price') {
            return formatCurrency(Number(data))
        }

        return data
    }

    return '-'
}

export default function ListCommodity(props) {
    const rows = createData(props.items)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} className="efishery-table">
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, idx) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}