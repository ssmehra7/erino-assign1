import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingContact, setEditingContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/v1/contact/view`,{
        headers:{
          //@ts-ignore
        "Authorization":"fdf60d74-c5f2-4a5f-bf71-40af09e59908",
        }
      });
      const data = Array.isArray(response.data) ? response.data : [];
      //@ts-ignore
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/v1/contact/delete/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEditOpen = (contact) => {
    setEditingContact(contact);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setEditingContact(null);
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${backend_url}/api/v1/contact/update/${editingContact.id}`, {
        ...editingContact,
      });
      fetchContacts(); // Refresh the contact list
      handleEditClose();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.company || "N/A"}</TableCell>
                  <TableCell>{contact.jobTitle || "N/A"}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(contact)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            value={editingContact?.firstName || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, firstName: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            value={editingContact?.lastName || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, lastName: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={editingContact?.email || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={editingContact?.phone || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, phone: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Company"
            value={editingContact?.company || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, company: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            value={editingContact?.jobTitle || ""}
            onChange={(e) =>
              setEditingContact({ ...editingContact, jobTitle: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Dashboard;
