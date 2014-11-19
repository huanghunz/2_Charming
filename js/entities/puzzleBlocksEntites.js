
var puzzleBlocksType = "puzzleBlocksType";

game.block_solid_entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = true;		
        this.setVelocity(3, 8); 
    
        posX = this.pos.x;
        posY = this.pos.y;
       
        this.type = puzzleBlocksType;
    },
    
    update: function(){
  
    	var res = me.game.collide(this);
    	
    	if (res){		
    		if (res.x != 0 && res.y == 0 && (res.obj.name == "girl" || res.obj.name == "boy" )){	
    			this.vel.x = res.obj.vel.x; // being pushed
    		}
   			if ((res.x < 0 && me.input.keyStatus('left')) || res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    			this.vel.x = 0;	
    		}
    	}
    	
    	if ( !puzzle_pushing ) // if pushing is false
    		this.vel.x = 0;
    	
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	},
	
});


game.block_puzzle_entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
		
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
    
        this.type = puzzleBlocksType;
    },
    
    update: function(){
		
    	if (game.data.blocks == 4 && me.input.isKeyPressed('shift') && station_on == true){
    			
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 
    			game.data.blocks = 0;
    	}
    	
    			
    	var res = me.game.collide(this);
    	
    	if (res){	
    		if (res.x != 0 && !res.y && (res.obj.name == "girl" || res.obj.name == "boy" ))		
    			this.vel.x = res.obj.vel.x;
    
    		if ((res.x < 0 && me.input.keyStatus('left')) || res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}
    	
    	if ( !puzzle_pushing ) // if pushing is false
    		this.vel.x = 0;
    	
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}

});

