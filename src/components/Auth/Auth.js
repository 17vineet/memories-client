import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, Typography, Container, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Input from './Input';
import Icon from './Icon';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth' ;

const Auth = () => {

	const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);

	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(formData, history)) ;
		}
		else {
			dispatch(signin(formData, history)) ;
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	};

	const handleShowPassword = () => setShowPassword((prev) => !prev);

	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		handleShowPassword(false);
	};

	const googleSuccess = async (res) => {

		const token = res?.credential;
		const result = jwt_decode(res?.credential);

		try {
			dispatch({ type: 'AUTH', payload: { token, result } });
			history.push('/');
		}
		catch (error) {
			console.log(error);
		}

	}

	const googleFailure = (error) => { console.log(error); }

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<>
									<Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
									<Input name='lastName' label='Last Name' handleChange={handleChange} half />
								</>
							)
						}
						<Input name='email' label='Email Address' handleChange={handleChange} type='email' />
						<Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
						{
							isSignup && (
								<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
							)
						}
						<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
							{isSignup ? 'Sign Up' : 'Sign In'}
						</Button>
						<GoogleOAuthProvider clientId='482249920895-b3jeqs668v5ddpej0vo2mr6k48kf94ue.apps.googleusercontent.com'>
							<GoogleLogin
								render={(renderProps) => (
									<Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
										Google Sign In
									</Button>
								)}
								onSuccess={googleSuccess}
								onFailure={googleFailure}
							/>
						</GoogleOAuthProvider>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Button onClick={switchMode}>
									{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth