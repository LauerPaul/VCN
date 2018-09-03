/**
*	@version 1.0 beta
*	@module @/components/profile/profile-gallery-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile Gallery Widget</strong> - виджет фото пользователя
*	@see ~/components/profile/profile-gallery-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	* 	@property 
	*/
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Добавление фото в галлерею<br>
	*	Делегирует событие <strong>add_photo</strong> родителю<br>
	*	@example this.$emit('add_photo');
	*	@method addPhoto
	*/
	addPhoto(){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-gallery-widget\' -> Init fuction');
		this.$emit('add_photo');
	}
}

/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {boolean} photo - Массив фото пользователя
	* 		@property {string} photo.mini - Ссылка на миниатюру фото
	* 		@property {string} photo.big - Ссылка на оригинал фото
	* 		@property {string} photo.description - Описание к фото
	* 		@property {boolean} photo.payment - Платое фото

	* 	@property {boolean} add_new_status - Статус кнопки "Добавить фото"
	*/
	props: [
		'photo',
		'add_new_status'
	],

	// Set data
	data: function(){ return data },
	
	/**
	* @description ▶ Hook reporting <br>
	* ⓘ
	*
	* @event module:@/components/profile/profile-gallery-widget~COMPONENT <strong>Profile-gallery-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-gallery-widget\' -> mounted');
	},

	// Methods
	methods: methods
}