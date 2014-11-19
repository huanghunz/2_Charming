

//HUD container and child items
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD = game.HUD || {};

// contatiner 
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		// persistent across level change
		this.isPersistent = true;
		// non collidable
		this.collidable = false;
		// make sure our object is always draw first
		this.z = Infinity;
		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(100, 5));
		this.addChild(new game.HUD.BlocksItem(-45, 42.5));
		this.addChild(new game.HUD.HealthItem(-45, 87.5));
		this.addChild(new game.HUD.DashItem(798, 50));
		this.addChild(new game.HUD.SwitchIcon(me.game.viewport.getWidth() -150, me.game.viewport.getHeight() -100 ));
	}
});

// coin count & display
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.ScoreItem = me.Renderable.extend({	
	
	init: function(x, y) { /* constructor */
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
	},

	update : function () {
		// update the score
		if(game.data.score >= 50){
			game.data.health++;	
			game.data.score -= 50;
		}
	},

	// draw the display
	draw : function (context) {
		
		this.font.draw(context, game.data.score, this.pos.x + 165, this.pos.y);			// value
		this.font.draw(context, game.data.sText, this.pos.x + 100, this.pos.y);				
		this.font.draw(context, game.data.sMess, this.pos.x + 400, this.pos.y);
		
	}
});

// block count & display
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.BlocksItem = me.Renderable.extend({	
	
	init:function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
		this.icon = me.loader.getImage("block");
		
	},

	draw : function (context){
		
		var num = game.data.blocks;
		for ( var i = 1; i <= num; i++){ // i starts at 1 for multiplication
			context.drawImage(this.icon, this.pos.x  + i*60, this.pos.y);	
		}
	}

});

game.HUD.HealthItem = me.Renderable.extend({
	
	init:function(x, y){
		
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			
		this.font.set("right");
		this.floating = true;
		this.icon = me.loader.getImage("heart");
		
	},

	draw : function (context){
		
		var num = game.data.health;
		for ( var i = 1; i <= num; i++){ 
			context.drawImage(this.icon, this.pos.x  + i*60, this.pos.y );	
		}
	}
});

game.HUD.DashItem = me.Renderable.extend({	
	
	init:function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
		this.barIcon = me.loader.getImage("dashBar");
		this.endIcon = me.loader.getImage("dashEnd");
		
	},

	draw : function (context){
		
		if ( game.data.control_boy == true){	
			
			var time = game.data.dashing_time;
			this.font.draw(context, game.data.dText, this.pos.x, this.pos.y - 50);	
				
			for ( var i = 1; i < time; i++){
				context.drawImage(this.barIcon, this.pos.x - i*10, this.pos.y);
			}
			context.drawImage(this.endIcon, this.pos.x - i*10, this.pos.y);	
		}
	}
});

game.HUD.SwitchIcon = me.Renderable.extend({
	
	init:function(x,y){
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.switch_pcs = me.loader.getImage("switch_pcs");
		this.switch_pce = me.loader.getImage("switch_pce");
		this.floating = true;
	},
		
	draw: function(context){
		if(game.data.control_boy){
			var character = me.game.getEntityByName("boy")[0];
			if ( character.vel.x == 0 && character.vel.y == 0 && !stand)
				context.drawImage(this.switch_pcs, this.pos.x, this.pos.y );
		
		} else if(game.data.control_girl){
			var character = me.game.getEntityByName("girl")[0];
			if ( character.vel.x == 0 && character.vel.y == 0 && !stand)
				context.drawImage(this.switch_pce, this.pos.x, this.pos.y);

		}
	}
});