## Features

1. Supports a table view of the data, which displays different properties for each player row by row. 
2. Filter players based on name (see UtilityBar.jsx). 
3. Add players to display by clicking "Draft more Players". Drafts players in group of 5 if cleared.
4. Clear button to clear the dashboard.
5. Supports a board/gallery view that displays a headshot of the player along with their different properties. Players grouped into lists by team name


### Images

(./boardview.png)


## Video Demo

https://drive.google.com/file/d/1qn4gB0icMbY7iEmmVDf7ye5g2fmVKT1q/view?usp=sharing

## Components
Descriptions of the components and structure

### App.js
Main component that houses the TopBar, UtilityBar, and different views. All logic for fetching player data, filtering data, and searching is done here. 

Uses deep linking to switch between views using routes.


### TopBar.jsx
TopBar component using MaterialUI. Contains two buttons to switch between views

### UtilityBar.jsx
Utility bar which houses a text field to filter players based on their name. Button to draft players and add to display. Clear button to clear the displayed data.

### TableView.jsx
Displays player data in a table.

### BoardView.jsx
Displays player data in a Trello Board style (grouped by team). Has headshots for most players. Scrollable component to hold more player cards/lists

### Resources

API for NBA headshots: https://nba-players.herokuapp.com/

NBA player dataset: https://www.kaggle.com/justinas/nba-players-data

