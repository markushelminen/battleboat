import { Component, OnInit } from '@angular/core';

export type Grid = {
  player: boolean,
  grid: Cell[]
}
export type Cell = {
  clicked: boolean,
  boat: boolean,
  number: number,
  hover: boolean
}

export type Boat = {
  name: string,
  size: number,
  vertical: boolean,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  boats: Boat[] =  [
    {
     name: 'patrol boat',
     size: 2,
     vertical: false,
    },
    {
     name: 'submarine',
     size: 3,
     vertical: false
    },
    {
     name: 'destroyer',
     size: 3,
     vertical: false
    },
    {
     name: 'battleship',
     size: 4,
     vertical: false
    },
    {
     name: 'aircraft carrier',
     size: 5,
     vertical: false
    },
  ]
  playerGrid: Grid = {player: true, grid: []};
  computerGrid: Grid = {player: false, grid: []};

  ngOnInit(): void {
    for(let i = 0; i < 100; i++) {
      this.playerGrid.grid.push({clicked: false, boat: false, number: i, hover: false})
      this.computerGrid.grid.push({clicked: false, boat: false, number: i, hover: false})
    }
  }

}
