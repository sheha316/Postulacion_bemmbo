import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import API from '../services/api';
import Table from '../components/billsTable';
import Modal from '../components/billsModal';

function Bills() {
  const [bills, setBills] = useState(0);
  const [recived, setRecived] = useState(null);
  const [creditNote, setCreditNote] = useState(null);

  const handleChangerecived = (event) => {
    setRecived(event.target.value);
  };
  const handleChangecreditNote = (event) => {
    setCreditNote(event.target.value);
  };
  const resetFunction = () => {
    setCreditNote(null);
    setRecived(null);
  };
  useEffect(() => {
    async function GetBills() {
      setBills(await API.GetBills());
    }
    GetBills();
  }, []);
  return (
    <Box style={{
      display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column',
    }}
    >

      {bills !== 0
        && (
          <Box style={{ alignSelf: 'center', padding: 5 }}>
            {console.log(bills)}
            <Box style={{ fontWeight: 'bold', textAlign: 'center' }}>
              <h2>Selecciona una factura</h2>
            </Box>
            <Table data={bills} handleChange={handleChangerecived} type="received" value={recived} />
          </Box>
        )}

      {recived !== null && (
      <Box style={{ alignSelf: 'center', padding: 5 }}>
        <Box style={{ fontWeight: 'bold', textAlign: 'center' }}>
          <h2>Selecciona una nota de crédito</h2>
        </Box>
        <Table data={bills} handleChange={handleChangecreditNote} type="credit_note" value={creditNote} />
      </Box>
      )}
      {creditNote !== null && (
        <Box style={{ alignSelf: 'center' }}>
          <Modal resetFunction={resetFunction} />
        </Box>
      )}
    </Box>
  );
}

export default Bills;
