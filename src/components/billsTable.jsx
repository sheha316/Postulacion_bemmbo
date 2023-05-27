import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

export default function BillsTable({
  data, handleChange, type, value, setBill, id,
}) {
  const columns = [
    { field: 'radioButton', headerName: ' ' },
    { field: 'id', headerName: 'Id' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'type', headerName: 'Type' },
  ];
  return (
    <FormControl>
      <FormLabel />
      <RadioGroup
        onChange={(e) => handleChange(e, setBill, type)}
        value={value}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns.map((header) => (
                  <TableCell key={header.field}>{header.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((objeto) => (objeto.type === type && type === 'received')
               || (objeto.type === type && type === 'credit_note' && objeto.reference === id)).map((bill, index) => (
                 <TableRow
                   key={bill.id}
                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 >
                   <TableCell>
                     <FormControlLabel value={index} control={<Radio />} label="" />
                   </TableCell>
                   <TableCell align="left">
                     inv_
                     {index}
                     {' '}
                     (
                     {bill.organization_id}
                     )
                   </TableCell>
                   <TableCell align="left">
                     $
                     {bill.amount}
                     {' '}
                     {bill.currency}
                   </TableCell>
                   <TableCell align="left">
                     {bill.type}
                   </TableCell>
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>
    </FormControl>
  );
}
BillsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.number,
    organization_id: PropTypes.string,
    currency: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  setBill: PropTypes.func.isRequired,
  id: PropTypes.string,
};
BillsTable.defaultProps = {
  value: null,
  id: null,
};
