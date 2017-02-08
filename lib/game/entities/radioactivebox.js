ig.module('game.entities.radioactivebox')
    .requires(
        'impact.entity'
    )
    .defines(
        function() {
            EntityRadioactivebox = ig.Entity.extend({
                size: {
                    x: 32,
                    y: 32
                },
                name: "Radioactivebox",
                collides: ig.Entity.COLLIDES.NONE,
                type: ig.Entity.TYPE.B,
                checkAgainst: ig.Entity.TYPE.BOTH,
                animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
                zIndex: 0,

                init: function(x, y, settings) {
                    this.parent(x, y, settings);
                    this.addAnim('idle', 1, [5]);
                },
                update: function() {
                    this.parent();
                },
                check: function(other) {
                    if (other instanceof EntityPlayer || other instanceof EntityEnemy) {
                        other.receiveDamage(0.1);
                    }
                    if (other instanceof EntityBoxmovable || other instanceof EntityWall || other instanceof EntityBoxbreakable ||  other instanceof EntityBaseplayer1 ||other instanceof EntityBaseplayer3 || other instanceof EntityFlagblue) {
                        this.kill();
                        GameInfo.randomRadioactiveBox.set(0);
                    }
                    this.parent();
                }
            })
        }
    )