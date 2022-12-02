import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DialogBox({setVerified, setBackendData}) {
  const [open, setOpen] = React.useState(true);

  const [tmp_token, setTmpToken] = React.useState('');
  const [tmp_repo, setTmpRepo] = React.useState('');

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
    getD()
  };

  async function getD(){
    const requestOptions = {
        crossDomain:true,
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
      },
        body: JSON.stringify({ name:tmp_repo,api: tmp_token })
      };
      const response = await fetch('/api', requestOptions);
      const d = await response.json();
      console.log(d);
      setBackendData(d);
  }

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