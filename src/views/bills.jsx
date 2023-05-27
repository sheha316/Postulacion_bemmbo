import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import API from '../services/api';
import Table from '../components/billsTable';
import Modal from '../components/billsModal';

function Bills() {
  const [bills, setBills] = useState(0);
  const [received, setReceived] = useState(null);
  const [creditNote, setCreditNote] = useState(null);

  const [receivedBill, setReceivedBill] = useState(null);
  const [creditNoteBill, setCreditNoteBill] = useState(null);

  const handleChangeReceived = (event, setBill, type) => {
    const index = event.target.value;
    setBill(bills.filter((element) => element.type === type)[parseInt(index, 10)]);
    setReceived(event.target.value);
  };
  const handleChangecreditNote = (event, setBill, type) => {
    const index = event.target.value;
    setBill(bills.filter((element) => element.type === type)[parseInt(index, 10)]);
    setCreditNote(event.target.value);
  };
  const resetFunction = () => {
    setCreditNote(null);
    setReceived(null);
    setReceivedBill(null);
    setCreditNoteBill(null);
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
            <Box style={{ fontWeight: 'bold', textAlign: 'center' }}>
              <h2>Selecciona una factura</h2>
            </Box>
            <Table data={bills} handleChange={handleChangeReceived} type="received" value={received} setBill={setReceivedBill} />
          </Box>
        )}

      {receivedBill !== null && (
      <Box style={{ alignSelf: 'center', padding: 5 }}>
        <Box style={{ fontWeight: 'bold', textAlign: 'center' }}>
          <h2>Selecciona una nota de crédito</h2>
        </Box>
        <Table data={bills} handleChange={handleChangecreditNote} type="credit_note" value={creditNote} setBill={setCreditNoteBill} id={receivedBill.id} />
      </Box>
      )}
      {creditNote !== null && (
        <Box style={{ alignSelf: 'center' }}>
          <Modal
            resetFunction={resetFunction}
            received={receivedBill}
            creditNote={creditNoteBill}
          />
        </Box>
      )}
    </Box>
  );
}

export default Bills;
