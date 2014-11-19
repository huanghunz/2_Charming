
var double_jump = false;
var face = "left";
var station_on = false;

var cool_down = false;
var cooling_time = game.data.dashing_time * 2;
var puzzle_pushing = false;

var girl_jump_speed = 16;
var boy_jump_speed = 17.5;
var walking_speed = 3.8; 
var pushing_speed = 1.6;
var playerType = "me.game.player";
var musicIsON = 1;
var mPressedGap = 0;

var stand =false;
var solidType = "solidType";

// Princess Character
///////////////////////////////////////////////////////////////////////////////////////////////////
game.girlEntity = me.ObjectEntity.extend({

	init : function(x, y, settings) {// a constructor

		this.parent(x, y, settings);
		this.setVelocity(walking_speed, girl_jump_speed);// set the default (horizontal, vertical) speed,
		
		this.updateColRect(30, 40, 25, 60);	//(x, w, y, h) -- (-1,0,-1,0) means exact same size as the sprite
												
		this.type = playerType;
		this.alwaysUpdate = true; // the character will not die even jump higher than the screen
		
		this.focalPt = new me.Vector2d(this.pos.x + 100, this.pos.y);	
		me.game.viewport.follow(this.focalPt, me.game.viewport.AXIS.BOTH); 
		
		// flags that character will have time to escape from being hit
		this.flickering = false;
		this.flickerTime = 60;
		this.face = "right";
		
		//Player animations
		this.renderable.addAnimation("idle", [17]);
		this.renderable.addAnimation("glide", [12, 13, 14, 15, 16] );
		this.renderable.addAnimation("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 30);
		this.renderable.addAnimation("jump", [5]);
		this.renderable.setCurrentAnimation("idle");
		
	},

	update : function() {//updating girl's position

		if ((game.data.control_girl == true )) {
			utility();
			
			
			if ( this.face == "right"){
				this.focalPt = new me.Vector2d(this.pos.x + 100, this.pos.y);		
			}else 
				this.focalPt = new me.Vector2d(this.pos.x - 20, this.pos.y);		
				
			me.game.viewport.follow(this.focalPt, me.game.viewport.AXIS.BOTH); 
			
			checkDeath(this); // if character dies, respawn
			
			if (!this.renderable.isCurrentAnimation("run")) {//if a key is pressed the girl will run
				this.renderable.setCurrentAnimation("run");
			}
			
			if (me.input.isKeyPressed('left')) {
				this.face = "left";
				this.flipX(true);
				this.vel.x -= this.accel.x * me.timer.tick;
				// update the entity velocity
			} else if (me.input.isKeyPressed('right')) {
				this.face = "right";
				this.flipX(false); // unflip the sprite
				this.vel.x += this.accel.x * me.timer.tick;// update the entity velocity
			
			} else {
				this.vel.x = 0; // stop, else it will continue walking like the snake in snake-game
				this.renderable.setCurrentAnimation("idle");//use idle pose when not moving
			}

			if (me.input.isKeyPressed('jump')) {// jump/double jump
				
				if (!this.jumping && !this.falling) {// basic jump
					this.vel.y = -this.maxVel.y * me.timer.tick;
				} else if (!double_jump) {
					this.vel.y = -this.maxVel.y * me.timer.tick;
					double_jump = true;
				}
				this.jumping = true;
				
			}else if (!stand && this.falling && double_jump && me.input.keyStatus('jump')) {// glide
				this.setVelocity(walking_speed, 1.2);

			}else if (stand && this.falling && !double_jump && me.input.keyStatus('jump')) {
				this.setVelocity(walking_speed, girl_jump_speed);
				this.vel.y = -this.maxVel.y * me.timer.tick;
				this.jumping = true;
			}
	//if ((this.jumping || this.falling )  && (!stand ) ) {
      //          this.renderable.setCurrentAnimation("jump");}
			//will use jump frame as long as the jump button is held
			if ((this.jumping || this.falling )  && (!stand ) && !double_jump ){
				this.renderable.setCurrentAnimation("jump");

				//otherwise will use the glide animation when falling down,
				//currently the glide animation does not go through the animation
			}else if (!this.renderable.isCurrentAnimation("glide") && this.falling && !stand) {
				this.renderable.setCurrentAnimation("glide");	
			
			}else if (me.input.isKeyPressed('switchB') && this.vel.x == 0 && this.vel.y == 0 && !stand) {// switching the camera focal position

				var character = me.game.getEntityByName("boy")[0]; // A function to get entity's position
				
				this.pos.y--;     // to active the camera, else the screen will stay in boy's side
				this.vel.x = 0;   // stop the movement of current character
				
				game.data.control_boy = true;
				game.data.control_girl = false;
				me.game.viewport.follow(character.pos, me.game.viewport.AXIS.BOTH); 
				
			}
			
			this.updateMovement();
			
			// check & update player movement
			/////////////////////////// collision //////////////////////////////////////////////

			var res = me.game.collide(this); // collide(this) checks if the object collides with some objects

			puzzle_pushing = false;
			stand = false;
			
			// but which object will not be returned. Can check it in following codes
			if (res) {
				if (res.obj.name == "boy" ){ // ending
					me.game.viewport.fadeIn("#000", 500, function () {
						me.audio.stopTrack();
                		me.state.change(me.state.END);
            		});
				}
				
				if (res.x != 0 && res.y == 0 && (res.obj.type == puzzleBlocksType)) {
					if (res.obj.name == "solid"){
						this.setVelocity(0, girl_jump_speed);
					
					}else{
						puzzle_pushing = true;
						this.setVelocity(pushing_speed, girl_jump_speed);
					}
				}else if ((res.obj.type == puzzleBlocksType || res.obj.type == platformType || res.obj.name == "droppable")) {	
					platformCollision(res, this);
				}
				
				if (res.obj.type == me.game.ENEMY_OBJECT) {// if we collide with an enemy	
					enemyCollision(res,this);
				}
			}// end checking collision

			if (!this.jumping && !this.falling)
				double_jump = false;
			else if (this.falling && stand)
				double_jump = false;
			
			if ( !this.flickerTime){
				this.flickerTime = 60;
				this.flickering = false;
			}
			if ( this.flickering ){
				this.flickerTime--;
			}
			
			if (!puzzle_pushing && !stand ){
				this.setVelocity(walking_speed, girl_jump_speed);
			}
			
			if (this.vel.x != 0 || this.vel.y != 0 || double_jump) {// update animation if necessary
				this.parent();
				return true;
			}
			return false;
		}// end controlling girl

	}
});// end gril entity

// Prince Character
///////////////////////////////////////////////////////////////////////////////////////////////////
game.boyEntity = me.ObjectEntity.extend({

	init : function(x, y, settings) {// a constructor

		this.parent(x, y, settings);
		// if you look for some explaination, please refer to game.girlEntity
		this.updateColRect(30, 40, 25, 60);			
		this.setVelocity(walking_speed, boy_jump_speed);
		this.type = playerType; 
		this.alwaysUpdate = true; // the character will not die even jump higher than the screen
		
		this.flipX(true);
		this.flickering = false;
		this.flcikerTime = 60;
		this.focalPt = null;
		
		this.face = "left";
		this.dashing = false;
		this.cooling = false;
		this.attacking = false;
	
		this.renderable.addAnimation("idle", [12]);
		this.renderable.addAnimation("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 30);
		this.renderable.addAnimation("attack", [14] );
		this.renderable.addAnimation("jump", [5]);
		this.renderable.setCurrentAnimation("idle");
	},

	update : function() {//updating boy's position

		if (game.data.control_boy == true) {	
			utility();
			
			
			if ( this.face == "right"){
				this.focalPt = new me.Vector2d(this.pos.x + 100, this.pos.y);		
			}else 
				this.focalPt = new me.Vector2d(this.pos.x - 20, this.pos.y);		
				
			me.game.viewport.follow(this.focalPt, me.game.viewport.AXIS.BOTH); 
			checkDeath(this);
			
			if (!this.renderable.isCurrentAnimation("run")) {
				this.renderable.setCurrentAnimation("run");
			}
			if (me.input.isKeyPressed('left')) {
				face = "left";
				this.flipX(true);// flip the sprite on horizontal axis
				this.vel.x -= this.accel.x * me.timer.tick; // update the entity velocity
			
			} else if (me.input.isKeyPressed('right')) {
				face = "right";
				this.flipX(false);
				this.vel.x += this.accel.x * me.timer.tick;
			
			} else {
				this.vel.x = 0;
				this.renderable.setCurrentAnimation("idle");
			}
				
			this.dashing = false;
		
			if (me.input.isKeyPressed('jump' )) { /// end single jump
				if (!this.jumping && !this.falling) {// make sure we are not already jumping or falling
					this.vel.y = -this.maxVel.y * me.timer.tick; // set current vel to the maximum defined value
					this.jumping = true;
				}
				
			}else if (stand && this.falling && me.input.keyStatus('jump')) { // be able to jump on blocks, bouncing when pressing 'jump'
				this.setVelocity(walking_speed, boy_jump_speed);
				this.vel.y = -this.maxVel.y * me.timer.tick;
				this.jumping = true;
			
			}else if (me.input.keyStatus('dash') && !this.cooling &&  !this.jumping) {	
				if (game.data.dashing_time){
					this.dashing = true;
					this.setVelocity(6, 0); //dashing horizontally
					game.data.dashing_time--;
					
					if (face == "left")
						this.vel.x -= this.accel.x * me.timer.tick * 10;
					else
						this.vel.x += this.accel.x * me.timer.tick * 10;
					this.updateMovement();
				} 
			}// end dashing
			
			if ((this.jumping || this.falling )  && (!stand ) ) {
                this.renderable.setCurrentAnimation("jump");
            }else if (this.dashing){
            	this.renderable.setCurrentAnimation("jump");
            }   
           
		    if (me.input.isKeyPressed("attack") ) { 
		    	this.renderable.setCurrentAnimation("attack");
            
            }else if (me.input.isKeyPressed('switchG') && this.vel.x == 0 && this.vel.y == 0 && !stand) {
				
				var character = me.game.getEntityByName("girl")[0];
				this.pos.y--; 	// move the character a little bit to active the camera
				this.vel.x = 0;

				game.data.control_boy = false;
				game.data.control_girl = true;

				me.game.viewport.follow(character.pos, me.game.viewport.AXIS.BOTH); // switching the camera focal position
				
			}
			
			this.updateMovement();
			//////////////// checking collision ///////////////////////////////
			var res = me.game.collide(this);

			puzzle_pushing = false;
			stand = false;
			// boy side
			if (res) {	
				if (res.obj.name == "girl" ){
					me.game.viewport.fadeIn("#000", 500, function () {
						me.audio.stopTrack();
                		me.state.change(me.state.END);
            		});//*
				}
				
				if (res.x != 0 && res.y == 0 && (res.obj.type == puzzleBlocksType)) {
					puzzle_pushing = true;
					this.setVelocity(pushing_speed, boy_jump_speed);
				
				}else if ((res.obj.type == puzzleBlocksType || res.obj.type == platformType || res.obj.name == "droppable")) {
					platformCollision(res, this);
				}// stand on the blocks
				if (res.obj.type == me.game.ENEMY_OBJECT) {// if we collide with an enemy
					enemyCollision(res,this);			
				}// hiting enemies
			}// end checking collision

			if (!puzzle_pushing && !stand )
				this.setVelocity(walking_speed, boy_jump_speed);
				
			if ( !this.flickerTime){
				this.flickerTime = 60;
				this.flickering = false;
			}
			if ( this.flickering ){
				this.flickerTime--;
			}
			
			if (!cooling_time ) {
				this.cooling = true;
				if ( game.data.dashing_time != game.data.givenTime){
					game.data.dashing_time++;
		
				}else if ( game.data.dashing_time == game.data.givenTime){	
					this.cooling = false;
					cooling_time = game.data.dashing_time * 2;
				}
				
			}else if (game.data.dashing_time != game.data.givenTime) {
				cooling_time--;	
			}

			if (this.vel.x != 0 || this.vel.y != 0  || this.dashing  || this.attacking) {
				this.parent();
				return true;
			}
			return false;
		}// end if (control_boy == true)
	}
});

function platformCollision(res, character){
	
	if ( (res.obj.name == "droppable" || res.obj.name == "solid") && res.x  && !character.falling)	{	
		character.vel.x *= -2;
	
	}else if (res.y < 0){ // can not jump through the object
		if ( character.falling || character.jumping ){		
			character.vel.y = 0;
			character.pos.y += 6;
		}		
	}else if ( res.y > 2){ // on top of the object
		character.setVelocity(walking_speed, res.obj.vel.y);
		stand = true;
		character.pos.y = res.obj.pos.y - 82;
	
		if ( res.obj.name == "moving_platform_ver" ){
			if ( res.obj.vel.y < 0)
				character.vel.y = -character.maxVel.y * me.timer.tick;
				
		}else if (res.obj.name == "moving_platform_hor" ){
			if (me.input.isKeyPressed('left')) {
				character.flipX(true);
				character.face = "left";
				character.vel.x -= character.accel.x * me.timer.tick;
						
			}else if (me.input.isKeyPressed('right')) {
				character.face = "right";
				character.flipX(false);
				character.vel.x += character.accel.x * me.timer.tick;
			
			}else{
				character.setVelocity(res.obj.vel.x, res.obj.vel.y);
				if (!res.obj.walkLeft)
						character.vel.x += character.accel.x * me.timer.tick;
				else if (res.obj.walkLeft)
						character.vel.x -= character.accel.x * me.timer.tick;
				character.updateMovement();// keep character move stay with the obj
			}	
		}
	}
}

function enemyCollision (res, character){
	
	if (res.obj.renderable.isFlickering()){ // if emeny is flickering, character bounces
		character.falling = false;
		character.vel.y = -character.maxVel.y * me.timer.tick;
		character.jumping = true;
	
	}else if ( (res.y > 0) && !character.jumping ) {// check if we jumped on it, if yes, bounce (fouce jump)
		 console.log("key: " + res.name);
		 if (res.obj.key != "gear"){
		 	character.falling = false;
		 	character.vel.y = -character.maxVel.y * me.timer.tick;
		 	character.jumping = true;
		 }
		
	}else if ( !character.flickering){
		character.renderable.flicker(character.flickerTime);			
		character.flickering = true;
		game.data.health--;
	}// flicker
	
}


function utility(){
	
	if (me.input.isKeyPressed("music") ) { 
		
		if (mPressedGap ==0){	
			mPressedGap = 3;
			if (musicIsON){
			  musicIsON = 0;
			  me.audio.pauseTrack(); 
			}else{
			  musicIsON = 1;	
	          me.audio.resumeTrack();
			}
			  
	    }else
	   	 	mPressedGap--; 
	     
    }
}

function checkDeath(character){
	if ( character.pos.y + 50 > me.game.currentLevel.rows * me.game.currentLevel.tileheight || game.data.health == 0){
		 // fall and out of scope
 		broken = false;
        me.game.viewport.fadeIn("#000", 500, function () {
        	me.state.change(me.state.PLAY);
        });
 	}
}


