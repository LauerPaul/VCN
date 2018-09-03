/**
*	@version 1.0 beta
*	@module @/components/cases/case-1
*	@desc <strong>Component Case 1</strong> - Контнейнер для отображения модулей личной ифнормации.
*	@see ~/components/cases/case-1
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'

import Auth from '~/components/auth'
import ProfileMin from '~/components/profile/profile-mini'
import BalanceWidget from '~/components/profile/profile-balance-widget'
import RatingWidget from '~/components/profile/profile-rating-widget'
import UsersGalleryWidget from '~/components/users/users-gallery-mini-widget'
import SystemLineWidget from '~/components/profile/profile-system-line-widget'
import banner from '~/components/banners/banner-mini-widget'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {object} scroll - Параметры для плагина стилизации скролла
	*		@property {boolean} scroll.scrollStatus - <strong>Вкл/Выкл</strong> инициализации скролла
	* 		@property {string} scroll.scrollWrapperId - <strong>ID</strong> на котором будет инициализирован скролл
	* 		@property {string} scroll.scrollWrapper - Переменная для хранения объекта - контейнер скролла  (резерв - не заполнять)
	* 		@property {string} scroll.scroll - Переменная для храниения инициализированного скролла (резерв - не заполнять)
	* 		@property {string} scroll.scrollOptions - Опци для работы скролла ([Документация]{@link https://github.com/utatti/perfect-scrollbar})
	*/
	scroll: {
		scrollStatus: true,
		scrollWrapperId: 'first-container-scroll-wrapper',
		scrollWrapper: '',
		scroll: '',
		scrollOptions: {
			wheelPropagation: true,
			suppressScrollX: true
		}
    },
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Инициализация плагина стилизации сролла
	*	@method scrollInit
	**/
	scrollInit(){
		// Log method init
		this.$log.debug('component \'~/components/cases/case-1 (user info)\' - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions);
      	} else{ this.$log.warn('component \'~/components/cases/case-1 (user info)\' - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'~/components/cases/case-1 (user info)\' -> update scroll plugin');
			this.scroll.scroll.update();
		}, 1000);
	}
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {object} options - Options array
	* 		@property {boolean} options.profile_widget_status - [Profile]{@link module:@/components/profile/profile-mini} widget visibility status
	* 		@property {boolean} options.gallery_widget_status - [Gallery]{@link module:@/components/users/users-gallery-mini-widget} widget visibility status
	* 		@property {boolean} options.gallery_widget_addNew - [Gallery]{@link module:@/components/users/users-gallery-mini-widget} Add new button visibility status
	* 		
	* 		@property {boolean} options.balance_widget_status - [Balance]{@link module:profile-balance-widget} widget status
	*		@property {boolean} options.buyCredits_dropdown_status - [Balance]{@link module:profile-balance-widget} widget status
	* 		
	*		@property {boolean} options.rating_widget_status - [Rating]{@link module:@/components/profile/profile-rating-widget} widget status
	*		@property {boolean} options.rating_widget_progress - [Rating]{@link module:@/components/profile/profile-rating-widget} progress status
	*		@property {boolean} options.rating_widget_infoCase - [Rating]{@link module:@/components/profile/profile-rating-widget} info case status
	*		@property {boolean} options.rating_widget_question - [Rating]{@link module:@/components/profile/profile-rating-widget} question status
	* 		
	*		@property {boolean} options.users_gallery_mini_status - [Users gallery mini]{@link module:/components/users/users-gallery-mini-widget} widget status
	*		@property {boolean} options.users_gallery_mini_infoCase - [Users gallery mini]{@link module:/components/users/users-gallery-mini-widget} info case status
	* 		
	*		@property {boolean} options.system_line_widget_status - [System line]{@link module:@/components/profile/profile-system-line-widget} widget status
	*		@property {boolean} options.system_line_widget_support_status - [System line]{@link module:@/components/profile/profile-system-line-widget} support status
	*		@property {boolean} options.system_line_widget_notify_status - [System line]{@link module:@/components/profile/profile-system-line-widget} notify status
	*		@property {boolean} options.system_line_widget_volumeControl_status - [System line]{@link module:@/components/profile/profile-system-line-widget} volume control status
	* 		
	*		@property {boolean} options.banner_mini_widget_status - [Banner mini widget]{@link module:@/components/banners/banner-mini-widget} status
	*		@property {boolean} options.banner_mini_widget_data - [Banner mini widget]{@link module:@/components/banners/banner-mini-widget} options
	*			@property {string} options.banner_mini_widget_data.image - Image link
	* 			@property {string} options.banner_mini_widget_data.imageAlt - Image attr `alt` 
	* 			@property {string} options.banner_mini_widget_data.text - Text on the banner
	*
	* 			@property {string} options.banner_mini_widget_data.routeName - Route name (priority)
	* 			@property {false|string} options.banner_mini_widget_data.link - Route link (if RouteName is false)
	* 			@property {boolean} options.banner_mini_widget_data.targetBlank - Open new window on click
	*
	* 			@property {false|string} options.banner_mini_widget_data.specialClassImage - add class to Image
	* 			@property {false|string} options.banner_mini_widget_data.specialClassText - add class to Text
	* 		
	*/
	props: ['options'],

	// Set data
	data: function(){ return data },

	/**
	* This module requires the components:<br>
	*
	* - [Auth]{@link module:@/components/auth} (if the user is not authorized)<br>
	* - [Profile-mini]{@link module:@/components/profile/profile-mini} (only authorized user)<br>
	* - [Balance-widget]{@link module:@/components/profile/profile-balance-widget} (only authorized user)<br>
	* - [Rating-widget]{@link module:@/components/profile/profile-rating-widget} (only authorized user)<br>
	* - [Users-gallery-mini-widget]{@link module:@/components/users/users-gallery-mini-widget} <br>
	* - [Profile-system-line-widget]{@link module:@/components/profile/profile-system-line-widget} (only authorized user)<br>
	* - [Banner-mini-widget]{@link module:@/components/banners/banner-mini-widget} (only authorized user)<br>
	*/
	components: {
		'auth-widget' : Auth,
		'profile-mini-widget' : ProfileMin,
		'balance-widget' : BalanceWidget,
		'rating-widget' : RatingWidget,
		'users-gallery-widget' : UsersGalleryWidget,
		'notify-support-volume-line' : SystemLineWidget,
		'banner-mini-widget' : banner
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Scroll plugin init - call 
	* <strong>scrollInit()</strong>
	* 
	* @event module:@/components/cases/case-1~COMPONENT <strong>Case-1</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/cases/case-1 (user info)\' -> mounted');

		// Инициализируем плагин стилизации скролла
		this.scrollInit();
	},

	// Methods
	methods: methods
}
