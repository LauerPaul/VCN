/**
*	@version 1.0 beta
*	@module @/components/chat/chat-messages
*	@desc <strong>Component Chat messages</strong> - сообщения чата
*	@see ~/components/chat/chat-messages
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'
import { mapActions, mapGetters } from 'vuex'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {object} scroll - Параметры для плагина стилизации скролла
	*		@property {boolean} scroll.scrollStatus - <strong>Вкл/Выкл</strong> инициализации скролла
	* 		@property {string|null} scroll.scrollWrapperId - <strong>ID</strong> на котором будет инициализирован скролл
	* 		@property {string} scroll.scrollWrapper - Переменная для хранения объекта - контейнер скролла  (резерв - не заполнять)
	* 		@property {object|null} scroll.scroll - Переменная для храниения инициализированного скролла (резерв - не заполнять)
	* 		@property {string} scroll.scrollOptions - Опци для работы скролла ([Документация]{@link https://github.com/utatti/perfect-scrollbar})
	*/
	scroll: {
		scrollStatus: true,
		scrollWrapperId: null,
		scrollWrapper: '',
		scroll: null,
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
		this.$log.debug('component \'@/components/chat/chat-messages\' - Scroll plugin init');

		setTimeout(()=>{
			if(this.scroll.scrollStatus && this.scroll.scrollWrapperId){
	        	this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        	if(this.scroll.scrollWrapper) this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions)
	      	} else{ this.$log.warn('component \'@/components/chat/chat-messages\' - Scroll plugin is off in settings')}
		}, 1000)
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'@/components/chat/chat-messages\' -> update scroll plugin');
			this.scroll.scroll.update();
		}, 1000);
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Назначение переменной **scrollWrapperId** - установка ID контейнера сообщений
	* 
	* @func set_scrollWrapperID
	*/
	set_scrollWrapperID(){
		if(this.userId){
			// Log method init
			this.$log.debug('component \'@/components/chat/chat-messages\' - method init');
		
			this.scroll.scrollWrapperId = 'chatMessagessWrapper_' + this.userId;
		}
	}
}


/** Export component */
export default {
	// Set data
	data: function(){ return data },

	/**
	* @typedef {object} <strong>computed</strong>
	*	@property {int} userId - ID пользователя наследуется из [Store Chat - **currentUser**]{@link module:@/store/chat}
	*/
	computed: {
		...mapGetters('Chat', {
			userId: 'CURRENT_USER_ID',
			chatHistory: 'CURRENT_USER_CHAT'
		})
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* @event module:~/components/chat/chat-messages~COMPONENT <strong>Chat messages</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/chat/chat-messages\' -> mounted');
	},

	// Methods
	methods: methods,

	// Watch
	watch: {
		'userId': function(){
			this.set_scrollWrapperID();
		},
		'chatHistory': function(){
			if(!this.scroll.scroll) this.scrollInit();
			else this.scrollUpdate();
		}
	}
}
