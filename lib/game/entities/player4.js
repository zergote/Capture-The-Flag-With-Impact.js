ig.module('game.entities.player4')

    .requires(
    'impact.entity'
    )
    .defines(function() {

        EntityPlayer4 = ig.Entity.extend({

            collides: ig.Entity.COLLIDES.ACTIVE,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,

            health: 3,
            maxHealth: 3,
            size: { x: 25, y: 25 },
            offset: {x:8, y:8},

            maxVel: { x: 900, y: 900 },
            name: "Player1",
            velocity: 300,
            zIndex: 9,
            lastpressed: 'up',
            flag: false,
            idleposition: 0,
            cooling: 1,
            projectiles: 5,
            maxProjectiles: 5,

            animSheet: new ig.AnimationSheet('media/Player_d.png', 32, 32),
            init: function(x, y, settings) {
                this.parent(x, y, settings);
                // Add the animations
                this.addAnim('idle', 1, [0]);
                this.addAnim('down', 1, [1]);
                this.addAnim('left', 1, [3]);
                this.addAnim('right', 1, [2]);
                this.addAnim('up', 1, [0]);
            },
            restoreHealth: function() {
                this.health = 3;
            },
            update: function() {
                //player movement
                // if (ig.input.state('up')) {
                //     this.vel.y = -this.velocity;
                //     this.currentAnim = this.anims.up;
                //     this.lastpressed = 'up';
                //     this.idleposition = 0;
                //     this.addAnim('idle', 1, [this.idleposition]);
                // }
                // else if (ig.input.state('down')) {
                //     this.vel.y = this.velocity;
                //     this.currentAnim = this.anims.down;
                //     this.lastpressed = 'down';
                //     this.idleposition = 1;
                //     this.addAnim('idle', 1, [this.idleposition]);
                // }
                // else if (ig.input.state('left')) {
                //     this.vel.x = -this.velocity;
                //     this.currentAnim = this.anims.left;
                //     this.lastpressed = 'left';
                //     this.idleposition = 3;
                //     this.addAnim('idle', 1, [this.idleposition]);
                // }
                // else if (ig.input.state('right')) {
                //     this.vel.x = this.velocity;
                //     this.currentAnim = this.anims.right;
                //     this.lastpressed = 'right';
                //     this.idleposition = 2;
                //     this.addAnim('idle', 1, [this.idleposition]);
                // }
                // else {
                //     this.vel.y = 0;
                //     this.vel.x = 0;
                //     this.currentAnim = this.anims.idle;
                // }
                // if (ig.input.pressed('attack')) {
                //     if (this.cooling > 0 && this.projectiles > 0) {
                //         ig.game.spawnEntity('EntityProjectile', this.pos.x + 13, this.pos.y + 13, { direction: this.lastpressed });
                //         this.cooling--;
                //         this.substractProjectile();
                //     }
                // }
                if (this.flag == true) {
                    this.addAnim('idle', 1, [this.idleposition + 4]);
                    this.addAnim('down', 1, [this.idleposition + 4]);
                    this.addAnim('left', 1, [this.idleposition + 4]);
                    this.addAnim('right', 1, [this.idleposition + 4]);
                    this.addAnim('up', 1, [this.idleposition + 4]);
                }
                else {
                    this.addAnim('idle', 1, [this.idleposition]);
                    this.addAnim('down', 1, [this.idleposition]);
                    this.addAnim('left', 1, [this.idleposition]);
                    this.addAnim('right', 1, [this.idleposition]);
                    this.addAnim('up', 1, [this.idleposition]);
                }
                this.parent();
            },
            draw: function() {
                // border/background health
                ig.system.context.fillStyle = "rgb(0,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x-9) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 18) * ig.system.scale, 
                    this.size.x+10 * ig.system.scale, 4 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();
                // health bar
                ig.system.context.fillStyle = "rgb(255,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x -8) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 17) * ig.system.scale,
                    ((this.size.x + 8) * (this.health / this.maxHealth)) * ig.system.scale, 2 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();

                //Con dos barras da no se ve la imagen en el editor de niveles.
                // border/background projectile
                ig.system.context.fillStyle = "rgb(0,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x-9) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 15) * ig.system.scale,
                    this.size.x +10 * ig.system.scale, 4 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();

                // projectile bar
                ig.system.context.fillStyle = "rgb(0,255,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x -8) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 14) * ig.system.scale,
                    ((this.size.x +8) * (this.projectiles / this.maxProjectiles)) * ig.system.scale, 2 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();

                this.parent();
            },
            addProjectiles: function(numbers_Projectiles) {
                //add one projectile when you find one
                if (this.projectiles < 5) {
                    if ((this.projectiles + numbers_Projectiles) >= 5) {
                        this.projectiles = 5;
                    }
                    else {
                        this.projectiles += numbers_Projectiles;
                    }
                }
            },
            substractProjectile: function() {
                //add one projectile when you find one
                this.projectiles -= 1;
            },

        });
    });
