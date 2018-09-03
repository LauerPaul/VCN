/**
*	@version 1.0 beta
*	@module @/components/profile/profile-mini
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile mini</strong> - Виджет профиля авторизованного пользователя.
*	@see ~/components/profile/profile-mini
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import { focus } from 'vue-focus'
import Gallery from '~/components/profile/profile-gallery-widget'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import photo_array from '~/static/tmp/user/photo'
// -------------------------------------------------------------------------------------------


// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {boolean} editName - Режим редактирования имени
	* 	@property {string} editNameVal - Модель. Временное хранилище введенного имени в режиме редактирования
	*	
	* 	@property {object} text - Text on the page
	*	 	@property {object} text.enable_webcam - Enable webcam
	*	 	@property {object} text.disable_webcam - Disable webcam
	*
	* 	@property {array} config_menu - config menu list
	* 		@property {string} config_menu.object.title - title link
	* 		@property {string|false} config_menu.object.link - link (if route_name - false)
	* 		@property {string|false} config_menu.object.route_name - route name (priority over link)
	* 		@property {string} config_menu.object.icon - icon class (css)
	*	
	* 	@property {object} user - user data
	*	 	@property {string|null} user.name - current user name (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {string|null} user.avatar - current user avatar link (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {string|null} user.avatarAlt - current user avatar attr ALT (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {string|null} user.status - current user status text (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {array|false} user.photos - current user photos array (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {boolean} user.webcam - current user WebCam availability status (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {boolean} user.webcamActive - current user WebCam activity status (reserved - will be set in <strong>mounted</strong> hook)
	*	 	@property {int|string|false} user.webcamBrowsing - current user WebCam browsing count (reserved - will be set in <strong>mounted</strong> hook)
	* 
	*/

	editName: false,
	editNameVal: '',
	text: {
		enable_webcam: 'Enable webcam',
		disable_webcam: 'Disable webcam'
	},

	user: {
		name: null,
		avatar: null,
		avatarAlt: null,
		status: null,
		photos: false,
		webcam: false,
		webcamActive: false,
		webcamBrowsing: false
	},

	config_menu: [
		{
			title: 'My settings',
			link: '#',
			route_name: false,
			icon: 'mdi mdi-settings'
		},
		{
			title: 'Edit Profile',
			link: '#',
			route_name: false,
			icon: 'mdi mdi-account'
		},
		{
			title: 'My billing (finance)',
			link: '#',
			route_name: false,
			icon: 'mdi mdi-database'
		},
		{
			title: 'Logout',
			link: '/logout',
			route_name: false,
			icon: 'mdi mdi-logout'
		}
	]
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Назначает локальные переменные объекта user из Store -> $auth.user
	*	@method setUserData
	**/
	setUserData() {
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-mini\' -> Set object user');

		this.user.name = this.$auth.user.name
		this.user.avatarAlt = "Photo" + this.$auth.user.name
		this.user.avatar = this.$auth.user.avatar
		this.user.status = this.$auth.user.status_text
		
		this.user.webcam = this.$auth.user.webcam
		this.user.webcamActive = this.$auth.user.webcamActive
		this.user.webcamBrowsing = this.$auth.user.webcamBrowsing
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	ON|OFF трансляции своей камеры
	*	@method webcamToggle
	**/
	webcamToggle() {
		if(process.browser) {
			// Log method init
			if(this.$auth.user.webcamActive) this.$log.debug('component \'@/components/profile/profile-mini\' -> Toggle the broadcast modes of your camera - camera OFF');
			else this.$log.debug('component \'@/components/profile/profile-mini\' -> Toggle the broadcast modes of your camera - camera ON');
			this.$auth.user.webcamActive = !this.$auth.user.webcamActive
			// delete
			this.webcamBrowsing = 2
			// delete
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Функция активации режима редактирования имени
	*	@method editNameFocus
	**/
	editNameFocus() {
		if(process.browser) {
			// If edit name
			if(this.editName){
				// Developer Debug
				this.$log.debug('component \'@/components/profile/profile-mini\' -> Toggle edit name status to `false`');
			}
			// If edit name false
			else{
				// Developer Debug
				this.$log.debug('component \'@/components/profile/profile-mini\' -> Toggle edit name status to `true`');
			}

			this.editName = !this.editName;
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Функция назначения горячих клавиш:<br>
	*	<strong>Escape</strong> - Отмена редактирования имени<br>
	*	<strong>Enter</strong>- Сохранение редактирования имени
	*	@method onKeyUp
	**/
	onKeyUp() {
		// Отмена редактирования имени
		if(event.key === 'Escape'){
			// Developer Debug
			this.$log.debug('component \'@/components/profile/profile-mini\' -> Cancel name editing - \'Escape\' Key pressed');
			
			this.editName = false;
		}
		// Сохранение редактирования имени
		else if(event.key === 'Enter'){
			// Developer Debug
			this.$log.debug('component \'@/components/profile/profile-mini\' -> Save name editing - \'Enter\' Key pressed');
			
			this.name = document.getElementById('pmi-edit-name').value
			this.editName = false;
		}
    },

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Запрашивает массив фото пользователя для передачи в виджет
	*	[Profile Gallery]{@link module:@/components/profile/profile-gallery-widget}
	*	(Если переменная <strong>gallery_status</strong> is <strong>true</strong>)
	*	@method getUserPhoto
	**/
	getUserPhoto() {
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-mini\' -> Init method');

		this.user.photos = photo_array;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Функция добавления нового фото в галлерею - вызывается из 
	*	[Profile Gallery]{@link module:@/components/profile/profile-gallery-widget}
	*	@method addPhoto
	**/
	addPhoto() {
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-mini\' -> Init fuction');
	}
}

export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {boolean} gallery_status - Статус модуля фото галлереи пользователя ([Gallery]{@link module:@/components/profile/profile-gallery-widget})
	* 	@property {boolean} gallery_addNew - Стутс видимости кнопки "Добавить фото" ([Gallery]{@link module:@/components/profile/profile-gallery-widget})
	*/
	props: [
		'gallery_status',
		'gallery_addNew'
	],

	// Directives
	directives: { focus: focus },

	/**
	* This module requires the components:<br>
	*
	* - [Gallery widget]{@link module:@/components/profile/profile-gallery-widget} - user photo gallery widget<br>
	*/
	components: {
		'gallery-wigget' : Gallery,
	},

	// Set Data
	asyncData({ store, route, userAgent }){
		return {userAgent}
	},
	data: function(){ return data },

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Set user data - call 
	* <strong>setUserData()</strong><br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Get user photo gallery array - call 
	* <strong>getUserPhoto()</strong><br>
	* 
	* @event module:@/components/profile/profile-mini~COMPONENT <strong>Profile-mini</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-mini\' -> mounted');
		
		// Устанавливаем значения в объект user
		this.setUserData();

		// Запрашиваем массив фото для виджета фото галлереи
		if(this.gallery_status) this.getUserPhoto();
		else this.$log.warn('component \'@/components/profile/profile-mini\' -> mounted -> Photo Gallery widget is disabled');
	},

	// Watch
	watch: {
		'$auth.user': {
			handler: function (val, oldVal) {
				// Developer Debug
				this.$log.debug('component \'@/components/profile/profile-mini\' -> Watch update - \'user\'');
				this.setUserData();
			},
      		deep: true
		},
		
	},
	// Set Methods
	methods: methods
}