/**
*	@version 1.0 beta
*	@module @/components/auth
*	@desc <strong>Component Auth</strong> - модуль авторизации
*	@see ~/components/auth
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} username - reserved
	* 	@property {string} password - reserved
	* 	@property {string|null} error - reserved
	*/
	username: '',
	password: '123',
	error: null
}

/** Export component */
export default {

	// Set data
	data: function(){ return data },

	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/components/auth~COMPONENT <strong>Auth</strong> computed
	*/
	computed: {
		// strategies: () => ([
		//  { key: 'auth0', name: 'Auth0', color: '#ec5425' },
		//  { key: 'google', name: 'Google', color: '#4284f4' },
		//  { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
		//  { key: 'github', name: 'Github', color: '#202326' }
		// ]),
		redirect() {
		  return (
		    this.$route.query.redirect &&
		    decodeURIComponent(this.$route.query.redirect)
		  )
		},
		isCallback() {
		  return Boolean(this.$route.query.callback)
		}
	},

	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/components/auth~COMPONENT <strong>Auth</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/auth\' -> mounted');
	},

	// Methods
	methods: {
		/**
		* Auth - request
		* @method login
		* @async
		*/
		async login() {
	      this.error = null

	      return this.$auth
	        .loginWith('local', {
	          data: {
	            username: this.username,
	            password: this.password
	          }
	        })
	        .catch(e => {
	          this.error = e + ''
	        })
	    }
	}
}