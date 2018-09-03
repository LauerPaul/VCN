/**
*	@version 1.0 beta
*	@module @/components/users/users-gallery-mini-widget
*	@desc <strong>Component Users gallery mini widget</strong> - Виджет галлереи пользователей
*	@see ~/components/users/users-gallery-mini-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import usersList from '~/static/tmp/user/users_gallery_mini.js'
// -------------------------------------------------------------------------------------------

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {array} users - Список ползователей
	* 		@property {array} users.id - ID ползователя
	* 		@property {array} users.name - Имя ползователя
	* 		@property {array} users.img - Ссылка на фото ползователя
	* 		@property {array} users.suitable - Сопоставимость с текущим пользователем (в %)
	* 		@property {array} users.new - Лейбл "новый пользователь"
	* 
	* 	@property {string} text - Текст
	* 		@property {string} text.infoText - Информационный текст
	* 		@property {string} text.popoverTitle - заголовок всплывающего окна
	* 		@property {string} text.popoverText - текст всплывающего окна
	* 		@property {string} text.suitableText - информационный текст возле профиля, подставляется перед процентом совместимости
	*
	*	@property {array} swiperOption - Опции плагина [swiper]{@link module:Plugin_swiper}
	*
	*/
	users: null,
	text: {
		infoText: 'Based on the data and behavior, we picked up the girls that you like',
		popoverTitle: 'How it work',
		popoverText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		suitableText: 'Suitable for '
	},

	swiperOption: {
		slidesPerView: 5,
		spaceBetween: 12,
		slidesPerGroup: 1,
		lazy: true,
		preloadImages: false,
		loop: true,
		autoplay: {
			delay: 10000,
		},
		loopFillGroupWithBlank: true,
		navigation: {
			nextEl: '.next-btn-slider',
			prevEl: '.prev-btn-slider',
			disabledClass: 'disabled'
		},
	}
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Запрос списка пользователей (необходима переменная link)
	*
	*	@method getUsers
	**/
	getUsers() {
		if(this.link){
			// Log dev
			this.$log.info('component \'@/components/users/users-gallery-mini-widget\' -> method init');
			// Заменить на запрос к серверу
			this.users = usersList;
		}
		else {
			// Log dev
			this.$log.warn('component \'@/components/users/users-gallery-mini-widget\' -> link is empty');
		}
	}
}



/** Export component */
export default {
	name: 'Users_gallery_mini_widget',

	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {boolean} info_status - Статус
	* 	@property {boolean} link - Адрес для запроса списка пользователей
	*/
	props: [
		'info_status',
		'link'
	],

	// Set data
	data: function(){ return data },

	// Created
	created: () => {
		// Запускаем таймер, чтоб знать, за какое время будет смонтирован компонент
		console.time('Users-gallery-mini-widget')
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* 
	* @event module:@/components/users/users-gallery-mini-widget~COMPONENT <strong>Users-gallery-mini-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/users/users-gallery-mini-widget\' -> mounted');

		// Запрашиваем список пользователей
		this.getUsers();

		// Вывод времени компиляции страницы
		console.timeEnd('Users-gallery-mini-widget')
	},

	// Methods
	methods: methods
}
