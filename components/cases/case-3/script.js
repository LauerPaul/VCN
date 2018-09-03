/**
*	@version 1.0 beta
*	@module @/components/cases/case-3
*	@desc <strong>Component Case 3</strong>(chat_container) - Контнейнер для отображения модулей чата.
*	@see ~/components/cases/case-3
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'
import { mapState, mapActions } from 'vuex'

import chatHeader from '@/components/chat/chat-header'
import chatMessages from '@/components/chat/chat-messages'
import chatFooter from '@/components/chat/chat-footer'

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
		scrollWrapperId: 'case-3-scroll-wrapper',
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
	// ------------------- Для демо версии (вункция назначения открытого окна чата)
	// Store chat dispatch
	...mapActions('Chat', [
	   	'currentActive'
	]),
	// ----------------------------------------------------------------------------

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Инициализация плагина стилизации сролла
	*	@method scrollInit
	**/
	scrollInit(){
		// Log method init
		this.$log.debug('component \'@/components/cases/case-3\' - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        if(this.scroll.scrollWrapper) this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions)
      	} else{ this.$log.warn('component \'@/components/cases/case-3\' - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'@/components/cases/case-3\' -> update scroll plugin');
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
	* > [Chat header]{@link module:@/components/chat/chat-header}
	* > [Chat messages]{@link module:@/components/chat/chat-messages}
	* > [Chat footer]{@link module:@/components/chat/chat-footer}
	*/
	components: {
		'chat-header': chatHeader,
		'chat-messages': chatMessages,
		'chat-footer': chatFooter
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Scroll plugin init - call 
	* <strong>scrollInit()</strong>
	* 
	* @event module:@/components/cases/case-3~COMPONENT <strong>Case-3 (chat container)</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/cases/case-3\' -> mounted');

		// ------------------- Для демо версии (функция назначения данных открытого окна чата)
		this.currentActive(123456)
		// ----------------------------------------------------------------------------

		// Инициализируем плагин стилизации скролла
		this.scrollInit();
	},

	// Methods
	methods: methods,
}
