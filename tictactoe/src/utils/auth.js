
import Relay from 'react-relay/classic'
import Auth0Lock from 'auth0-lock'
import authProps from './authCred'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'
//import clientId from './authCred'

const authDomain = authProps.authDomain
const clientId = authProps.clientId


class AuthService
{
	constructor()
	{
		this.lock = new Auth0Lock(clientId, authDomain, 
		{
			auth:
			{
				params: 
				{
					scope: 'openid email'
				},
			},
		})

		this.showLock =  this.showLock.bind(this)

		this.lock.on('authenticated', this.authProcess.bind(this))

	}

	authProcess = (authResult) =>
	{
		let 
		{
			email,
			exp

		} = authResult.idTokenPayload

		const idToken = authResult.idToken

		this.signinUser(
		{
			idToken,
			email,
			exp
		})
		.then(
			success => success,
			rejected => 
			{
				this.createUser(
				{

					idToken,
					email,
					exp
				})
				.then()
			}	
		)
	}

	showLock()
	{
		this.lock.show()
	}

	setToken = (authFields) =>
	{
		let
		{
			idToken,
			exp	
		} = authFields

		localStorage.setItem('idToken', idToken)
		localStorage.setItem('exp', exp*1000)

	}
	//Check token has not expired
	isCurrent = () =>
	{
		let expString = localStorage.getItem('exp')
		let now = new Date()
		if(!expString)
		{
			this.logOut()
			localStorage.removeItem('idToken')
			return false
		}

		let exp = new Date(parseInt(expString, 10)) //10 is Radix parameter for parseInt

		if (now > exp) 
		{
			this.logout()
			return false
		}
		else
		{
			return true
		}

	}
	// Return the idToken if isCurrent() returns true 
	// after checking the expiration time in local storage
	getToken()
	{
		let idToken = localStorage.getItem('idToken')
		if(this.isCurrent() && idToken)
		{
			return idToken
		}
		else
		{
			localStorage.removeItem('idToken')
			localStorage.removeItem('exp')
			return false
		}
	}
	// Log out of application
	logOut = ()=>
	{
		localStorage.removeItem('idToken')
		localStorage.removeItem('exp')
		window.location.reload()
	}

	createUser = (authFields) => 
	{
		return new Promise((resolve, reject) =>
		{
			Relay.Store.commitUpdate(
				new CreateUser
				({
					email: authFields.email,
					idToken: authFields.idToken
				}),

				{
					onSuccess: (response) => 
					{
						this.signinUser(authFields)
						resolve(response)
					},
					onFailure: (response) =>
					{
						console.log('CreateUser error ', response)
						reject(response)
					}
				}
			)
		})
	}

	signinUser = (authFields) => 
	{
		return new Promise((resolve, reject) =>
		{
			Relay.Store.commitUpdate(

				new SigninUser(
				{
					idToken: authFields.idToken
				}),

				{
					onSuccess: (response) => 
					{
						this.setToken(authFields)
						resolve(response)						
					},
					onFailure: (response) =>
					{
						console.log('CreateUser error ', response)
						reject(response)
					}
				}
			)
		})
	}

}
const auth = new AuthService()

export default auth