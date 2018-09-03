/**
*	@version 1.0 beta
*	@module @/components/chat/chat-footer
*	@desc <strong>Component Chat footer</strong> - форма отправки сообщений в чат
*	@see ~/components/chat/chat-footer
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import { mapActions } from 'vuex'

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {string} message - зарезервированная переменная - сообщение, которое нужно будет отправить
	* 	@property {string} placeholder - placeholder textarea
	*
	* 	@property {object} text - text
	* 		@property {string} text.attach_file - `Attach image` or `Attach file`
	* 		@property {string} text.send - `Send`
	* 		@property {string} text.turn_on - `Turn on`
	* 		@property {string} text.turn_off - `Turn off`
	* 		@property {string} text.infoText - `Turn on` - information text
	*/
	message: '',
	placeholder: '...',
	text: {
		attach_file: 'Attach image',
		send: 'Send',
		turn_on: 'Turn on',
		turn_off: 'Turn off',
		infoText: 'Turn on your webcam.<br><strong>It is free!</strong>'
	}
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	ON|OFF трансляции своей камеры
	*	@method webcamToggle
	**/
	webcamToggle() {
		if(process.browser) {
			// Log method init
			if(this.$auth.user.webcamActive) this.$log.debug('component \'@/components/chat/chat-footer\' -> Toggle the broadcast modes of your camera - camera OFF');
			else this.$log.debug('component \'@/components/chat/chat-footer\' -> Toggle the broadcast modes of your camera - camera ON');
			this.$auth.user.webcamActive = !this.$auth.user.webcamActive
			// delete
			this.webcamBrowsing = 2
			// delete
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Метод добавления изображения
	*	@method attachImage
	**/
	attachImage() {
		// Dev log
		this.$log.debug('component \'@/components/chat/chat-footer\' -> method init');
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Метод отправки сообщения
	*	@method sendMessage
	**/
	sendMessage(e) {
		// Dev log
		this.$log.debug('component \'@/components/chat/chat-footer\' -> method init');

	},
}


/** Export component */
export default {
	// Set data
	data: function(){ return data },

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* @event module:~/components/chat/chat-footer~COMPONENT <strong>Chat footer</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/chat/chat-footer\' -> mounted');
	},

	// Methods
	methods: methods,
}
