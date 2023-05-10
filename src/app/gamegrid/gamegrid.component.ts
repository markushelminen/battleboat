import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Grid, Cell, Boat } from '../app.component';
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

  boatCounter: number = 0;
  computerFiredShots: number[] = [];
  constructor(private gameService: GamegridService) {}

  ngOnInit(): void {
    this.boatCounter = this.boats.length - 1;
  }

  fire(cell: Cell): void {
    if (!this.started) return;
    cell.clicked = true;
    console.log(cell);

    if (cell.boat === true) {
      console.log('SHOT LANDED');
    } else {
      console.log('SHOT MISSED');
    }

    this.computerFire();
  }

  computerFire() {
    const firedCellNumber = this.gameService.randomIntFromInterval(0, 99);
    if (this.playerGrid[firedCellNumber].boat === true) {
      console.log('SHOT LANDED');
    } else {
      console.log('SHOT MISSED');
    }
    this.computerFiredShots.push(firedCellNumber);
  }
  addBoat(cell: Cell): void {
    if (this.started) return;
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];

    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        cell.boat = true;
        this.playerGrid[cell.number + 10 * i].boat = true;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        cell.boat = true;
        this.playerGrid[cell.number + i].boat = true;
      }
    }
    this.boatCounter--;
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
}
