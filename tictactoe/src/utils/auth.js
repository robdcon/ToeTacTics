import Auth0Lock from 'auth0-lock'
import authProps from './authCred'
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
		console.log("Auth Result:", authResult)
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

}
const auth = new AuthService()

export default auth