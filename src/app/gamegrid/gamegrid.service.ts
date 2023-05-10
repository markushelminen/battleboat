import { Boat, Cell, boats } from '../app.component';

export class GamegridService {
  enemyGrid: Cell[] = [];
  getEnemyFleet() {
    this.enemyGrid = [];
    for (let i = 0; i < 100; i++) {
      this.enemyGrid.push({
        clicked: false,
        boat: false,
        number: i,
      });
    }

    for (let i = 0; i < boats.length; i++) {
      this.placeBoat(boats[boats.length - 1 - i]);
      console.log(i + 1 + '/5');
    }

    return this.enemyGrid;
  }

  placeBoat(boat: Boat) {
    const cellNumber = this.randomCell(boat);
    if (boat.vertical) {
      for (let i = 0; i < boat.size; i++) {
        this.enemyGrid[cellNumber + i * 10].boat = true;
      }
    } else {
      for (let i = 0; i < boat.size; i++) {
        this.enemyGrid[cellNumber + i].boat = true;
      }
    }
  }

  //CHECK FOR DOUBLE BOATS
  randomCell(boat: Boat): number {
    let illegalPlacement = true;
    let randomCellNumber = 0;
    while (illegalPlacement) {
      const vertical = Math.random() > 0.5 ? true : false;
      boat.vertical = vertical;
      randomCellNumber = this.randomIntFromInterval(1, 99);
      console.log(boat.name);
      console.log('random cell: ' + randomCellNumber);
      console.log('vertical: ' + boat.vertical);
      if (boat.vertical) {
        if (randomCellNumber + (boat.size - 1) * 10 < 99) {
          for (let j = 0; j < boat.size; j++) {
            console.log(j);
            console.log(randomCellNumber + j * 10);
            if (this.enemyGrid[randomCellNumber].number + 10 * j < 99) {
              if (this.enemyGrid[randomCellNumber + j * 10].boat === false) {
                illegalPlacement = false;
              }
            }
          }
        }
      } else {
        if (randomCellNumber + boat.size > 99) {
          if (
            (this.enemyGrid[randomCellNumber].number + boat.size) % 10 >
            boat.size
          ) {
            if (this.enemyGrid[randomCellNumber].number % 10 < 10 - boat.size) {
              for (let k = 0; k < boat.size; k++) {
                console.log(k);
                console.log(randomCellNumber + k);
                if (this.enemyGrid[randomCellNumber + k].boat === true) {
                  illegalPlacement = false;
                }
              }
            }
          }
        }
      }
    }
    return randomCellNumber;
  }
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
