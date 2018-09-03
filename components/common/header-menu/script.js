/**
*	@version 1.0 beta
*	@module @/components/common/header-menu
*	@desc <strong>Component for header</strong> - list menu
*	@see ~/components/common/header-menu
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {array} menu - Menu list
	* 		@property {string} menu.title - title link
	* 		@property {string} menu.icon - icon class (mdi preference)
	*
	*		@property {object|false} menu.sub_menu - sub menu
	*		@property {string} menu.sub_menu.title - title link
	*		@property {text|false} menu.sub_menu.link - link (if route_name - false)
	*		@property {text|false} menu.sub_menu.route_name - route name (priority over link)
	*
	*		@property {text|false} menu.link - link (if route_name - false)
	*		@property {text|false} menu.route_name - route name (priority over link)
	*		
	*		@property {boolean} menu.label_new - label new
	*		@property {number|string|false} menu.counter - counter label
	*/
	menu: [
		{
			title: 'Find single girls',
			icon: 'mdi mdi-account fs-18',
			counter: false,
			label_new: false,
			sub_menu: [
				{
					title: 'Lorem ipsum',
					link: '#',
					route_name: false
				},
				{
					title: 'Dolor sit amet',
					link: '#',
					route_name: false
				},
				{
					title: 'Consectetur Adipisicing elit',
					link: '#',
					route_name: false
				},
				{
					title: 'Sed do eiusmod',
					link: '#',
					route_name: false
				},
			]
		},
		{
			title: 'Girls online',
			icon: 'mdi mdi-account fs-18',
			link: '#',
			route_name: false,
			counter: 199,
			sub_menu: false,
			label_new: false
		},
		{
			title: 'Open Chat',
			icon: 'mdi mdi-comment-multiple fs-16',
			link: '#',
			route_name: false,
			counter: false,
			sub_menu: false,
			label_new: true,
		},
		{
			title: 'Girls online',
			icon: 'mdi mdi-email fs-17',
			link: '#',
			route_name: false,
			counter: false,
			sub_menu: false,
			label_new: false
		}
	] 
}

/** Export component */
export default {

	// Set data
	data: function(){ return data },

	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/components/common/header-menu~COMPONENT <strong>Header-menu</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/common/header-menu\' -> mounted');
	},

	// Methods
	methods: {}
}