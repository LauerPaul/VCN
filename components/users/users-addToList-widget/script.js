/**
*	@version 1.0 beta
*	@module @/components/users/users-addToList-widget
*	@desc <strong>Component Users Add to list</strong> - виджет выпадающего списка списков пользователей. Используется для добавления выбранного пользователя в список текущего (текущей учетной записи).
*	@see ~/components/users/users-addToList-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @typedef {Object} Data
	* 	@property {object} text - Text
	* 		@property {object} text.addList - Add to list
	* 		@property {object} text.addNewList - Add new list
	*/
	text: {
		addList: 'Add to list',
		addNewList: 'Add new list',
	}
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Метод назначения пользователя к списку пользователей текущей уч. записи
	*
	*	@param index {int} - индекс выбранного списка в массиве **$auth.user.usersLists**
	*	@property data {object} - данные для запроса AJAX
	*		@property data.category_id {int} - ID выбранного списка (в который нужно добавить выбранного пользователя)
	*		@property data.userId {int} - ID выбранного данным аккаунтом пользователя
	*		@property data.current_user_id {int} - ID текущего аккаунта
	*
	*	@method toList
	**/
	toList(index){
		this.$log.debug('component \'@/components/users/users-addToList-widget\' -> method init');

		var categoty = this.$auth.user.usersLists[index]
		if(categoty !== undefined){
			var data = {
				category_id: categoty.id,
				userId: this.user_id,
				current_user_id: this.$auth.user.id
			}

			// добавить Ajax запрос на добавление id в список

		}else {
			this.$log.fatal('component \'@/components/users/users-addToList-widget\' -> method init error - element is not found');
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Метод добавления нового списка пользователей данному аккаунту
	*	@method newList
	**/
	newList(){
		this.$log.debug('component \'@/components/users/users-addToList-widget\' -> method init');
	}
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {int} user_id - ID пользователя, который будет добавлен в список текущего пользователя
	*/
	props: [
		'user_id',
	],

	// Set data
	data: function(){ return data },
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:~/components/users/users-addToList-widget~COMPONENT <strong>Component Users Add to list</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/users/users-addToList-widget\' -> mounted');
	},

	// Methods
	methods: methods
}
