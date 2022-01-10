import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {  
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import { MdClear } from "react-icons/md";
import { Box } from '@mui/system';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
              <MdClear />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function BaseDialog(props) {
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
        setOpen(false);
        props.closeDialog();
    };

    React.useEffect(() => {
        setOpen(props.isDialog);
    }, [props.isDialog])

    return ( 
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Box sx={{ fontWeight: 600 }}>
                        {props.title}
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    {props.action}
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default BaseDialog;