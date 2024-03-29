import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    // width: 1024,
    // height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {x:0, y: 0 }
        }
    },
    scene: [
        Preloader,
        MainGame,
        GameOver
    ],
    scale: {
        zoom: 2
    },
    parent: 'game-container',
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
