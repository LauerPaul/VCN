/**
*	@version 1.0 beta
*	@module @/components/common/header-search-line
*	@desc <strong>Component for header</strong> - search line
*	@see ~/components/common/header-search-line
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	* 	@property {boolean} voice - voice btn status
	* 	@property {text} placeholder - Input search placeholder
	*
	*/
	voice: true,
	placeholder: 'Lorem ipsum dolor sit amet'
}

/** Export component */
export default {
	
	// Set data
	data: function(){ return data },
	
	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/components/common/header-search-line~COMPONENT <strong>Header-search-line</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/common/header-search-line\' -> mounted');
	},

	// Methods
	methods: {}
}