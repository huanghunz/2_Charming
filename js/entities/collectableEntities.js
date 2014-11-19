////////////// Coins entities /////////////////////////////////////
// +1 Coin
game.coinsEntity = me.CollectableEntity.extend({
	
    init: function(x, y, settings) { /*constructor*/
        this.parent(x, y, settings);
    },
 
    onCollision: function() {
 		game.data.score += 1;
        // make sure it cannot be collected "again"
        this.collidable = false;
        me.game.remove(this);
    }
	
});

// +3 Coins
game.coins3Entity = me.CollectableEntity.extend({
	
    init: function(x, y, settings) { /*constructor*/
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    onCollision: function() {
 		game.data.score += 3;
        // make sure it cannot be collected "again"
        this.collidable = false;
        me.game.remove(this);
    }
	
});

////////////// Block entities /////////////////////////////////////

// +1 Block 
game.blockEntity = me.CollectableEntity.extend({
	
    init: function(x, y, settings) { /*constructor*/
        // call the parent constructor
        this.parent(x, y, settings);
    },
    
    onCollision: function() {
 		game.data.blocks += 1;
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
});
