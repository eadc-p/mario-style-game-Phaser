


Game.Preloader = {
	preload:function(){
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5,0.5);

		this.time.advanceTiming = true;


		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.tilemap('map','assets/level1.csv');
		this.load.image('tileset','assets/newtileset.png')

		this.load.spritesheet('player','assets/player.png',24,26);
		// this.load.spritesheet('player')
		this.load.spritesheet('buttons','assets/button_sprite_sheet.png',193,71);

		this.load.image('drag','assets/drag.png');

		this.load.image('bird','assets/enemyBird.png');
	},

	create:function(){
		this.state.start('Level1');
	}
}