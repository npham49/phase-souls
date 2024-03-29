import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { Game } from './game/scenes/Game';

function App() {
    const currentScene = (scene_instance: Phaser.Scene) => {
        console.log('Current Scene:', scene_instance);
    }

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as Game;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
            </div>
        </div>
    )
}

export default App
