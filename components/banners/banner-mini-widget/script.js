/**
*	@version 1.0 beta
*	@module @/components/banners/banner-mini-widget
*	@desc <strong>Component Banner full width</strong> - banner widget
*	@see ~/components/banners/banner-mini-widget
*
*	@author	Pavel Uhrynovych (front-end developer of VC)
*	@copyright 2018©victoriyaclub.com
*/

// DATA
const data = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Компонент ожидает данные от родителя в переменной <strong>options</strong>
	* и назначаeт <strong>data</strong> в хуке ► mounted
	*
	* @local
	* @typedef {Object} Data
	* 	@property {string} image - Image link
	* 	@property {string} imageAlt - Image attr `alt` 
	* 	@property {string} text - Text on the banner
	*
	* 	@property {string} routeName - Route name (priority)
	* 	@property {false|string} link - Route link (if RouteName is false)
	* 	@property {boolean} targetBlank - Open new window on click
	*
	* 	@property {false|string} specialClassImage - add class to Image
	* 	@property {false|string} specialClassText - add class to Text
	*/
	image: '',
	imageAlt: '',
	text: '',
	routeName: false,
	link: false,
	targetBlank: true,
	specialClassImage: false,
	specialClassText: false
}

// METHODS
const methods = {
	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Функция для назначения данных из <strong>props</strong> <strong>`options`</strong>
	* в переменные <strong>data</strong>
	* @func setData
	*/
	setData (){
		// Log mounted hook
		this.$log.debug('component \'@/components/banners/banner-mini-widget\' -> method init');

		const a = this.options;
		if(a){
			if(a.image && a.image !== ' '){
				this.image = a.image;
				this.imageAlt = a.imageAlt;
				this.text = a.text;
				this.routeName = a.routeName;
				this.link = a.link;
				this.targetBlank = a.targetBlank;
				this.specialClassImage = a.specialClassImage;
				this.specialClassText = a.specialClassText;
			}
			// Если не передана ссылка на изображение
			else{
				this.$log.warn('component \'@/components/banners/banner-mini-widget\' -> prop options.image not found or it\'s empty');
			}
		}
		// Если не передана переменная options
		else{
			this.$log.warn('component \'@/components/banners/banner-mini-widget\' -> prop options not found');
		}
	}
}



/** Export component */
export default {
	/**
	* @typedef {array} <strong>props</strong>
	* 	@property {object} options - Options array
	*		@property {string} options.image - Image link
	* 		@property {string} options.imageAlt - Image attr `alt` 
	* 		@property {string} options.text - Text on the banner
	*
	* 		@property {string} options.routeName - Route name (priority)
	* 		@property {false|string} options.link - Route link (if RouteName is false)
	* 		@property {boolean} options.targetBlank - Open new window on click
	*
	* 		@property {false|string} options.specialClassImage - add class to Image
	* 		@property {false|string} options.specialClassText - add class to Text
	*/
	props: ['options'],

	// Set data
	data: function(){ return data },

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* Set local variables value (if prop 'options') - call 
	* <strong>setData()</strong>
	* 
	* @event module:@/components/banners/banner-mini-widget~COMPONENT <strong>Banner-mini-widget</strong> mounted
	*/
	mounted: function(){
		// Log mounted hook
		this.$log.info('component \'@/components/banners/banner-mini-widget\' -> mounted');
		// 
		this.setData();
	},

	// Methods
	methods: methods
}
