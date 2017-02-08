ig.module('game.entities.baseplayer3')
    .requires('impact.entity')
    .defines(function() {
        EntityBaseplayer3 = ig.Entity.extend({
            size: { x: 25, y: 25 },
            offset: { x: 5, y: 5 },
            name: "Baseplayer3",
            collides: ig.Entity.COLLIDES.NONE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 1,

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [7]);
            },
            check: function(other) {
                if (other instanceof EntityEnemy) {
                    other.addProjectiles(5);
                }
            }
        })
    });