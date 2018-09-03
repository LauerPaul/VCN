/**
*	@version 1.0 beta
*	@module @/components/chat/chat-header
*	@desc <strong>Component Chat header</strong> - верхняя секция чата (информация о пользователе, кнопки событий чата).
*	@see ~/components/chat/chat-header
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import addToList from '~/components/users/users-addToList-widget'
import { mapActions, mapState, mapGetters } from 'vuex'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {string} videoId - зарезервированная переменная для генерации id блока с видео
	*
	* 	@property {object} title - Тайтлы при наведении
	* 		@property {string} title.notification - Notification
	* 		@property {string} title.message -Send message
	* 		@property {string} title.wink - Wink
	* 		@property {string} title.gift - Send gift
	* 		@property {string} title.contacts - Contacts
	* 		@property {string} title.like - Like
	* 		@property {string} title.questions - Questions
	*
	* 	@property {object} text - Тайтлы при наведении
	* 		@property {string} text.compatibility - Compatibility
	* 		@property {string} text.rating - Rating
	* 		@property {string} text.startVideo - Start video
	* 		@property {string} text.notes - Notes
	* 		@property {string} text.video_chat - таймер видеочата (зарезервированная переменная)
	* 		@property {string} text.text_chat - таймер текстового чата (зарезервированная переменная)
	*/
	videoId: 'user-video_',
	title: {
		notification: 'Notification',
		message: 'Send message',
		wink: 'Wink',
		gift: 'Send gift',
		contacts: 'Contacts',
		like: 'Like',
		questions: 'Questions',
	},
	text: {
		compatibility: 'Compatibility',
		rating: 'Rating',
		startVideo: 'Start video',
		notes: 'Notes',
		video_chat: '0m 0s',
		text_chat: '0m 0s'
	},
}

// METHODS
const methods = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* Ссылка на _actions_ [Store Chat]{@link module:@/store/chat} -> **videoChatToggle(user.id)**
	* @method videoChatToggle
	**/
	...mapActions('Chat', [
	   	'videoChatToggle'
	]),
	

	/**
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Назначение переменной **videoId** = videoId + user.id
	* @method setId
	**/
	setId(){
		if(this.user) {
			this.$log.debug('component \'@/components/chat/chat-header\' -> method init');
			this.videoId = this.videoId + this.user.id
		}
	},

	/**
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Преобразование таймеров из секунд в строку вида (Xm Xs)
	*	
	* @param type {string} - тип обновления ('text' - таймер текстового чата или 'video' - таймер видео чата)
	* @param sec {int} - время в секундах	
	* @method setTimer
	**/
	setTimer(type, sec){
		if(type && sec){
			var time = Math.floor(sec / 60) + 'm ' + sec % 60 + 's';

			if(type == 'text') this.text_timer.text_chat = time
			else if(type == 'video') this.text.video_chat = time
		} else return false
	}
}



/** Export component */
export default {
	// Set data
	data: function(){ return data },

	/**
	* This module requires the components:<br>
	* > [addToList-widget]{@link module:@/components/users/users-addToList-widget}
	*/
	components: {
		'addToList-widget': addToList
	},

	/**
	* @typedef {object} <strong>computed</strong>
	*	@property {object} user - объект пользователя наследуется из [Store Chat - **currentUser**]{@link module:@/store/chat}
	*	@property {int|false} timer_videoChat - время видео чата (в секундах) из [Store Chat - getters **TIMER_VIDEO_CHAT**]{@link module:@/store/chat}
	*	@property {int|false} timer_textChat - время текстового чата (в секундах) из [Store Chat - getters **TIMER_TEXT_CHAT**]{@link module:@/store/chat}
	*/
	computed: {
		...mapState('Chat', {
			user: 'currentUser',
		}),
		...mapGetters('Chat', {
			timer_videoChat: 'TIMER_VIDEO_CHAT',
			timer_textChat: 'TIMER_TEXT_CHAT',
		})
	},

	/**
	* @desc ▶ Hook reporting <br>
	* > Вызов метода setId()
	* 
	* @event module:~/components/chat/chat-header~COMPONENT <strong>Chat header (user info)</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/chat/chat-header\' -> mounted');
		
		this.setId()
	},

	// Methods
	methods: methods,

	// Watch
	watch: {
		'timer_videoChat': function(){
			if(this.timer_videoChat) this.setTimer('video', this.timer_videoChat)
		},
		'timer_textChat': function(){
			if(this.timer_textChat) this.setTimer('text', this.timer_textChat)
		},
		'user': function(){
			this.setId()
		}
	}
}
