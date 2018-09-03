/**
*	@version 1.0 beta
*	@module @/components/profile/profile-rating-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile balance widget</strong> - Рейтинг пользователя.
*	@see ~/components/profile/profile-rating-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import questionArray from '~/static/tmp/user/question'
// -------------------------------------------------------------------------------------------


// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера
	*
	* @typedef {Object} Data
	* 	@property {array} question - Вопросы
	* 		@property {int} question.id - ID вопроса
	* 		@property {string} question.text - Текст вопроса
	* 		@property {array} question.author - Авторы вопроса
	* 			@property {int} question.author.object.id - ID пользователя
	* 			@property {string} question.author.object.name - Имя пользователя
	* 			@property {string} question.author.object.img - Фото пользователя
	* 		@property {array} question.answerVariables - Варианты ответов
	* 			@property {int} question.answerVariables.object.id - ID варианта ответа
	* 			@property {string} question.answerVariables.object.text - Текст варианта ответа
	* 			@property {string} question.answerVariables.object.selected - Переменная необходима для работы приложения (статус выбранного варианта)
	* 		@property {int} question.plusProcentQuestion - На сколько увеличится прогресс заполненности профиля после ответа
	* 		@property {int} question.plusBalanceQuestion - На сколько увеличится баланс пользователя после ответа
	* 		@property {boolean} question.muliptle - Возможно выбрать несколько вариантов
	* 		@property {int} question.max_variants - Максимальное кол-во вариантов, которое можно выбрать (если muliptle = true)
	*
	* 	@property {int} stepsCount - Общее кол-во шагов заполнения профиля
	* 	@property {int} stepCurrent - Текущий порядковый номер вопроса
	* 	@property {int} currentProcentProgress - Процент заполненности профиля
	*
	* 	@property {boolean} progressStatus - Вкл/Выкл секции прогресса
	* 	@property {boolean} infoCaseStatus - Вкл/Выкл секции Info case
	* 	@property {boolean} questionStatus - Вкл/Выкл секции вопросов
	*
	* 	@property {string} text - Тексты
	* 		@property {string} text.profileTitleText - Текст заголовка модуля
	* 		@property {string} text.popoverTitle - Заголовок всплывающего окна (info)
	* 		@property {string} text.popoverText - Текст всплывающего окна (info)
	* 		@property {string} text.infoCaseText - Информационный текст
	* 		@property {string} text.progressCaseText - Текст в секции прогресса заполненности профиля <br>
	*			<strong style="color:red; font-size: 18px;">ⓘ</strong>
	*			(Используйте <strong style="color: red">%procent%</strong> для подстановки переменной <strong>question.plusProcentQuestion</strong>, <br> 
	*			<strong style="color: red">%balance%</strong> для подстановки <strong>question.plusBalanceQuestion</strong>, <br>
	*			<strong style="color: red">%cur_procent%</strong> для подстановки переменнной <strong>currentProcentProgress</strong>)
	* 		@property {string} text.infoTextQuestion - Информация о получаемых бонусах после ответа <br>
	*			<strong style="color:red; font-size: 18px;">ⓘ</strong>
	*			(Используйте <strong style="color: red">%procent%</strong> для подстановки переменной <strong>question.plusProcentQuestion</strong>, <br> 
	*			<strong style="color: red">%balance%</strong> для подстановки <strong>question.plusBalanceQuestion</strong>, <br>
	*			<strong style="color: red">%cur_procent%</strong> для подстановки переменнной <strong>currentProcentProgress</strong>)
	* 		@property {string} text.edit_profile - Текст ссылки на редактирование профиля
	* 		@property {string} text.next_question - Текст ссылки на переход к следующему вопросу
	*
	* 	@property {array|null} selected - Список выбранных вариантов - в данный массив будут собираться 
	*									ID вариантов (<strong>question.answerVariables.object.id</strong>), 
	*									которые выбрал пользователь
	*
	*/
	stepsCount: 10,
	stepCurrent: 7,
	currentProcentProgress: 32,

	progressStatus: false,
	infoCaseStatus: false,
	questionStatus: false,
	question: questionArray,

	text: {
		profileTitleText: 'Profile',
		popoverTitle: 'How it work',
		popoverText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		infoCaseText: 'To get bonuses and help you choose the perfect pair for you, fill out your profile details',
		progressCaseText: 'Your profile is filled and verified by %cur_procent%% from 100%',
		infoTextQuestion: '+%procent%% to fill the profile, +%balance% credits',
		edit_profile: 'Go to Edit Profile',
		next_question: 'Next question >'
	},

	selected: null
}

// METHODS
const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Назначает статус видимости кейсов
	*	@method setVariables
	**/
	setVariables(){
		// Log dev
		this.$log.debug('component \'@/components/profile/profile-rating-widget\' -> init method');

		this.progressStatus = this.progress_status
		
		if(this.text.infoCaseText && this.text.infoCaseText !== '' && this.infoCase_status)
			this.infoCaseStatus = true
		
		if(this.question_status && this.question !== null) this.questionStatus = true
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Замена переменных <br>
	*	<strong style="color: red">%balance%</strong> для подстановки <strong>question.plusBalanceQuestion</strong><br>
	*	<strong style="color: red">%cur_procent%</strong> для подстановки переменнной <strong>currentProcentProgress</strong><br>
	*	<strong style="color: red">%procent%</strong> для подстановки переменной <strong>question.plusProcentQuestion</strong> 
	* 
	*	@prop balance {string} - хранит текст, который нужно заменить на значение переменной <strong>question.plusBalanceQuestion</strong>
	*	@prop cur_procent {string} - хранит текст, который нужно заменить на значение переменной <strong>currentProcentProgress</strong>
	*	@prop procent {string} - хранит текст, который нужно заменить на значение переменной <strong>question.plusProcentQuestion</strong>
	* 
	* 	@prop text_1 {string} - текст с замененным значением переменной <strong>balance</strong> (<strong style="color: red">%balance%</strong>)
	* 	@prop text_2 {string} -	текст с замененным значением переменной <strong>cur_procent</strong> (<strong style="color: red">%cur_procent%</strong>)
	* 	@prop text_3 {string} - текст с замененным значением переменной <strong>procent</strong> (<strong style="color: red">%procent%</strong>)
	* 
	*	@param var_ {string} - Text
	*	@method replaceText
	*	@return {string} text_3
	**/
	replaceText(var_){
		if(this.question !== null){
			// Log dev
			this.$log.debug('component \'@/components/profile/profile-rating-widget\' -> init method');

			const balance = '%balance%';
			const cur_procent = '%cur_procent%';
			const procent = '%procent%';

			const text_1 = var_.replace(balance, this.question.plusProcentQuestion);
			const text_2 = text_1.replace(cur_procent, this.question.plusBalanceQuestion);
			const text_3 = text_2.replace(procent, this.currentProcentProgress);

			return text_3
		}
		else {
			// Log dev
			this.$log.warn('component \'@/components/profile/profile-rating-widget\' -> question is empty');

			return var_ 
		}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция изменяет статус выбора элемента в вариантах ответов на вопрос
	* #### Условия метода selectItem(index):
	* 
	* 1. Если включена возможность мультивыбора (**question.muliptle**)
	* 1.1. Если на данный момент уже выбранно максимально возможное кол-во ответов
	* 1.1.1. Проверяем, не был ли выбран этот элемент ранее
	* **a.** Если элемент уже был выбран, удаляем его из списка выбранных
	* **б.** В противном случае - ничего не делаем
	* 1.2. Если еще не выбрано максимально допустимое кол-во вариантов
	* 1.2.1. Вызываем функцию **selectVariants()**
	* 2. Если допустим только один вариант для выбора (**!question.muliptle**)
	* 2.1. Если до сих пор не выбран ни один элемент или был выбран элемент с этим ID
	* 2.1.1. Проверяем, не был ли выбран этот элемент ранее
	* **a.** Если элемент уже был выбран - удаляем его из списка выбранных 
	* **б.** В противном случае - добавляем его ID в список выбранных вариантов
	* 2.2 Если какой-то другой элемент был ранее выбран
	* **a.** Убираем значение selected у всех вариантов
	* **б.** Устанавливаем значение **selected = true** текущему варианту и добавляем **ID** в список выбранных вариантов
	* 	
	*	
	*	@param index {int} - Индекс элемента массива
	*	@method selectItem
	**/
	selectItem(index){
		if(index >= 0 && this.question !== null){
			// Log dev
			this.$log.debug( new Date().getHours() + ':' + new Date().getMinutes()+':'+new Date().getSeconds(),
							'component \'@/components/profile/profile-rating-widget\' -> init method');

			const element = this.question.answerVariables[index];

			// Возможность выбора нескольких вариантов ответа
			if(this.question.muliptle){
				// Если выбранно максимально возможное количество ответов
				if(parseInt(this.question.max_variants) == this.selected.length){
					var found  = false
					
					// Проверяем, не выбран ли этот элемент ранее
					this.selected.forEach( (el, index) => {
						// Если элемент был выбран, удаляем его
						if(parseInt(el) == parseInt(element.id)) {
							found = true
							if(this.selected.length == 1) this.selected = null
							else this.selected.splice(index, 1);
							element.selected = !element.selected

							// Log dev
						this.$log.info('component \'@/components/profile/profile-rating-widget\' -> Варианты ответов, которые были выбраны - ID: ', this.selected);
						}
					});

					// Если элемент не был найден
					if(!found) {
						// Log dev
						this.$log.info('component \'@/components/profile/profile-rating-widget\' -> Выбрано максимальное количество ответов c ID: ', this.selected);
					}
				}
				// Если еще не выбрано максимально допустимое кол-во вариантов
				else {
					element.selected = !element.selected
					this.selectVariants() 
				}
			}

			// Только один вариант
			else {
				// Если до сих пор не выбран ни один элемент или был выбран элемент с этим ID
				if((this.selected == null || this.selected.length == 0) || element.id == this.selected){
					element.selected = !element.selected
				
					// Если был выбран этот элемент ранее - очищаем переменную с выбранными ID
					if(element.id == this.selected) this.selected = null
					// В противном случае - добавляем
					else this.selected = element.id
				}
				// Если какой-то другой элемент был ранее выбран
				else {
					// Убираем значение selected у всех эелемнтов
					this.question.answerVariables.forEach( (el) => el.selected = false );
					// Устанавливаем значение текущему и добавляем ID в selected
					element.selected = !element.selected
					this.selected = element.id
				}
				
				// Log dev
				this.$log.info('component \'@/components/profile/profile-rating-widget\' -> Выбран вариант ответа с ID:', this.selected);
			}
		}
		else {
			// Log dev
			this.$log.warn('component \'@/components/profile/profile-rating-widget\' -> question is empty');
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	*	Метод очищает переменную <strong>question</strong>
	*	и набирает ID ключами элементов this.question.answerVariables, у которых значение selected = true 
	*	
	*	@method selectVariants
	**/
	selectVariants(){
		if(this.question !== null){
			// Log dev
			this.$log.debug('component \'@/components/profile/profile-rating-widget\' -> init method');

			// Очищаем переменную
			this.selected = [];

			// Цикл по вариантам ответов - находим выбранные элементы
			this.question.answerVariables.forEach( (element, index) => {
				if(element.selected) this.selected.push(element.id);
			});

			// Log dev
			this.$log.debug('component \'@/components/profile/profile-rating-widget\' -> Выбранны варианты с ID: ', this.selected);
		}
		else {
			// Log dev
			this.$log.warn('component \'@/components/profile/profile-rating-widget\' -> question is empty');
		}
	}
}

/** Export component */
export default {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Параметры отображения по умолчанию.
	*
	* @typedef {array} <strong>props</strong>
	* 	@property {boolean} progress_status - Статус отображения прогресса заполненности профиля
	* 	@property {boolean} infoCase_status - Статус отображения информационной секции
	* 	@property {boolean} question_status - Статус отображения секции с вопросом
	*/
	props: [
		'progress_status',
		'infoCase_status',
		'question_status'
	],

	// Set data
	data: function(){ return data },

	// Created
	created: () => {
		console.time('Created_profile_rating_widget')
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода setVariables() <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода selectVariants() <br>
	* 
	* @event module:@/components/profile/profile-rating-widget~COMPONENT <strong>Profile-rating-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-rating-widget\' -> mounted');

		// Вызываем метод назначения переменных статуса видимости секций
		this.setVariables();
		// Вызываем метод наполнения переменной question (на случай кеширования данных)
		this.selectVariants();

		if(this.text.infoTextQuestion !== '' && this.question)
			this.text.infoTextQuestion = this.replaceText(this.text.infoTextQuestion)

		if(this.text.progressCaseText !== '' && this.question)
			this.text.progressCaseText = this.replaceText(this.text.progressCaseText)

		console.timeEnd('Created_profile_rating_widget')
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* <strong>question()</strong> - вызывает <strong>this.replaceText()</strong> <br>
	*	При обновлении значения переменной question, вызывает функцию замены значений в тексте <br>
	*	<strong>text.infoTextQuestion</strong> и <strong>text.progressCaseText</strong>.
	* 
	* @example
	* if(this.text.infoTextQuestion !== '' && this.question) {
	* 	this.text.infoTextQuestion = this.replaceText(this.text.infoTextQuestion)
	* }
	* if(this.text.progressCaseText !== '' && this.question) {
	*	this.text.progressCaseText = this.replaceText(this.text.progressCaseText)
	* }
	* 
	* @event module:@/components/profile/profile-rating-widget~COMPONENT <strong>Profile-rating-widget</strong> watch
	*/
	watch: {
		question(){
			// Log dev
			this.$log.debug('component \'@/components/profile/profile-rating-widget\' -> watch');

			if(this.text.infoTextQuestion !== '' && this.question !== null)
				this.text.infoTextQuestion = this.replaceText(this.text.infoTextQuestion)

			if(this.text.progressCaseText !== '' && this.question !== null)
				this.text.progressCaseText = this.replaceText(this.text.progressCaseText)
		}
	},

	// Methods
	methods: methods
}