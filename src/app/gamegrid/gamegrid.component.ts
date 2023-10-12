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
  @Output() canStart: EventEmitter<boolean> = new EventEmitter();
  @Output() winnner: EventEmitter<number> = new EventEmitter();
  boatCounter = -1;
  computerFiredShots: number[] = [];
  lastShotLandedCount = 0;
  lastShotCell = -1;
  firstBoatCell = -1;
  orientationCounter = 0;
  counter = 4;

  constructor(private gameService: GamegridService) {}

  ngOnInit(): void {
    this.boatCounter = this.boats.length - 1;
  }

  fire(cell: Cell): void {
    if (!this.started) return;
    if (cell.clicked) return;
    cell.clicked = true;

    // if (cell.boat === true) {
    // } else {
    // }
    this.computerFire();
    this.checkForWin();
  }

  computerFire() {
    if (this.orientationCounter === 0 && this.lastShotLandedCount === 0) {
      this.firstBoatCell = -1;
    }
    let firedCellNumber = -1;
    [firedCellNumber, this.orientationCounter] =
      this.gameService.computerCellToShoot(
        this.playerGrid,
        this.lastShotLandedCount,
        this.lastShotCell,
        this.firstBoatCell,
        this.orientationCounter
      );

    console.log('Number: ' + firedCellNumber);

    this.playerGrid[firedCellNumber].clicked = true;
    if (this.playerGrid[firedCellNumber].boat === true) {
      if (this.orientationCounter === 0) {
        this.orientationCounter = 1;
        this.firstBoatCell = firedCellNumber;
      }
      this.lastShotLandedCount++;
      this.lastShotCell = firedCellNumber;
    } else {
      this.lastShotLandedCount = 0;
    }
    this.computerFiredShots.push(firedCellNumber);
  }
  addBoat(cell: Cell): void {
    console.log(this.started);
    console.log(this.boatCounter);
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

  reset() {
    this.boatCounter = this.boats.length - 1;
  }
}
