ig.module(
    'game.entities.evadepoint'
)
    .requires(
    'impact.entity'
    )
    .defines(function () {

        EntityEvadepoint = ig.Entity.extend({
            size: { x: 25, y: 25 },
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.BOTH,
            name: 'EvadePoint',
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
            //animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                //this.addAnim('idle', 1, [12]);
            },
            update: function () {

            },
            check: function (other) {
                if (other instanceof EntityEvadepoint || other instanceof EntityBoxmovable || other instanceof EntityWall || other instanceof EntityBoxbreakable || other instanceof EntityBaseplayer1 || other instanceof EntityBaseplayer3 || other instanceof EntityFlagblue) {
                    this.kill();
                }
                this.parent();
            }
        });

    });