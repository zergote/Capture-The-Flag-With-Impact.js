ig.module('game.entities.projectile1')
    .requires('impact.entity')
    .defines(function() {
        EntityProjectile1 = ig.Entity.extend({
            size: { x: 32, y: 32 },
            offset: { x: 20, y: 20 },
            vel: { x: 900, y: 0 },
            name: "projectile1",
            velocity: 400,
            maxVel: { x: 900, y: 900 },
            collides: ig.Entity.COLLIDES.B,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.BOTH,

            animSheetX: new ig.AnimationSheet('media/explosion.png', 64, 64),
            animSheetY: new ig.AnimationSheet('media/explosion.png', 64, 64),
            init: function(x, y, settings) {
                this.parent(x, y, settings);
                direction = 'up';
                this.anims.xaxis = new ig.Animation(this.animSheetX, 0.2, [0,1,2,3,4,5]);
                this.anims.yaxis = new ig.Animation(this.animSheetY, 0.2, [0,1,2,3,4,5]);
                this.currentAnim = this.anims.xaxis;
                if (this.direction == 'right') {
                    this.vel.x = this.velocity;
                    this.vel.y = 0;
                    this.currentAnim = this.anims.xaxis;
                    this.anims.xaxis.flip.x = false;
                }
                else if (this.direction == 'left') {
                    this.vel.x = -this.velocity;
                    this.vel.y = 0;
                    this.currentAnim = this.anims.xaxis;
                    this.anims.xaxis.flip.x = true;
                }
                else if (this.direction == 'up') {
                    this.vel.x = 0;
                    this.vel.y = -this.velocity;
                    this.currentAnim = this.anims.yaxis;
                    this.anims.yaxis.flip.y = false;
                }
                else if (this.direction == 'down') {
                    this.vel.x = 0;
                    this.vel.y = this.velocity;
                    this.currentAnim = this.anims.yaxis;
                    this.anims.yaxis.flip.y = true;
                }
            },
            update: function() {
                // if(this.pos.x <= 1 || this.pos.x >= 952) {
                //     GameInfo.cooling++;
                //     this.kill();
                // }
                // if(this.pos.y <= 1 || this.pos.y >= 792) {
                //     GameInfo.cooling++;
                //     this.kill();
                // }
                this.parent();
                if (this.vel.x < 0 && this.direction == 'right') { this.anims.xaxis.flip.x = true; }
                else if (this.vel.x > 0 && this.direction == 'left') { this.anims.xaxis.flip.x = false; }
                else if (this.vel.y > 0 && this.direction == 'up') { this.anims.yaxis.flip.y = true; }
                else if (this.vel.y < 0 && this.direction == 'down') { this.anims.yaxis.flip.y = false; }
            },
            check: function(other) {
                if (other instanceof EntityEnemy) {
                    other.receiveDamage(1);
                    this.kill();
                    this.parent();
                }
                if (other.name == "Boxbreakable") {
                    other.kill();
                    this.kill();
                    this.parent();
                }
                if (other.name == "Boxmovable") {
                    this.kill();
                    this.parent();
                }
                if (other.name == "Wall") {
                    this.kill();
                    this.parent();
                }
            },
            handleMovementTrace: function(res) {
                this.parent(res);
                if (res.collision.x || res.collision.y) {
                    this.kill();
                }
            }

        })
    });



