import React, { useState } from 'react';
import { Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
'& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
'& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

export const Landing = () => {
    const classes = useStyles();
    let history = useHistory();

    //hooks for user credentials
    const [redirectAfterNewAccount, setRedirectAfterNewAccount] = useState(false);
    
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    // called on submit button click
    const handleSubmit = e => {
        // prevent refresh
        e.preventDefault();
        console.log('click sumbit signup');
        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
                joinedDate: new Date(),
            }
        });
        setRedirectAfterNewAccount(true);
    };

    const handleCancel = () => {
        history.push('/')     
    }

    if (redirectAfterNewAccount) {
        return(
            <Redirect to="/" />            
        )
    }

    return (<div>
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="Email" variant="filled" type="email" required onChange={e => setEmail(e.target.value)} />
            <TextField label="First Name" variant="filled" required onChange={e => setFirstName(e.target.value)}/>
            <TextField label="Last Name" variant="filled" required onChange={e => setLastName(e.target.value)}/>
            <TextField label="Display Name" variant="filled" type="text" required onChange={e => setDisplayName(e.target.value)}/>
            <TextField label="Password" variant="filled" type="password" required onChange={e => setPassword(e.target.value)} />
            <div>
            <Button variant="contained" onClick = {handleCancel}>
                Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Signup
            </Button>
            </div>
        </form>
    </div>);
};