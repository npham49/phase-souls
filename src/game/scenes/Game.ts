import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload() {

    }
    create ()
    {
        const map = this.make.tilemap({ key: 'dungeon' });
        const tileset = map.addTilesetImage('atlas_floor-16x16','tiles');
        const walltileslow = map.addTilesetImage('atlas_walls_low-16x16','walltileslow');
        const walltileshigh = map.addTilesetImage('atlas_walls_high-16x32','walltileshigh');
        map.createLayer('Ground', [(tileset as Phaser.Tilemaps.Tileset), (walltileslow as Phaser.Tilemaps.Tileset), (walltileshigh as Phaser.Tilemaps.Tileset)],0,0)as Phaser.Tilemaps.TilemapLayer;
        const wallsLayer = map.createLayer('Walls', [(tileset as Phaser.Tilemaps.Tileset), (walltileslow as Phaser.Tilemaps.Tileset), (walltileshigh as Phaser.Tilemaps.Tileset)],0,0)as Phaser.Tilemaps.TilemapLayer;
        const textureLayer = map.createLayer('Texture', [(tileset as Phaser.Tilemaps.Tileset), (walltileslow as Phaser.Tilemaps.Tileset), (walltileshigh as Phaser.Tilemaps.Tileset)],0,0)as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true})
        textureLayer.setCollisionByProperty({ collides: true})

        // Debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        console.log(debugGraphics.clear())
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });
        textureLayer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
