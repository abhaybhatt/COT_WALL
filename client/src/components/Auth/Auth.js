import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import useStyles from './styles.js'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input.js'
import Icon from './icons';
import { useHistory} from 'react-router-dom';
import { signup,signin} from '../../actions/auth.js';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState(initialState);
    const classes = useStyles();
    const [isSignup, setIsSignup] = React.useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    


    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }
    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        if(showPassword){
            handleShowPassword();
        }
        
    };


    const googleSuccess = async(res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({ type: 'AUTH', data: {result,token}});
            history.push('/');
        }catch(err){
            console.log(err);
        }
        
    };


    const googleError = (error) =>{
        console.log(error);
    };


    const handleShowPassword = () => setShowPassword(!showPassword);

    return(
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                            { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                            )}
                                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>           
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    { isSignup ? 'Sign Up' : 'Sign In' }
                                </Button>
                                

                                <GoogleLogin
                                    clientId="855994254878-m50ovilg1c8dqujhgvgeeebt6orakr4r.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                        Google Sign In
                                    </Button>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleError}
                                    cookiePolicy="single_host_origin"
                                />


                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                     </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;