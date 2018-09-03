/**
*   @version 1.0 beta
*   @module @/pages/index
*   @desc <strong>Index Page</strong>
*   @see ~/pages/index.vue
*
*   @author Pavel Uhrynovych (front-end developer of VC)
*   @copyright 2018©victoriyaclub.com
*/

import Auth from '~/components/auth'
import BannerFullWidth from '~/components/banners/banner-full-width'
import case_1 from '~/components/cases/case-1'
import case_2 from '~/components/cases/case-2'
import case_3 from '~/components/cases/case-3'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Временные файлы для demo версии !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import bannerTopParams from '~/static/tmp/banners/bannerTopFullWidth_params'
import case1Params from '~/static/tmp/cases/case_1'
import case2Params from '~/static/tmp/cases/case_2'
import case3Params from '~/static/tmp/cases/case_3'
// -------------------------------------------------------------------------------------------

const data = {
	/**
	* @typedef {Object} Data
	*
	* 	@property {object} meta - Meta-данные страницы (SEO)
	* 		@property {string} meta.title - Meta Title
	* 		@property {string} meta.description - Meta Description
	*
	* 	@property {object} bannerTop - Параметры модуля [Banner-full-width]{@link module:COMPONENT_Banner-full-width}
	* 		@property {boolean} bannerTop.status - Статус отображения модуля на странице
	* 		@property {object} bannerTop.params - Все принимаемые параметры описаны в документации модуля <br>
	* 		[Banner-full-width]{@link module:COMPONENT_Banner-full-width} в Type Definitions <strong>props</strong>
	*
	* 	@property {object} case_1 - Параметры модуля [Case-1]{@link module:COMPONENT_Case-1}
	* 		@property {boolean} case_1.status - Статус отображения модуля на странице
	* 		@property {object} case_1.params - Все принимаемые параметры описаны в документации модуля <br>
	* 		[Case_1]{@link module:COMPONENT_Case-1} в Type Definitions <strong>props</strong>
	*
	* 	@property {object} case_2 - Параметры модуля [Case-2]{@link module:COMPONENT_Case-2}
	* 		@property {boolean} case_2.status - Статус отображения модуля на странице
	* 		@property {object} case_2.params - Все принимаемые параметры описаны в документации модуля <br>
	* 		[Case_1]{@link module:COMPONENT_Case-1} в Type Definitions <strong>props</strong>
	*
	*/
	meta: {
		title: 'Главная страница - VictoriyaClub.com',
		description: 'Описание главной страницы'
	},
	bannerTop: {
		status: true,
		params: bannerTopParams
	},
	case_1: {
		status: true,
		params: case1Params
	},
	case_2: {
		status: true,
		params: case2Params
	},
	case_3: {
		status: true,
		params: case3Params
	}
}

/** Export component */
export default {
	// Set data
	data: function(){ return data },

	// Meta
	head() {
		return {
			title: this.meta.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.meta.description
				}
			]
		}
	},

	serverCacheKey() {
		// Will change every 10 secondes
		return Math.floor(Date.now() / 10000)
	},

	/**
	* This page requires the components:<br>
	*
	* - [Banner-full-width]{@link module:@/components/banners/banner-full-width}<br>
	* - [Case-1]{@link module:@/components/cases/case-1}<br>
	* - [Case-2]{@link module:@/components/cases/case-2}<br>
	* - [Case-3 (chat container)]{@link module:@/components/cases/case-3}<br>
	*/
	components: {
		'banner-full-width': BannerFullWidth,
		case_1,
		case_2,
		case_3,
	},

	// Created
	created: () => {
		// Запускаем таймер, чтоб знать, за какое время страница будет смонтирована
		console.time('Created_Index-page')
	},

	// Middleware auth
	middleware: ['auth'],
	options: { auth: false},

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @event module:@/pages/index~PAGE <strong>Index</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/pages/index\' -> mounted');

		if(this.$auth.user) this.$log.debug(this.$auth.user);
		
		// Вывод времени компиляции страницы
		console.timeEnd('Created_Index-page')
	},

	// Methods
	methods: {}
}