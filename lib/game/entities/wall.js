ig.module(
    'game.entities.wall'
)
    .requires('impact.entity')
    .defines(function() {
        EntityWall = ig.Entity.extend({
            size: { x: 32, y: 32 },
            name: "Wall",
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.BOTH,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 1,

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [9]);
            }
        })
    }
    )