import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell, Boat } from '../app.component';
import { GamegridService } from './gamegrid.service';

@Component({
  selector: 'app-gamegrid',
  templateUrl: './gamegrid.component.html',
  styleUrls: ['./gamegrid.component.css'],
})
export class GamegridComponent implements OnInit {
  @Input() playerGrid: Cell[] = [];
  @Input() computerGrid: Cell[] = [];
  @Input() boats: Boat[] = [{ name: '', size: 0, vertical: false }];
  @Input() vertical: boolean = false;
  @Input() started: boolean = false;
  @Input() boatCounter: number = 0;
  @Output() canStart: EventEmitter<boolean> = new EventEmitter();
  @Output() winnner: EventEmitter<number> = new EventEmitter();
  computerFiredShots: number[] = [];
  lastShotLandedCount: number = 0;
  lastShotCell: number = -1;
  orientationCounter: number = 0;

  constructor(private gameService: GamegridService) {}

  ngOnInit(): void {}

  fire(cell: Cell): void {
    if (!this.started) return;
    if (cell.clicked) return;
    cell.clicked = true;

    if (cell.boat === true) {
    } else {
    }
    this.computerFire();
    this.checkForWin();
  }

  computerFire() {
    let firedCellNumber = this.gameService.computerCellToShoot(
      this.playerGrid,
      this.lastShotLandedCount,
      this.lastShotCell,
      this.orientationCounter
    );
    console.log('Number: ' + firedCellNumber);

    this.playerGrid[firedCellNumber].clicked = true;
    if (this.playerGrid[firedCellNumber].boat === true) {
      this.lastShotLandedCount++;
      if (this.orientationCounter === 0) {
        this.orientationCounter = 1;
      }
      this.lastShotCell = firedCellNumber;
    } else {
      this.lastShotLandedCount = 0;
      if (this.orientationCounter >= 1 && this.orientationCounter <= 4) {
        this.orientationCounter++;
      } else {
        this.orientationCounter = 0;
      }
    }
    this.computerFiredShots.push(firedCellNumber);
  }
  addBoat(cell: Cell): void {
    if (this.started) return;
    if (this.boatCounter === -1) return;
    if (cell.boat) return;
    const boat = this.boats[this.boatCounter];
    const boatIndexes: number[] = [];

    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        if (this.playerGrid[cell.number + 10 * i].boat) return;
        boatIndexes.push(cell.number + 10 * i);
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        if (this.playerGrid[cell.number + i].boat) return;
        boatIndexes.push(cell.number + i);
      }
    }
    this.addBoatsToGrid(boatIndexes);
    this.boatCounter--;
    if (this.boatCounter === -1) this.canStart.emit(true);
  }

  addBoatsToGrid(boatIndexes: number[]) {
    for (let i of boatIndexes) {
      this.playerGrid[i].boat = true;
    }
  }

  showBoat(cell: Cell): void {
    if (this.started) return;
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];
    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        cell.hover = true;
        this.playerGrid[cell.number + 10 * i].hover = true;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        cell.hover = true;
        this.playerGrid[cell.number + i].hover = true;
      }
    }
  }

  hideBoat(cell: Cell): void {
    if (this.started) return;
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];
    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        this.playerGrid[cell.number + 10 * i].hover = false;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        this.playerGrid[cell.number + i].hover = false;
      }
    }
  }

  checkForWin() {
    let playerCounter = 0;
    let computerCounter = 0;
    for (let cell of this.playerGrid) {
      if (cell.clicked && cell.boat) {
        playerCounter++;
      }
    }
    for (let cell of this.computerGrid) {
      if (cell.clicked && cell.boat) {
        computerCounter++;
      }
    }
    if (playerCounter === 17) {
      this.winnner.emit(2);
    }
    if (computerCounter === 17) {
      this.winnner.emit(1);
    }
  }
}
