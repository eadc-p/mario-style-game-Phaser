var map;
var layer;

var player;
var controls={};
var playerSpeed = 150;
var jumpTimer = 0;

var buttons;
var drag;

EnemyBird = function(index,game,x,y){
	this.bird = game.add.sprite(x,y,'bird');
	this.bird.anchor.setTo(0.5,0.5);
	this.bird.name = index.toString();
	game.physics.enable(this.bird,Phaser.Physics.ARCADE);
	this.bird.body.immovable = true;
	this.bird.body.collideWorldBounds = true;

	this.birdTween = game.add.tween(this.bird).to({y:this.bird.y+25}, 2000, 'Linear', true, 0, 100, true);

}

Game.Level1= {
	create: function(game){
		this.stage.backgroundColor = '#3a5963';
		map=this.add.tilemap('map',64,64);

		this.physics.arcade.gravity.y = 1400; //global gravity
		map.addTilesetImage('tileset');
		layer = map.createLayer(0);
		layer.resizeWorld();

		map.setCollisionBetween(0,2);
		map.setTileIndexCallback(5,this.resetPlayer,this);
		map.setTileIndexCallback(6,this.getCoin,this);


		player = this.add.sprite(100,560,'player');
		player.anchor.setTo(0.5,0.5);

		player.animations.add('idle',[0,1],1,true);
		player.animations.add('jump',[2],1,true);
		player.animations.add('run',[3,4,5,6,7,8],7,true);
		this.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.collideWorldBounds = true;

		controls = {
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
		}

		button = this.add.button(this.world.centerX - 95, this.world.centerY + 200, 'buttons',function(){
			console.log('pressed');
		},this,2,1,0);

		button.fixedToCamera = true;

		drag=this.add.sprite(100,100, 'drag');
		drag.anchor.setTo(0.5,0.5);
		drag.inputEnabled = true;
		drag.input.enableDrag(true);

		new EnemyBird(0,game, player.x + 400, player.y -200);
	},
	update: function(){
		this.physics.arcade.collide(player,layer);
		player.body.velocity.x =0;
		// player.animations.play('idle');
		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x += playerSpeed;
		}
		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x -= playerSpeed ;
		}

		if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now>jumpTimer){
			player.animations.play('jump');
			player.body.velocity.y=-600;
			jumpTimer = this.time.now+750;
		}
		if(player.body.velocity.x==0 && player.body.velocity.y==0){
			player.animations.play('idle');
		}

	},

	resetPlayer:function(){
		player.reset(100,560);
	},

	getCoin:function(){
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
	}

}