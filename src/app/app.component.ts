import { Component, OnInit } from '@angular/core';
import { GamegridService } from './gamegrid/gamegrid.service';

export type Cell = {
  clicked: boolean;
  boat: boolean;
  number: number;
  hover?: boolean;
};

export type Boat = {
  name: string;
  size: number;
  vertical: boolean;
};
export const boats: Boat[] = [
  {
    name: 'patrol boat',
    size: 2,
    vertical: false,
  },
  {
    name: 'submarine',
    size: 3,
    vertical: false,
  },
  {
    name: 'destroyer',
    size: 3,
    vertical: false,
  },
  {
    name: 'battleship',
    size: 4,
    vertical: false,
  },
  {
    name: 'aircraft carrier',
    size: 5,
    vertical: false,
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  vertical = false;
  playerBoats = boats;
  playerGrid: Cell[] = [];
  computerGrid: Cell[] = [];
  started = false;
  canStart = false;
  boatCounter = 0;

  constructor(private gameService: GamegridService) {}

  ngOnInit(): void {
    this.initialiseGrids();
    this.boatCounter = this.playerBoats.length - 1;
  }

  initialiseGrids() {
    this.playerGrid = [];
    this.computerGrid = [];
    for (let i = 0; i < 100; i++) {
      this.playerGrid.push({
        clicked: false,
        boat: false,
        number: i,
        hover: false,
      });
      this.computerGrid.push({
        clicked: false,
        boat: false,
        number: i,
        hover: false,
      });
    }
  }

  start() {
    this.started = true;
    this.computerGrid = this.gameService.getEnemyFleet();
  }
  reset() {
    this.started = false;
    this.initialiseGrids();
    this.canStart = false;
    this.boatCounter = this.playerBoats.length - 1;
  }

  onCanStart(canStart: boolean) {
    this.canStart = canStart;
  }

  endGame(winner: number) {
    console.log(winner === 1 ? 'Player won' : 'Computer Won');
  }
}
