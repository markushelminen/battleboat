# Battleboat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TODO

- Bot only check boats through one direction. Need to add somekind of memory of the first landed shot and check the other side when missing. Also could have a max number of shots landed thing for the max length of a boat. Could be problematic with neighboring boats.
- If I have time I should track boats being destroyed
- Is there a possibility to get one square to a place which cannot be shot by the bot?
- Headings are in the wrong place
- When the bot wins it doesn't stop
- Orientation counter doesn't reset like it should.
  Refactor shooting to do a max 3 misses approach when hitting a boat
