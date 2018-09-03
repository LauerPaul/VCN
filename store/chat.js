/**
*   @version 1.0 beta
*   @module @/store/chat
*   @desc <strong>Store Chat</strong> - хранилище данных чата
*   @see ~/store/chat
*
*   @author Pavel Uhrynovych (front-end developer of VC)
*   @copyright 2018©victoriyaclub.com
*/

import Vue from 'vue'
// ------------------- Для демо версии (история активного чата) ---------------
import ChatHistory from '@/static/tmp/chat/chat_history.js'
// ----------------------------------------------------------------------------

const Chat = {
	namespaced: true,
	state: {
		/**
		* @namespace ⭐Store-chat▸state
		*   @property {object|null} users - объект активных пользователей (с которыми открыто окно чата на данный момент)
		*   	@property {object} users.id - ключем объекта является ID профиля, с которым ведется чат
		*   		@property {int} users.id.id - ID профиля
		*   		@property {string} users.id.name - имя пользователя
		*   		@property {string} users.id.avatar - ссылка на аватар профиля
		*   		@property {string} users.id.status - текстовый статус профиля
		*   		@property {boolean} users.id.new - лейбл "новый пользователь"
		*   		@property {int} users.id.progress - прогресс заполненности профиля
		*   		@property {string} users.id.rating - рейтинг профиля
		*   		@property {boolean} users.id.webcam - статус наличия web-камеры профиля
		*   		@property {boolean} users.id.webcamActive - статус активности web-камеры профиля
		*   		@property {string} users.id.noteText - заметка к текущему профилю
		*
		*   @property {object} usersChat - объект таймеров активных текстовых чатов
		*   	@property {object} usersChat.id - ключем объекта является ID профиля, с которым ведется чат
		*   		@property {object} usersChat.id.time - время чата в секундах
		*
		*   @property {object} usersVideoChat - объект таймеров активных видео чатов
		*   	@property {object} usersVideoChat.id - время чата в секундах (ключем объекта является ID профиля, с которым ведется чат)
		*
		*   @property {object|null} currentUser - объект профиля окно чата которого открыто на данный момент
		*		@property {int} users.id - ID профиля
		*   	@property {string} users.name - имя пользователя
		*   	@property {string} users.avatar - ссылка на аватар профиля
		*   	@property {string} users.status - текстовый статус профиля
		*   	@property {boolean} users.new - лейбл "новый пользователь"
		*   	@property {int} users.progress - прогресс заполненности профиля
		*   	@property {string} users.rating - рейтинг профиля
		*   	@property {boolean} users.webcam - статус наличия web-камеры профиля
		*   	@property {boolean} users.webcamActive - статус активности web-камеры профиля
		*   	@property {string} users.noteText - заметка к текущему профилю
		*   	@property {int} users.videoChatTimer - время видео чата в секундах
		*   	@property {int} users.itemChat - время текстового чата в секундах
		*
		*  @property {object|null} chatHistory - объект историй чатов
		*  (_переменная наполняется/дополняется каждый раз, когда пользователь открывает новое окно чата с другим пользователем;
		*  история чатов дополняется в соответствующий объект, принимая новые сообщения из соккета, пользователю отображается контент из данной перемнной хранилища_)
		*		@property {array} chatHistory.id - ключем объекта является ID профиля, с которым был/идет чат
		*   		@property {int} chatHistory.id.id - ID кем было написано сообщение
		*   		@property {string} chatHistory.id.time - время, когда было написано сообщение
		*   		@property {string} chatHistory.id.mess - текст сообщения
		*   		@property {boolean} chatHistory.id.is_read - статус сообщения (прочитано/не прочитано)
		*/
		users: {
			123456: {
				id: 123456,			
				name: 'Annushka Rozhnova',
				avatar: require('@/assets/images/source/chat/avatar.jpg'),
				status: '😇 I’m happy',
				new: true,
				progress: 60,
				rating: '9/10',
				webcam: true,
				webcamActive: true,
				noteText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			}
		},
		usersChat: {},
		usersVideoChat: {
			123456: 740,
		},
		currentUser: null,
		chatHistory: {
			123456: ChatHistory
		}
	},
	getters: {
		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Getter)</strong>
		* Возвращает ID пользователя, с которым открыто окно чата (если переменная **currentUser** заполнена);
		* иначе - **false**.
		* 	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@method CURRENT_USER_ID
		**/
		CURRENT_USER_ID: state => {
			if(state.currentUser && state.currentUser.id){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> getter init - current user ID');
				return state.currentUser.id
			} else return false
		},

		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Getter)</strong>
		* Возвращает историю чата с пользователем, которым открыто окно чата (если переменные **currentUser** и **chatHistory** заполнены);
		* иначе - **false**.
		* 	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@method CURRENT_USER_CHAT
		**/
		CURRENT_USER_CHAT: state => {
			if(state.currentUser && state.chatHistory){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> getter init - current user chat');
				return state.chatHistory[state.currentUser.id]
			} else return false
		},

		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Getter)</strong>
		* Возвращает время таймера видео чата с пользователем, если чат активен;
		* иначе - **false**.
		* 	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@method TIMER_VIDEO_CHAT
		**/
		TIMER_VIDEO_CHAT: state => {
			if(state.currentUser && state.currentUser.videoChatTimer){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> getter init - current videochat timer');
				return state.usersVideoChat[state.currentUser.id]
			} else return false
		},

		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Getter)</strong>
		* Возвращает время таймера текстового чата с пользователем, если чат активен;
		* иначе - **false**.
		*	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@method TIMER_TEXT_CHAT
		**/
		TIMER_TEXT_CHAT: state => {
			if(state.currentUser && state.currentUser.textChatTimer){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> getter init - current chat timer');
				
				return state.usersChat[state.currentUser.id]
			} else return false
		}
	},
	mutations: {
		/**
		* 	@desc <strong style="color:red; font-size: 18px;">ⓘ (Mutations)</strong> 
		*	Устанавливаем значение переменной **currentUser** - объект профиля, диалог с которым нужно открыть
		*	
		*	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@param data {object} - объект профиля, диалог с которым нужно открыть
		*	@method setCurrent
		**/
		setCurrent(state, data){
			Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> mutation init - set state \'currentUser\'');
			
			state.currentUser = data
		},

		/**
		* 	@desc <strong style="color:red; font-size: 18px;">ⓘ (Mutations)</strong>
		* 	Очищаем переменную **currentUser**
		*
		*	@property {int} resetId - id профиля, диалог с которым открыт на данный момент
		*
		*	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@method resetCurrent
		**/
		resetCurrent(state){
			if(state.currentUser){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> mutation init - reset state \'currentUser\'');
				
				// Определяем id профиля
				var resetId = state.currentUser.id
				
				// Удаляем данные таймеров из объекта users у профиля c таким ID 
				delete state.users[resetId].videoChatTimer
				delete state.users[resetId].textChatTimer
				
				// Очищаем переменную state.currentUser
				state.currentUser = null
			}else {
				Vue.$log.warn('ⓘ Store Chat \'@/store/chat\' -> mutation init - reset state \'currentUser\' - state is not found or is empty!');
				return false
			}
		},

		/**
		* 	@desc <strong style="color:red; font-size: 18px;">ⓘ (Mutations)</strong> 
		*	Начинает просмотр камеры другого пользователя
		*	
		*	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@param id {object} - id пользователя, просмотр камеры которого нужно начать
		*	@method webcamStart
		**/
		webcamStart(state, id){
			Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> mutation init - user webCam start');
			
			state.users[id].webcamActive = true
		},

		/**
		* 	@desc <strong style="color:red; font-size: 18px;">ⓘ (Mutations)</strong> 
		*	Завершает просмотр камеры другого пользователя
		*	
		*	@param state {object} - объект state текущего хранилища (**store chat**)
		*	@param id {object} - id пользователя, просмотр камеры которого нужно завершить
		*	@method webcamStop
		**/
		webcamStop(state, id){
			Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> mutation init - user webCam stop');

			state.users[id].webcamActive = false
		}
	},
	actions: {
		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Actions)</strong> 
		* Устанавливаем значение переменной **currentUser** - объект профиля, диалог с которым нужно открыть
		* 1. Очищаем переменную currentUser, если она не была пустой
		* 2. Если такой ID был найден в объекте **state.users** (_если был ранее открыт чат с этим ID_)
		* 	2.1. Заполняем локальную переменную **data** (_готовим данные к отправке в мутацию_ **setCurrent**)
		*	2.2. Устанавливаем значения true в локальной переменной **data**, если чаты запущены
		*	2.3. Вызываем мутацию **setCurrent**, передаем локалькую переменную **data**
		* 4. Если чат с таким ID ранее не был добавлен в объект **state.users**
		*	
		* @param state {object} - объект state текущего хранилища (**store chat**)
		* @param commit {objext} - объект mutations текущего хранилища (**store chat**)
		* @param id {int} - id пользователя, с которым нужно открыть чат
		* @method currentActive
		**/
		currentActive({state, commit}, id){
			if(id){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> action init - set state \'currentUser\'');
				
				// 1. Очищаем переменную currentUser, если она не была пустой
				if(state.currentUser) commit('resetCurrent')

				// 2. Если такой ID был найден в объекте users (если был ранее открыт чат с этим ID)
				if(state.users[id] !== undefined){
					Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> action init - set state \'currentUser\' -> user (ID ' + id + ') is found in the state \'users\'');
					
					var data = {}
					// 2.1. Заполняем переменную data (готовим данные к отправке в мутацию setCurrent)
					data = state.users[id]
					data.videoChatTimer = false
					data.textChatTimer = false
					
					// 2.2. Устанавливаем значения true в переменной data, если чаты запущены
					if(state.usersVideoChat[id] !== undefined) data.videoChatTimer = true
					if(state.usersChat[id] !== undefined) data.textChatTimer = true

					// 2.3. Вызываем мутацию setCurrent, передаем переменную data
					commit('setCurrent', data)
				}
				// 4. Если чат с таким ID ранее не был добавлен в объект users
				else{
					Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> action init - set state \'currentUser\' -> user (ID ' + id + ') is not found in the state \'users\'');
					
					return false
				}
			}else return console.error('%c Store-> module Chat-> actions-> currentActive(id): ', 'background: #222; color: #bada55', ' Необходимо передать аргумент - id пользователя!')
		},

		/**
		* @desc <strong style="color:red; font-size: 18px;">ⓘ (Actions)</strong> 
		* Событие включения и отключения просмотра камеры собсеседника
		*	
		* @param state {object} - объект state текущего хранилища (**store chat**)
		* @param commit {objext} - объект mutations текущего хранилища (**store chat**)
		* @param id {int} - id пользователя, с которым нужно открыть чат
		* @method videoChatToggle
		**/
		videoChatToggle({state, commit}, id){
			if(id){
				Vue.$log.debug('ⓘ Store Chat \'@/store/chat\' -> action init - user webCam toggle');
				
				if(state.users[id].webcamActive) commit('webcamStop', id)
				else commit('webcamStart', id)
			}else return console.error('%c Store-> module Chat-> actions-> videoChatToggle(id): ', 'background: #222; color: #bada55', ' Необходимо передать аргумент - id пользователя!')
		}
	}
}

export default Chat