/**
*	@version 1.0 beta
*	@module @/components/balance/buyCredits-dropdown-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Buy credits dropdown widget</strong> - Виджет быстрого пополнения счета
*	@see ~/components/balance/buyCredits-dropdown-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import packagesArray from '~/static/tmp/balance/packages'
// -------------------------------------------------------------------------------------------


// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера <br>
	*
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Если модуль не получит переменную `packages`, он не будет отображен
	*
	*
	* @typedef {Object} Data
	* 	@property {array} packages - Тарифные планы
	* 		@property {string|int} packages.price - Price
	* 		@property {string|int} packages.amount - Amount
	* 		@property {string|int} packages.save - Save
	* 		@property {boolean} packages.widget - Display status in the widget
	*
	* 	@property {string} btn_text - Текст кнопки "Buy credits"
	* 	@property {string} viewAll_text - Текст ссылки на просмотр всех тарифных планов
	*
	* 	@property {object} titles - Заголовки колонок выпадающего списка
	* 		@property {object} titles.price - Price
	* 		@property {object} titles.amount - Amount
	* 		@property {object} titles.save - Save
	*
	* 	@property {string} currency_prefix - Префикс стоимости
	* 	@property {string} currency_postfix - Постфикс стоимости
	* 	@property {string} credits_postfix - Постфикс кредитов
	* 	@property {string} save_postfix - Постфикс экономии
	*
	*/

	packages: packagesArray,
	btn_text: 'Buy credits', 
	viewAll_text: 'View all packages',
	titles:
		{
			price: 'Price',
			amount: 'Amount',
			save: 'Save'
		},
	currency_prefix: '$',
	currency_postfix: '',
	credits_postfix: ' credits',
	save_postfix: '%'
}

// METHODS
const methods = {
	
}

/** Export component */
export default {
	name: 'buyCreditsDropdownWidget',

	// Set data
	data: function(){ return data },

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* 
	* @event module:@/components/balance/buyCredits-dropdown-widget~COMPONENT <strong>BuyCredits-dropdown-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/balance/buyCredits-dropdown-widget\' -> mounted');

	},

	// Methods
	methods: methods
}
