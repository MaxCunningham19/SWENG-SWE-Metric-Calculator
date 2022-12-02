import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DialogBox({token, setToken,repo, setRepo, isVerified, setVerified}) {
  const [open, setOpen] = React.useState(true);

  const [tmp_token, setTmpToken] = React.useState('');
  const [tmp_repo, setTmpRepo] = React.useState('');
  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setToken(tmp_token);
    setRepo(tmp_repo)
    setOpen(false);
    setVerified(true);
  };

  const handleRepoChange = (event) => {
    setTmpRepo(event.target.value);
  };

  const handleTokenChange = (event) => {
    setTmpToken(event.target.value);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a GitHub Repo and Personal Access Token
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="GitHub Repository Name"
            ype="name"
             fullWidth
             variant="standard"
             onChange={handleRepoChange}
             value={tmp_repo}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Personal Access Token"
            ype="name"
             fullWidth
             variant="standard"
             onChange={handleTokenChange}
             value={tmp_token}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DialogBox;