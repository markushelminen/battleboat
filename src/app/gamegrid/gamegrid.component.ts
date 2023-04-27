import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Grid, Cell, Boat } from '../app.component';

@Component({
  selector: 'app-gamegrid',
  templateUrl: './gamegrid.component.html',
  styleUrls: ['./gamegrid.component.css'],
})
export class GamegridComponent implements OnInit {
  @Input() grid: Grid = { player: false, grid: [] };
  @Input() boats: Boat[] = [{ name: '', size: 0, vertical: false }];

  boatCounter: number = 0;
  vertical = false;

  constructor() {}

  ngOnInit(): void {
    this.boatCounter = this.boats.length - 1;
  }

  fire(cell: Cell): void {
    cell.clicked = true;
    console.log(cell);
    console.log(this.grid);

    if (cell.boat === true) {
      console.log('SHOT LANDED');
    } else {
      console.log('SHOT MISSED');
    }
  }
  addBoat(cell: Cell): void {
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];

    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        cell.boat = true;
        this.grid.grid[cell.number + 10 * i].boat = true;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        cell.boat = true;
        this.grid.grid[cell.number + i].boat = true;
      }
    }
    this.boatCounter--;
  }

  showBoat(cell: Cell): void {
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];
    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        cell.hover = true;
        this.grid.grid[cell.number + 10 * i].hover = true;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        cell.hover = true;
        this.grid.grid[cell.number + i].hover = true;
      }
    }
  }

  hideBoat(cell: Cell): void {
    if (this.boatCounter === -1) return;
    const boat = this.boats[this.boatCounter];
    for (let i = 0; i < boat.size; i++) {
      if (this.vertical) {
        if (cell.number + 10 * (boat.size - 1) > 99) return;
        this.grid.grid[cell.number + 10 * i].hover = false;
      } else {
        if (cell.number % 10 > 10 - boat.size) return;
        this.grid.grid[cell.number + i].hover = false;
      }
    }
  }
}
