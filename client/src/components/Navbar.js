import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react'
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

const pages = ['Home'];


const btn = ['Search By Repo'];

function Navbar({data, toggleTheme}) {
  const [open, setOpen] = React.useState(true);

  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepoChange = event => {
    setRepo(event.target.repo);
    console.log('repo is:', event.target.repo);
  }

    const handleTokenChange = event => {
      setToken(event.target.token);
      console.log('token is:', event.target.token);
    }
  const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '25ch',
    backgroundColor: '#8368a9',
    '&:hover fieldset': {
      border: 'none',
    },
    '&:hover': {
      backgroundColor: '#8368a9',
    },
    '&.Mui-focused .MuiOutlinedInput-root': {
        backgroundColor: '#8368a9',
       },
       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 1,
        borderColor: '#000000',
       },
    // '& .MuiInputBase-input': {
    //   transition: theme.transitions.create('width'),
    //   width: '50ch',
    //   [theme.breakpoints.up('sm')]: {
    //     '&:focus': {
    //       width: '25ch',
    //     },
    //   },
    // },
              //  width: 250,
              // '& .MuiInputBase-input': {
              //   transition: theme.transitions.create('width'),
              //   width: '100%',
              //   [theme.breakpoints.up('sm')]: {
              //     width: '12ch',
              //     '&:focus': {
              //       width: '20ch',
              //     }
              //   }
              // },
              // '&.Mui-focused .MuiOutlinedInput-root': {
              //   backgroundColor: '#8368a9',
              //  },
              //  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              //   border: 1,
              //   borderColor: '#000000',
              //  },
              }));


  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
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
          type="name"
          fullWidth
          variant="standard"
          onChange={handleRepoChange}
          repo={repo}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Personal Access Token"
          type="name"
          fullWidth
          variant="standard"
          onChange={handleTokenChange}
          token={token}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
    <AppBar style={{ background: '#6e5494', border: 1}} position="absolute">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleOpen}
              >
              {btn}
              </Button>
          </Box>
          <StyledAutocomplete
            // sx={{ width: 250,
            //   '& .MuiInputBase-input': {
            //     transition: theme.transitions.create('width'),
            //     width: '100%',
            //     [theme.breakpoints.up('sm')]: {
            //       width: '12ch',
            //       '&:focus': {
            //         width: '20ch',
            //       }
            //     }
            //   },
            //   '&.Mui-focused .MuiOutlinedInput-root': {
            //     backgroundColor: '#8368a9',
            //    },
            //    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            //     border: 1,
            //     borderColor: '#000000',
            //    },
            // }}
            options={data}
            autoHighlight
            getOptionLabel={(option) => option.user}
            renderOption={(props, option) => (
            <Box component="li" sx={{ mr: 2, flexShrink: 0, bgcolor: '#e8dff5' }} {...props}>
             {option.username}
            </Box>
            )}
            renderInput={(params) => (
            <TextField
             {...params}
             size="small"
             placeholder="Search User..."
             inputProps={{
             ...params.inputProps,
             autoComplete: 'new-password', // disable autocomplete and autofill
             }}
            />
            )}
            />
          <Box ml={10}>
            <Typography>Dark Mode</Typography>
            <Switch label={`Dark Mode`} onChange={toggleTheme} />
          </Box>    
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default Navbar;