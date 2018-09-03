/**
*	@version 1.0 beta
*	@module @/components/profile/profile-balance-widget
*	@desc <span style="color: red; font-size: 18px;">☢ Only authorized user</span><br>
*	<strong>Component Profile balance widget</strong> - История списаний и начислений баланса пользователя.
*	@see ~/components/profile/profile-balance-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

import buyCreditsDropdownWidget from "~/components/balance/buyCredits-dropdown-widget"

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import paymHistory from '~/static/tmp/balance/payment-history'
// -------------------------------------------------------------------------------------------

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Рекомендуется загружать объект data асинхронно с сервера
	*
	* @typedef {Object} Data
	* 	@property {int|null} userBalance - Текущий баланс пользователя (переназначается в <strong>mounted</strong> из Store > <strong>$auth.user</strong>)
	* 	@property {int|null} lastPayment - Сумма купленных кредитов (при последнем пополнении)
	*
	*	@property {Object} text - Тексты
	* 		@property {string} text.balance_prefix - Префикс текущего баланса
	* 		@property {string} text.balance_postfix - Постфикс текущего баланса
	*
	* 		@property {string} text.quickPayment_prefix - Префикс ссылки быстрого пополнения счета
	* 		@property {string} text.quickPayment_postfix - Постфикс ссылки быстрого пополнения счета
	*
	* 		@property {string} text.balance_prefix_history - Префикс баланса истории расходов (слайдер)
	* 		@property {string} text.balance_postfix_history - Постфикс баланса	истории расходов (слайдер)
	* 		@property {string} text.openHistory_text - Текст ссылки "смотреть все"
	*
	* 	@property {array} paymentHistory - История списаний и начислений
	* 	@property {array} swiperOption - Опции плагина [swiper]{@link module:Plugin_swiper}
	*/
	userBalance: null,
	lastPayment: 360,
	text: {
		balance_prefix: 'Credits ',
		balance_postfix: '',
		
		quickPayment_prefix: '',
		quickPayment_postfix: ' immediately',
	
		balance_prefix_history: '',	
		balance_postfix_history: ' credits',
		openHistory_text: 'Open history',
	},
	paymentHistory: paymHistory,
	swiperOption: {
		effect: 'flip',
		centeredSlides: false,
		navigation: {
			nextEl: '.next-btn-slider',
			prevEl: '.prev-btn-slider',
			disabledClass: 'disabled'
		},
	}
}

// METHODS
const methods = {
	
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {array} buyCredits_dropdown_status - Статус активности виджета 
	* 	[BuyCredits-dropdown-widget]{@link module:@/components/balance/buyCredits-dropdown-widget}
	*/
	props: ['buyCredits_dropdown_status'],

	// Set data
	data: function(){ return data },

	/**
	* This module requires the components:<br>
	*
	* - [BuyCredits-dropdown-widget]{@link module:@/components/balance/buyCredits-dropdown-widget} (if the user is not authorized)<br>
	*/
	components: {
		'buyCredits-dropdown-Widget' : buyCreditsDropdownWidget
	},

	/**
	* @desc ▶ Hook reporting <br>
	* 
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Устанавливаем значение переменной <strong>userBalance</strong><br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> 
	* 
	* @event module:@/components/profile/profile-balance-widget~COMPONENT <strong>Profile-balance-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/profile/profile-balance-widget\' -> mounted');

		// Назначем текущий баланс пользователя локальной переменной
		this.userBalance = this.$auth.user.balance
	},

	// Methods
	methods: methods
}
