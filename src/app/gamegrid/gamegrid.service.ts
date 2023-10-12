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
      console.log(boats[boats.length - 1 - i].name);
      this.placeBoat(boats[boats.length - 1 - i]);
    }

    return this.enemyGrid;
  }

  placeBoat(boat: Boat) {
    boat.vertical = Math.random() > 0.5 ? true : false;
    console.log(boat.vertical);
    const cellNumber = this.randomCell(boat);
    console.log(cellNumber);

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
  randomCell(boat: Boat): number {
    let illegalPlacement = true;
    let randomCellNumber = 0;
    while (illegalPlacement) {
      randomCellNumber = this.randomIntFromInterval(1, 99);
      if (boat.vertical) {
        if (randomCellNumber + (boat.size - 1) * 10 < 99) {
          for (let j = 0; j < boat.size; j++) {
            if (randomCellNumber + 10 * j <= 99) {
              if (this.enemyGrid[randomCellNumber + j * 10].boat === false) {
                illegalPlacement = false;
              } else {
                illegalPlacement = true;
                break;
              }
            }
            console.log(j);
          }
        }
      } else {
        if (randomCellNumber + boat.size - 1 <= 99) {
          if ((randomCellNumber + boat.size - 1) % 10 > boat.size) {
            // if (randomCellNumber % 10 < 10 - boat.size) {
            for (let k = 0; k < boat.size; k++) {
              if (this.enemyGrid[randomCellNumber + k].boat === false) {
                illegalPlacement = false;
              } else {
                illegalPlacement = true;
                break;
              }
              console.log(k);
              // }
            }
          }
        }
      }
    }
    return randomCellNumber;
  }

  computerCellToShoot(
    grid: Cell[],
    shotsLanded: number,
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
  ) {
    console.log(
      `shots landed: ${shotsLanded}, last shot shell: ${lastShotCell}, first boat cell shot: ${firstBoatCell}, orientation counter: ${orientationCounter}`
    );
    let cellToShoot: number = 0;
    if (shotsLanded !== 0 || orientationCounter !== 0) {
      [cellToShoot, orientationCounter] = this.getNextOrientationCell(
        grid,
        lastShotCell,
        firstBoatCell,
        orientationCounter
      );
    } else {
      orientationCounter = 0;
      cellToShoot = this.randomCellToShoot(grid);
    }
    console.log(cellToShoot);
    return [cellToShoot, orientationCounter];
  }

  randomCellToShoot(grid: Cell[]): number {
    let cell: number = NaN;
    let shotValid = false;
    while (!shotValid) {
      cell = this.randomIntFromInterval(0, 99);
      // Computer shoots only everyother cell to be efficient
      if (cell % 2 === 0) cell + 1;
      if (grid[cell].clicked === false) {
        shotValid = true;
      }
    }
    console.log('random cell');

    return cell;
  }

  getNextOrientationCell(
    grid: Cell[],
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
  ): number[] {
    let cell: number = NaN;
    switch (orientationCounter) {
      case 1:
        cell = lastShotCell - 10;
        break;
      case 2:
        cell = lastShotCell + 10;
        break;
      case 3:
        cell = lastShotCell - 1;
        break;
      case 4:
        cell = lastShotCell + 1;
        break;

      default:
        orientationCounter = 0;
        return [this.randomCellToShoot(grid), orientationCounter];
    }
    if (grid[cell] && grid[cell].clicked === false) {
      return [cell, orientationCounter];
    }
    orientationCounter++;
    return this.getNextOrientationCell(
      grid,
      lastShotCell,
      firstBoatCell,
      orientationCounter
    );
  }

  shootRestOfTheBoat(
    grid: Cell[],
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
  ): number {
    let offset = this.getOffset(orientationCounter);
    if (
      grid[lastShotCell + offset] &&
      grid[lastShotCell + offset].clicked == false
    ) {
      return lastShotCell + offset;
    } else if (grid[lastShotCell + offset].clicked == true) {
      return this.shootRestOfTheBoat(
        grid,
        lastShotCell + offset,
        firstBoatCell,
        orientationCounter
      );
    } else {
      return 69;
    }
  }

  getOffset(orientationCounter: number) {
    switch (orientationCounter) {
      case 1:
        return 10;
      case 2:
        return -10;
      case 3:
        return 1;
      case 4:
        return -1;
      default:
        return NaN;
    }
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
