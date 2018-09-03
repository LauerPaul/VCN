/**
*	@version 1.0 beta
*	@module @/components/profile/profile-system-line-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile-system-line-widget</strong> - support, notify, volume control.
*	@see ~/components/profile/profile-system-line-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import support from '~/components/profile/profile-support-widget'
import notify from '~/components/profile/profile-notify-widget'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера
	*
	* @typedef {Object} Data
	* 	@property {object} text - Текст
	* 		@property {string} text.title - заголовок виджета
	* 		@property {string} text.volumeOnText - звук включен
	* 		@property {string} text.volumeOffText - звук выключен
	*
	* 	@property {boolean} volume - Статус звука оповищений на сайте
	* 	@property {boolean} supportWindow - Статус модуля support
	* 	@property {boolean} notifyWindow - Статус модуля notify
	*/
	text: {
		title: 'System info:',
		volumeOnText: 'Volume on',
		volumeOffText: 'Volume off',
	},
	volume: true,
	supportWindow: false,
	notifyWindow: false,
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Support window toggle
	*	@method supportToggle
	**/
	supportToggle() {
		// Log dev
		this.$log.debug('component \'@/components/profile/profile-system-line-widget\' -> method init');

		if(this.notifyWindow && !this.supportWindow) this.notifyWindow = false;
		this.supportWindow = !this.supportWindow;
		// Sroll update
		this.$emit('scrollUpdate'); 
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Notify window toggle
	*	@method notifyWindowToggle
	**/
	notifyWindowToggle (){
		// Log dev
		this.$log.debug('component \'@/components/profile/profile-system-line-widget\' -> method init');

		if(this.supportWindow && !this.notifyWindow) this.supportWindow = false;
		this.notifyWindow = !this.notifyWindow;
		// Sroll update
		this.$emit('scrollUpdate');
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	ON|OFF volume
	*	@method volumeToggle
	**/
	volumeToggle() {
		// Log dev
		this.$log.debug('component \'@/components/profile/profile-system-line-widget\' -> method init. Volume: ', this.volume);

		this.volume = !this.volume;
	}
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {array} support_status - Статус активности модуля Support
	* 	@property {array} notify_status - Статус активности модуля notify Notify
	* 	@property {array} volumeControl_status - Статус активности модуля Volume control
	*/
	props: [
		'support_status',
		'notify_status',
		'volumeControl_status'
	],

	// Set data
	data: function(){ return data },

	/**
	* This module requires the components:<br>
	* - [Profile-support-widget]{@link module:@/components/profile/profile-support-widget}
	* - [Profile-notify-widget]{@link module:@/components/profile/profile-notify-widget}
	*/
	components: {
		'support-widget': support,
		'notify-widget': notify,
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* 
	* @event module:@/components/profile/profile-system-line-widget~COMPONENT <strong>Profile-system-line-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-system-line-widget\' -> mounted');
	},

	// Methods
	methods: methods
}
