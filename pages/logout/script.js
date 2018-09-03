/**
*   @version 1.0 beta
*   @module @/pages/logout
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*   <strong>Logout Page</strong>
*   @see ~/pages/logout
*
*   @author Pavel Uhrynovych (front-end developer of VC)
*   @copyright 2018©victoriyaclub.com
*/

const data = {
}

/** Export component */
export default {
	// Set data
	data: function(){ return data },

	// Middleware auth
	middleware: ['auth'],

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* return **$auth.logout()** and redirect to [Index page]{@link module:PAGE_Index}
	*
	* @event module:@/pages/logout~PAGE <strong>Logout</strong> beforeCreate
	*/
	beforeCreate: function(){
		// Log mounted hook
		this.$log.info('page \'@/pages/logout\' -> logout user');

		this.$auth.logout();
		this.$router.push({ name: 'index' });
	}
}