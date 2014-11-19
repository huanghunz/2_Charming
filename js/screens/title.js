/*----------------------
 
    A title screen
 
  ----------------------*/
 
game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
    },
 

    onResetEvent: function() {
    	
    	me.audio.playTrack("open_song");
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title");
            // font to display the menu items
            this.font = new me.BitmapFont("font", 32);
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("font", 32);
        }
   
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
 
    },
 
    update: function(){
        // enter pressed 
        if (me.input.isKeyPressed('enter')){
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    draw: function(context) {
        context.drawImage(this.title, 0, 0);       
    },
    
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
	
		me.audio.stopTrack();
    }
});