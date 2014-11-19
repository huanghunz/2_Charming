//game resources
game.resources = [

    // name = object-name & object-source-image of Tiled Map
    {name: "station", type: "image", src: "data/img/sprite/station.png"},
    {name: "floor", type: "image", src: "data/img/sprite/floor.png"}, 
    {name: "level_floor", type: "image", src: "data/img/sprite/level_floor.png"},
    {name: "level_floor_weak", type: "image", src: "data/img/sprite/level_floor_weak.png"},
    {name: "level_floor_blue", type: "image", src: "data/img/sprite/level_floor_blue.png"},
    
    {name: "clouds", type: "image", src: "data/img/map/clouds.png"},
    {name: "tutorial_pce", type: "image", src: "data/img/map/tutorial_pce.png"},
    {name: "tutorial_pcs", type: "image", src: "data/img/map/tutorial_pcs.png"},
    {name: "cloud_heart", type: "image", src: "data/img/map/cloud_heart.png"},
    // the main player spritesheet
    
    // characters
    {name: "boy", type:"image", src: "data/img/sprite/boy.png"},
    {name: "girl", type:"image", src: "data/img/sprite/girl.png"},
    // collectables
    {name: "coins", type:"image", src: "data/img/sprite/coins.png"},
    {name: "coins3", type: "image", src: "data/img/sprite/coins3.png"},
    
    {name: "block", type: "image", src: "data/img/sprite/block.png"},
    {name: "block_blue", type: "image", src: "data/img/sprite/block_blue.png"},
    {name: "block_light_blue", type: "image", src: "data/img/sprite/block_light_blue.png"},
    {name: "block_grey", type: "image", src: "data/img/sprite/block_grey.png"},
    {name: "block_white", type: "image", src: "data/img/sprite/block_white.png"},
 
    // enemies
    {name: "enemy_gear", type: "image", src: "data/img/sprite/gear.png"},  
    {name: "enemy_mouse", type:"image", src: "data/img/sprite/mouse.png"},
    {name: "enemy_octopus", type: "image", src: "data/img/sprite/octopus.png"},
   
    // puzzleBlocks
    {name: "block_puzzle", type: "image", src: "data/img/sprite/puzzleBlocks.png"},
    {name: "block_solid", type: "image", src: "data/img/sprite/puzzleBlocks.png"},
    
    // platforms 
    {name: "stealth_platform", type: "image", src: "data/img/sprite/stealth_platform.png"},
    {name: "moving_platform_drop", type: "image", src: "data/img/sprite/moving_platform_drop.png"},
    {name: "moving_platform_hor", type: "image", src: "data/img/sprite/moving_platform_hor.png"},
    {name: "moving_platform_ver", type: "image", src: "data/img/sprite/moving_platform_ver.png"},
   
    // other entities
    {name: "weapon", type: "image", src: "data/img/sprite/weapon.png"}, 
    {name: "switch_pcs", type: "image", src: "data/img/sprite/switch_pcs.png"},
    {name: "switch_pce", type: "image", src: "data/img/sprite/switch_pce.png"},
   
    // HUD
    {name: "font", type: "image", src: "data/img/font/32x32_font.png"},
    {name: "heart", type: "image", src: "data/img/sprite/heart.png"},
    {name: "operator", type: "image", src: "data/img/sprite/operator.png"},
    {name: "droppable", type: "image", src: "data/img/sprite/droppable.png"},
   
    {name: "dashBar", type: "image", src: "data/img/sprite/dashBar.png"}, 
    {name: "dashEnd", type: "image", src: "data/img/sprite/dashEnd.png"}, 
    {name: "title", type: "image", src: "data/img/sprite/title.png"},
    {name: "end", type: "image", src: "data/img/sprite/end.png"},
   
   	// Audio 
    {name: "theme_song", type: "audio", src: "data/bgm/", channel : 1},
    {name: "open_song", type: "audio", src: "data/bgm/", channel : 1},
    {name: "end_song", type: "audio", src: "data/bgm/", channel : 1},
     
    // background
    {name: "level0", type: "tmx", src: "data/map/level0.tmx"}
];