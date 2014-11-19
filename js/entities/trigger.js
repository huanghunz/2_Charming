var broken = false;

// Station Enity
//////////////////////////////////////////////////////////////////////////////////////////
game.stationEntity = me.ObjectEntity.extend({	// the build UI
   
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = true;		
        this.updateColRect(-1, 0, -1, 0);
		this.myAlpha = 0;
    },
	
    update: function() {
    	
    	var res = me.game.collide(this);
		if(res && ( res.obj.name == "girl" )){
			this.myAlpha = 0.0;
			station_on = true;
		}	
		else{
			this.myAlpha = 0.0;
			station_on = false;
		}		
	},
		
	draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}
});

// Weapon Enity
//////////////////////////////////////////////////////////////////////////////////////////
// the weapon has to be around the boy in the start position in the level
game.weaponEntity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {	
	  	 	
	  	var character =  me.game.getEntityByName("boy")[0]; 
       	this.parent(character.pos.x-10, character.pos.y, settings);
       	
       	this.collidable = false; 
	  	this.updateColRect(-1,0, 0, 30); 	
 						
        this.setVelocity(3, 15);  									
        this.alwaysUpdate = true;
        this.attacking = false;										// variable to determine if attacking or not
    },
 
	update: function() {
		
		var character =  me.game.getEntityByName("boy")[0]; 
		this.pos.y = character.pos.y + 30;
		this.pos.x = character.pos.x + 30;
		this.collidable = false; 
	
 		if (game.data.control_boy == true){
 			if (me.input.isKeyPressed('attack') && face == "right"){
 				this.attacking = true;
 				this.pos.x = character.pos.x + 70; // hardcode
 				this.collidable = true; 
 				
 			}else if (me.input.isKeyPressed('attack') && face == "left"){
 				this.attacking = true;
 				this.pos.x = character.pos.x-10 ; // hardcode
 				this.collidable = true; 
 			}
 		}
 			
 		if (this.collidable)
 			var res = me.game.collide(this); // collide(this) checks if the object collides with some objects
									     // but which object will not be returned. Can check it with other codes				
	
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0 || this.attacking){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	},
});


//////////////////////////////////////////////////////////////////////////////////////////
game.operatorEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        this.parent(x, y, settings);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 		this.setVelocity(0, 0);
    },
 
    onCollision: function(res, obj){
    	if ( (obj.name == "weapon" && obj.attacking ) ) /* break the block to rebuild */{
    		me.game.remove(this);
			broken = true;
		}
    }
});


//////////////////////////////////////////////////////////////////////////////////////////
// if the operator is attacked, the droppable item will fall untill its edge reaches collidable objects
game.droppableEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0, 0);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);

    },
 
     update: function(){
	
    	if ( broken){
    		this.setVelocity(0, 4);
    		this.vel.y +=  this.accel.y * me.timer.tick;
    		this.updateMovement();
    	}
    	
    	// once the droppable item stops, reset the flag and velocity, else the objects in same class will fall
    	// once they are inside of camera
    	if ( this.vel.y == 0){
    		this.setVelocity(0, 0);
    		broken = false;
    	}
   
    },
    
});


