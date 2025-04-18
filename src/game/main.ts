import { Game } from '../lunas';

const game = new Game();

const update = (dt: number): void => {
  console.log(dt);
};

const draw = (): void => {
  console.log('drawing');
};

game.addCallback('update', update);
game.addCallback('draw', draw);
