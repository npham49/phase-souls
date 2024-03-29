import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('tiles', 'tiles/atlas_floor-16x16.png');
        this.load.image('walltileshigh', 'tiles/atlas_walls_high-16x32.png');
        this.load.image('walltileslow', 'tiles/atlas_walls_low-16x16.png');
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
    }
    create () {
        this.scene.start('Game');
    }
}
