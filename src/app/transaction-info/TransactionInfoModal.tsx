import { TransactionData } from "@/state/reducers/transactionsSlice"
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TransactionInfoModalProps
{
    transaction: TransactionData;
    open: boolean;
    handleClose: () => void;
}

export const TransactionInfoModal = ({transaction, open, handleClose}: TransactionInfoModalProps) =>
{
    return (
        <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "#424242",
            color: "#ffffff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
            <IconButton
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#ffffff",
                }}
                >
                <CloseIcon />
            </IconButton>
          <Typography variant="h5" gutterBottom textAlign="center">
            Transaction Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography><strong>Label:</strong></Typography>
            <Typography>{transaction.label}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography><strong>Type:</strong></Typography>
            <Typography>{transaction.type}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography><strong>Amount:</strong></Typography>
            <Typography>£{transaction.amount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography><strong>Start Date:</strong></Typography>
            <Typography>{transaction.startDate}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography><strong>End Date:</strong></Typography>
            <Typography>{transaction.endDate}</Typography>
          </Box>
        </Box>
        </Box>
      </Modal>
    )
}