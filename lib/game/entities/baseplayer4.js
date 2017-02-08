ig.module('game.entities.baseplayer4')
    .requires('impact.entity')
    .defines(function() {
        EntityBaseplayer4 = ig.Entity.extend({
            size: { x: 25, y: 25 },
            offset: { x: 5, y: 5 },
            name: "Baseplayer4",
            collides: ig.Entity.COLLIDES.NONE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 0,

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