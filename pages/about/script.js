import Auth from '~/components/auth'

const data = {

}

export default {
	middleware: ['auth'],
	options: {
		auth: false
	},
	data: function(){ return data },
	components: {
		'auth-case': Auth,
	}
}