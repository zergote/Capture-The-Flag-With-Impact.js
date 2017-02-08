ig.module('game.entities.boxbreakable')
    .requires('impact.entity')
    .defines(function() {
        EntityBoxbreakable = ig.Entity.extend({
            size: { x: 32, y: 32 },
            name: "Boxbreakable",
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 1,

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [8]);
            },
            
            check: function(other) {
                if (other.name == "projectile") {
                    //this.kill();
                    this.parent();
                }
            }
        })
    });