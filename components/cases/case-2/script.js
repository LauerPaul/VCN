/**
*	@version 1.0 beta
*	@module @/components/cases/case-2
*	@desc <strong>Component Case 1</strong> - Контнейнер для отображения модулей профиля пользователя.
*	@see ~/components/cases/case-2
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'

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
		scrollWrapperId: 'case-2-scroll-wrapper',
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
		this.$log.debug('component \'@/components/cases/case-2\' - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions);
      	} else{ this.$log.warn('component \'@/components/cases/case-2\' - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'@/components/cases/case-2\' -> update scroll plugin');
			this.scroll.scroll.update();
		}, 1000);
	}
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {object} options - Options array
	* 		
	*/
	props: ['options'],

	// Set data
	data: function(){ return data },

	/**
	* This module requires the components:<br>
	*
	*/
	components: {
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Scroll plugin init - call 
	* <strong>scrollInit()</strong>
	* 
	* @event module:~/components/cases/case-2~COMPONENT <strong>Case-2</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/cases/case-2\' -> mounted');

		// Инициализируем плагин стилизации скролла
		this.scrollInit();
	},

	// Methods
	methods: methods
}
