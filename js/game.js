/* game namespace */
var game = {
 
	// game data
    data : {
    	control_boy : false,	// if player = boy
        control_girl : true,	// if player = girl
        
        score : 0,				// coins count
        sText : "COINS: ",		// coin text
        sMess: "/50=1HP",
        blocks : 0,				// block count
        health : 3,
        dText:"DASH",
        givenTime: 30,
        dashing_time : 30,
    },
     
    // Run on page load.
    "onload" : function () {
 
 		//me.sys.fps = 90;
        // Initialize the video.
        if (!me.video.init("screen", 800, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);      
        // Load the resources.
        me.loader.preload(game.resources);
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    /* ---
   callback when everything is loaded
   ---  */
     
	"loaded" : function (){
		
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.END,  new game.EndScreen());
	
		//////////////// Entity Pool ///////////////////////
		//me.entityPool.add("NAME OF THE CLASS",	OBJECT BEHAVIOR); 
		
		// characters
 		me.entityPool.add("girl", 	game.girlEntity); 
        me.entityPool.add("boy", 	game.boyEntity);
        me.entityPool.add("weapon",	game.weaponEntity); 
        
        // collectables  
        me.entityPool.add("coins",	game.coinsEntity);
        me.entityPool.add("coins3", game.coins3Entity);
        me.entityPool.add("block", 	game.blockEntity);
    
        // enemies
		me.entityPool.add("enemy_mouse",   game.enemy_hor_entity);
        me.entityPool.add("enemy_octopus", game.enemy_squ_path_entity);
		me.entityPool.add("enemy_gear",    game.enemy_up_down_entity);
		
        // platform entities	
 		me.entityPool.add("stealth_platform",     game.stealth_platformEntity);
 		me.entityPool.add("moving_platform_drop", game.moving_platform_drop_entity);
 		me.entityPool.add("moving_platform_hor",  game.moving_platform_hor_entity); // horizontally moving
 		me.entityPool.add("moving_platform_ver",  game.moving_platform_ver_entity); // vertically moving
 		
		me.entityPool.add("droppable", game.droppableEntity);
		me.entityPool.add("operator", game.operatorEntity);
		
 		// puzzle entities
        me.entityPool.add("station",      game.stationEntity);
 		me.entityPool.add("block_puzzle", game.block_puzzle_entity);
 		me.entityPool.add("block_solid",  game.block_solid_entity);
          
		////////// Button Layout ///////////
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
	
		me.input.bindKey(me.input.KEY.X, "attack");
		me.input.bindKey(me.input.KEY.S, "switchB");
		me.input.bindKey(me.input.KEY.A, "switchG");
		me.input.bindKey(me.input.KEY.Z, "dash");
		me.input.bindKey(me.input.KEY.M, "music");
		
		me.input.bindKey(32, "jump", true); // space
		me.input.bindKey(16, "shift", true); // shift
		
		me.debug.renderHitBox = true;
      
		//start the game with opening screen
   		me.state.change(me.state.MENU);
	}
};