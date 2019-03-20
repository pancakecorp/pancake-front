import { Application, Sprite, loader } from "pixi.js";

const app = new Application({
  width: 512,
  height: 512,
});

document.body.appendChild(app.view);

loader
  .add("images/treasureHunter.json")
  .load(() => {
    const tileSet = loader.resources["images/treasureHunter.json"].textures;

    const dungeon = new Sprite(tileSet['dungeon.png']);
    app.stage.addChild(dungeon);

    const explorer = new Sprite(tileSet['explorer.png']);
    explorer.position.set(
      48,
      app.stage.height / 2 - explorer.height / 2,
    );
    app.stage.addChild(explorer);

    const treasure = new Sprite(tileSet['treasure.png']);
    treasure.position.set(
      app.stage.width - 48 - treasure.width,
      app.stage.height / 2 - treasure.height / 2,
    );
    app.stage.addChild(treasure);

    const blobTexture = tileSet['blob.png'];
    const blobLowerBound = 48;
    const blobRange = app.stage.height - blobTexture.height - 96;
    const blobHigherBound = blobLowerBound + blobRange;
    const numberOfBlobs = 6;
    const blobs = [];
    for (let count = 0; count < numberOfBlobs; count++) {
      const blob = new Sprite(blobTexture);
      blob.position.set(
        128 + ((app.stage.width - 256) / (numberOfBlobs - 1)) * count,
        blobLowerBound + Math.floor(Math.random() * blobRange),
      );
      blob.vY = Math.random() >= 0.5 ? 1 : -1;
      
      app.stage.addChild(blob);
      blobs.push(blob);
    }

    app.ticker.add((delta) => {
      for (const blob of blobs) {
        blob.y += blob.vY;
        
        if (blob.y > blobHigherBound) {
          blob.y = blobHigherBound - (blob.y - blobHigherBound);
          blob.vY = -1;
        }

        if (blob.y < blobLowerBound) {
          blob.y = blobLowerBound + (blobLowerBound - blob.y);
          blob.vY = 1;
        }
      }
    });
  });

