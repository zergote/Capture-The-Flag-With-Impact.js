ig.module('game.entities.flagspawn')
    .requires('impact.entity')
    .defines(function() {
        EntityFlagspawn = ig.Entity.extend({
            size: { x: 32, y: 32 },
            name: "Flagspawn",
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(128, 28, 230, 0.7)',
        _wmScalable: true,
        
        })
    });