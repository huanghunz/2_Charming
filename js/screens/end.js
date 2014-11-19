/*----------------------
 
    End screen
 
  ----------------------*/
 
game.EndScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
    },
 
    // reset function
    onResetEvent: function() {
    	
    	me.audio.playTrack("end_song");
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("end");
            // font to display the menu items
            this.font = new me.BitmapFont("font", 32);
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("font", 32);
        }
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		 
    },
 
    // some callback for the tween objects

    // update function
    update: function(){
        // enter pressed 
        if (me.input.isKeyPressed('enter')){
            me.state.change(me.state.MENU);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },
 
    // destroy function
    onDestroyEvent: function() {
       
        me.input.unbindKey(me.input.KEY.ENTER);
		// stop the current audio track
		me.audio.stopTrack();
 
    }
});