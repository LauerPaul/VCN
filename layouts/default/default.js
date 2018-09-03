/**
*	@version 1.0 beta
*	@module @/layouts/default
*	@desc <strong>Layout Default</strong>
*	@see ~/layouts/default
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import searchLine from "~/components/common/header-search-line"
import headerMenu from "~/components/common/header-menu"
import { mapState } from 'vuex'

const data =  {
	/**
	* @typedef {Object} Data
	*	@property {boolean} searchInput_status - Search line visibility status
	*	@property {boolean} headerMenu_status - Header menu visibility status
	*/
	searchInput_status: true,
	headerMenu_status: true,
}

/** Export component */
export default  {
	
	// Set data
	data: function(){ return data },

	/**
	* This layout requires the components: 
	* [header-search-line]{@link module:@/components/common/header-search-line}, 
	* [header-menu]{@link module:@/components/common/header-menu}
	*/
	components: {
		'search-line' : searchLine,
		'header-menu' : headerMenu,
	},

	/**
	* @typedef {Object} Computed
	*	@property {boolean} logo - Логотип сайта (из Store Site)
	*	@property {boolean} logo_alt - alt логотипа сайта (из Store Site)
	*/
	computed: mapState('Site', [
    	'logo',
    	'logo_alt'
	]),

	// Created
	created: () => {
		// Запускаем таймер, чтоб знать, за какое время шаблон будет смонтирован
		console.time('Created_Default-layout')
	},

	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/layouts/default~LAYOUT <strong>Default</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('layout \'default\' -> mounted');

		// Вывод времени компиляции шаблона
		console.timeEnd('Created_Default-layout')
	},

	// Methods
	methods: {
		/**
		* Toggle aside menu
		* @method asideToggle
		* @local
		*/
		asideToggle(){
			this.$log.debug('layout \'default\' -> methods -> asideToggle()');
		}
	}
}