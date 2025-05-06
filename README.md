# Football Lineup Builder

A React application that allows users to create, customize, and download football team lineups with ease.

![Lineup Builder App Screenshot](https://res.cloudinary.com/drxjxycnn/image/upload/v1746520918/lineup_builder_app_lqziao.png)

## Features

- Create customized football lineups with different formations
- Search for teams and players
- Pre-fill lineups with existing team rosters
- Customize formations and player positions
- Download lineups as images
- Responsive design with Tailwind CSS

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/oluwaseyihassan/lineup-builder.git
cd lineup-builder
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

This will start the development server at http://localhost:5173

## Building for Production

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run build
```

## Technologies Used

- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Router](https://reactrouter.com/) - Routing
- [HTML2Canvas](https://html2canvas.hertzen.com/) - For downloading lineups as images
- [Vercel Analytics](https://vercel.com/analytics) - Analytics

## Project Structure

- `src` - Source files
  - `assets/` - SVGs and component assets
  - `src/App.jsx` - Main application component
  - `LineUp.jsx` - Lineup display component
  - `CustomFormation.jsx` - Formation customization
  - `SearchPlayer.jsx` - Player search functionality
  - `SearchTeams.jsx` - Team search functionality
  - `DownloadLineup.jsx` - Download functionality
  - `data.js` - Team and player data
  - `formation.js` - Formation definitions

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/).

## License

MIT


Made with ❤️ by [oluwaseyi](https://loseyi.vercel.app)

