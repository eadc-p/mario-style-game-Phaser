var Game = {};

Game.Boot = {
	init:function(){
		this.input.maxPointers = 1; //max nos. of inputs allowed at any one time.
		this.stage.disableVisibilityChange = true;
	},
	preload:function(){
		this.load.image('preloaderBar','assets/preloader.png')
	},

	create:function(){
		this.state.start('Preloader');
	}
}