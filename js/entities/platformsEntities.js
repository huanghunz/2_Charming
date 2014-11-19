
var timeOfstealth = 150;

var platformType = "platformType";

game.stealth_platformEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		this.walkLeft = true;
 		this.startX = x;
 		this.endX = x + settings.width - settings.spritewidth;
 		
        this.setVelocity(0, 0);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 		
 		this.type = platformType;
 		this.appear_time = timeOfstealth;
 		this.disapp_time = timeOfstealth;
    },
    
    update: function() { // control the duartion
    	
    	if ( !this.appear_time && !this.disapp_time ){
    		this.appear_time = timeOfstealth;
    		this.disapp_time = timeOfstealth;
    	}	
		if(this.appear_time){
			this.myAlpha = 1.0;
			this.appear_time--;
			this.collidable = true;
			
		}else if( this.disapp_time){
			this.myAlpha = 0.0;
			this.collidable = false;
			this.disapp_time--;
		}		
		
	},
	
	draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  			// parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	},
});


game.moving_platform_hor_entity = me.ObjectEntity.extend({ // horizontal
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		this.walkLeft = true;
 		this.startX = x;
 		this.endX = x + settings.width - settings.spritewidth;
 	
        this.setVelocity(1, 0);
        this.type = platformType;
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 	
 		this.alwaysUpdate = true;// moving even out of scope
    },
 
    update: function() { 
 			
 		if(this.walkLeft && this.pos.x <=this.startX){
 			this.walkLeft = false;
 		}else if(!this.walkLeft && this.pos.x >= this.endX){
 			this.walkLeft = true;
 		}
 			
 		this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
 				
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	} 
});


game.moving_platform_ver_entity = me.ObjectEntity.extend({ // vertical
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(-1,0,-1,0);
 		this.walkLeft = true;
 		this.startY = y;
 		this.endY = y + settings.height - settings.spriteheight;
 	
        this.setVelocity(0, 1);
 		this.collidable = true; 
 		this.type = platformType;
 	
 		this.alwaysUpdate = true;// moving even out of scope
    },
 

    update: function() { 
    	if(this.walkLeft && this.pos.y <=this.startY){
 			this.walkLeft = false;
 			
 		}else if(!this.walkLeft && this.pos.y >= this.endY){
 			this.walkLeft = true;
 		}
 			
 		this.vel.y += (this.walkLeft) ? -this.maxVel.y * me.timer.tick : this.maxVel.y * me.timer.tick;
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	}
});



game.moving_platform_drop_entity = me.ObjectEntity.extend({ // drop one
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		this.startX = x;
 		this.startY = y;
 	
 		this.collidable = true; 
        this.setVelocity(0, 0);
 		
 	 	this.updateColRect(-1,0,-1,0);
 	 	this.keepStay 	= 30; // 
 	 	this.sleepTime 	= 0;
 	 	this.touched 	= false;
 	 	this.sleeping = false;
 	 
 	 	this.type = platformType;
 		this.alwaysUpdate = true;// moving even out of scope
    },
 
    update: function() { 	
    	 		
 		var res = me.game.collide(this);
 	
 		if (res && res.y < -2.9 && res.obj.type == playerType){
 		
 			if (this.keepStay != 0)
 				this.touched = true; // player stands on it
 			this.setVelocity(0,16);
 		}
 		
 		if ( this.touched && this.keepStay) {
 			this.keepStay--; 
 		
 		}else if (this.touched && !this.keepStay){
 			this.vel.y +=  this.accel.y * me.timer.tick;
 			this.updateMovement();
 			if ( this.vel.y == 0){
 				this.touched = false;	
 				this.sleepTime = 45;
 				this.sleeping = true;
 				}		
 		
 		}else if ( !this.touched && this.sleeping ){ // sleep time
 			//console.log("ready?");	
 			if (this.sleepTime != 0 ){
 				this.sleepTime--;
 			
 			}else if (this.sleepTime == 0){
 				
 				this.keepStay 	= 30; 
 	 			this.sleeping = false;
 	 			this.setVelocity (0,0);
 	 			this.pos.x = this.startX;
 	 			this.pos.y = this.startY;
 			}
 		}
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			this.parent();
 			return true;
 		}
 		return false;
 	},
 	
});

