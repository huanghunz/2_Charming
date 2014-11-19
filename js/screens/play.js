game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() { 
     
     	me.audio.playTrack("theme_song");
        // load a level
        me.levelDirector.loadLevel("level0");
        // loading the image of background
         
        // reset the score
        game.data.score  = 0;
        game.data.blocks = 0;
        game.data.health = 3;
        game.data.control_boy = false;	
        game.data.control_girl = true;
        game.data.dashing_time  = 30;
         
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
         
    },
     
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});