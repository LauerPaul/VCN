/**
*	@version 1.0 beta
*	@module @/components/profile/profile-notify-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile-notify-widget</strong> - notify widget
*	@see ~/components/profile/profile-notify-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера
	*
	* @typedef {Object} Data
	* 	@property {object} text - Текст
	* 		@property {string} text.title - заголовок виджета
	*
	* 	@property {boolean} show - Статус видимости окна
	* 	@property {object} scroll - Параметры для плагина стилизации скролла
	*		@property {boolean} scroll.scrollStatus - <strong>Вкл/Выкл</strong> инициализации скролла
	* 		@property {string} scroll.scrollWrapperId - <strong>ID</strong> на котором будет инициализирован скролл
	* 		@property {string} scroll.scrollWrapper - Переменная для хранения объекта - контейнер скролла  (резерв - не заполнять)
	* 		@property {string} scroll.scroll - Переменная для храниения инициализированного скролла (резерв - не заполнять)
	* 		@property {string} scroll.scrollOptions - Опци для работы скролла ([Документация]{@link https://github.com/utatti/perfect-scrollbar})
	*
	*/
	show: true,
	text: {
		title: 'System notifications'
	},
	scroll: {
		scrollStatus: true,
		scrollWrapperId: 'content-wrapper-notify',
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
		this.$log.debug('component \'@/components/profile/profile-notify-widget\' - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions);
      	} else{ this.$log.warn('component \'@/components/profile/profile-notify-widget\' - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'@/components/profile/profile-notify-widget\' -> update scroll plugin');
			this.scroll.scroll.update();
		}, 100);
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Закрыть виджет
	* 
	* @func closeWindow
	*/
    closeWindow (evt){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-notify-widget\' - method init - close widget');

    	this.show = !this.show;
    	this.$emit('close')
    },
}



/** Export component */
export default {
	// Set data
	data: function(){ return data },

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Scroll plugin init - call 
	* <strong>scrollInit()</strong> (if new_ticket = true)
	* 
	* @event module:@/components/profile/profile-notify-widget~COMPONENT <strong>Profile-notify-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-notify-widget\' -> mounted');
		this.show = true;

		if(!this.new_ticket){
			// Инициализируем плагин стилизации скролла
			this.scrollInit();
		}
	},

	// Methods
	methods: methods
}
