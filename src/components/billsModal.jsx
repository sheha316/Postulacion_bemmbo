import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BillsModal({
  resetFunction, received, creditNote,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    resetFunction();
    setOpen(false);
  };
  return (
    <Box>
      <Button onClick={handleOpen} variant="contained">Asignar</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={modalStyle}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            sx={{
              borderRadius: 15,
              backgroundColor: 'lightGreen',
              width: 50,
              height: 50,
              alignSelf: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CheckIcon fontSize="large" sx={{ color: 'green', alignSelf: 'center' }} />
          </Box>
          <Typography
            sx={{ mt: 2, alignSelf: 'center' }}
          >
            Nota de crédito asignada correctamente.
          </Typography>
          <Typography
            sx={{ mt: 2, alignSelf: 'center' }}
          >
            Monto nota de crédito:
            {creditNote.amount}
            <Typography />
            Monto factura :
            {received.amount}
            <Typography />
            Monto final :
            {creditNote.amount - received.amount}
          </Typography>
          <Button onClick={onSubmit} variant="contained" color="secondary">
            Seguir asignando
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

BillsModal.propTypes = {
  resetFunction: PropTypes.func.isRequired,
  received: PropTypes.string.isRequired,
  creditNote: PropTypes.string.isRequired,
};
