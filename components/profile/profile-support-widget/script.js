/**
*	@version 1.0 beta
*	@module @/components/profile/profile-support-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile-support-widget</strong> - support widget
*	@see ~/components/profile/profile-support-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import Scrollbar from 'perfect-scrollbar'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import chatHistory from '~/static/tmp/user/supportChat.js'
// -------------------------------------------------------------------------------------------


// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера
	*
	* @typedef {Object} Data
	* 	@property {array} chat - История чата
	* 		@property {int} chat.object.user_id - ID отправителя
	* 		@property {string} chat.object.text - Текст сообщения
	* 		@property {string} chat.object.date - Дата и время сообщения
	* 		@property {string} chat.object.read - Статус состояния (прочитано\не прочитано)
	*
	* 	@property {boolean} new_ticket - Новый тикет (для выполнения логики)
	* 	@property {boolean} show - Статус видимости окна
	* 	@property {boolean} cancel - Кнопка cancel доступна для нажатия (для выполнения логики)
	*
	* 	@property {string} subject - Тема запроса (Зарезервировано для выполнения логики - даынне формы)
	* 	@property {string} message - Сообщение (Зарезервировано для выполнения логики - даынне формы)
	* 	@property {string} chatMessage - Сообщение чата (Зарезервировано для выполнения логики - даынне формы)
	*
	* 	@property {object} text - Текст
	* 		@property {object} title - Текст
	* 		@property {string} send - Текст кнопки "отправить"
	* 		@property {string} cancel - Текст кнопки "отмена"
	* 		@property {string} new_ticket - Текст кнопки "новый тикет"
	* 		@property {string} message_placeholder - Placeholder сообщение
	* 		@property {string} subject_placeholder - Placeholder тема
	*
	* 	@property {object} scroll - Параметры для плагина стилизации скролла
	*		@property {boolean} scroll.scrollStatus - <strong>Вкл/Выкл</strong> инициализации скролла
	* 		@property {string} scroll.scrollWrapperId - <strong>ID</strong> на котором будет инициализирован скролл
	* 		@property {string} scroll.scrollWrapper - Переменная для хранения объекта - контейнер скролла  (резерв - не заполнять)
	* 		@property {string} scroll.scroll - Переменная для храниения инициализированного скролла (резерв - не заполнять)
	* 		@property {string} scroll.scrollOptions - Опци для работы скролла ([Документация]{@link https://github.com/utatti/perfect-scrollbar})
	*
	*/
	chat: chatHistory,
	new_ticket: true,
	show: false,
	cancel: false,

	subject: '',	
	message: '',
	chatMessage: '',

	text: {
		title: ' Support center',
		send: 'Send',
		cancel: 'Cancel',
		new_ticket: 'New ticket',
		message_placeholder: 'Message',
		subject_placeholder: 'Subject',
	},

	scroll: {
		scrollStatus: true,
		scrollWrapperId: 'content-wrapper',
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
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions);
      	} else{ this.$log.warn('component \'@/components/profile/profile-support-widget\' - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* 
	* @func scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'@/components/profile/profile-support-widget\' -> update scroll plugin');
			this.scroll.scroll.update();
		}, 100);
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Сброс введенных данных
	* 
	* @func onReset
	*/
	onReset (evt){
		evt.preventDefault();
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init - form reset');

		// New ticket form
		if(this.new_ticket){
			/* Reset our form values */
			this.subject = '';
			this.message = '';
			
			/* Trick to reset/clear native browser form validation state */
			this.show = false;
			this.$nextTick(() => { this.show = true });
		}
		// Chat support
		else {
			this.chatMessage = '';
		}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Переключение статуса disabled кнопки cancel
	* 
	* @func cancelStatus
	*/
    cancelStatus (){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init');

    	// New ticket form
    	if(this.new_ticket){
	    	if(this.subject == '' &&
	    		this.message == '' && this.cancel)
	    		 this.cancel = false
	    	else this.cancel = true
    	}
    	// Chat support
    	else {
	    	if(this.chatMessage == '' && this.cancel)
	    		 this.cancel = false
	    	else this.cancel = true
    	}
    },

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Отправка формы (создание нового тикета)
	* 
	* @func onSubmit
	*/
	onSubmit (evt) {
		evt.preventDefault();
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init - form submit');
	 	
		this.new_ticket = false;
	 	this.cancelStatus();
    },

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Отправка сообщения в чате support
	* 
	* @func onSubmitChat
	*/
	onSubmitChat (evt){
		evt.preventDefault();
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init - submit message');
	
		this.cancel = false;
		this.chatMessage = '';
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Запрет скролла страницы при скроллинге в областе окна чата support
	* 
	* @func scrollBarWheel
	*/
	scrollBarWheel (evt){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init');

		const sT = this.$el.querySelector('#content-wrapper').scrollTop;
		const sH = this.$el.querySelector('#content-wrapper').scrollHeight;
		const h = this.$el.querySelector('#content-wrapper').offsetHeight;

		if((sT === (sH - h)) || (sT === 0)) {
			evt.preventDefault();
			evt.stopPropagation();
		}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Создать новый тикет
	* 
	* @func CreateNewTicket
	*/
	CreateNewTicket (evt){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init - create new ticket');

		this.new_ticket = true;
		this.onReset(evt);
		this.cancelStatus(evt);
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Закрыть виджет
	* 
	* @func closeWindow
	*/
    closeWindow (evt){
		// Log method init
		this.$log.debug('component \'@/components/profile/profile-support-widget\' - method init - close widget');

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
	* @event module:@/components/profile/profile-support-widget~COMPONENT <strong>Profile-support-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-support-widget\' -> mounted');

		this.show = true;

		if(!this.new_ticket){
			// Инициализируем плагин стилизации скролла
			this.scrollInit();
		}
	},

	// Methods
	methods: methods,

	// Watch
	watch: {
		new_ticket(){
			if(!this.new_ticket) setTimeout(() => {this.scrollInit()}, 100);
		},
		subject: function (newVal, oldVal) {
			return this.cancelStatus(newVal);
		},
		message: function (newVal, oldVal) {
			return this.cancelStatus(newVal);
		},
		chatMessage: function (newVal, oldVal) {
			return this.cancelStatus(newVal);
		}
	}
}
