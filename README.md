React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and includes some ESLint rules for development.

Features
1. Responsive Data Table:
The app displays a paginated table of artwork data fetched from an external API (Art Institute API).
The table allows users to select multiple rows across pages based on a custom number entered by the user.
Pagination is handled dynamically, and users can navigate through pages and select rows from multiple pages.
2. Row Selection:
Users can select rows from the table, and the number of selected rows can be adjusted through an overlay panel.
The number of rows to select is inputted by the user via an InputNumber component, with no max limit for selection.
Rows can be selected across multiple pages, ensuring that users can select the exact number of rows they desire, even if it spans multiple pages.
3. Overlay Panel for Row Selection:
The app includes an overlay panel activated by a button (Chevron down icon).
The user can input the number of rows they wish to select, and the app will ensure exactly that number of rows are selected, even if it requires navigating through several pages of data.
After selecting the desired number of rows, the overlay panel closes automatically.
4. Checkbox Selection:
A checkbox is available for each row, allowing users to select multiple rows.
The selected rows are highlighted, and their IDs are stored in the state for further processing.
A button to deselect all rows is also included for convenience.
5. API Integration:
The application integrates with the Art Institute API, fetching artwork data in a paginated manner.
Data includes information like the artwork's title, artist, place of origin, and date range.
The app handles loading states, and any errors during the API request are logged in the console.
6. Styling and Customization:
The app uses the PrimeReact library for components like DataTable, Column, OverlayPanel, and InputNumber.
Custom styling has been applied to buttons inside the checkboxes for a more user-friendly and visually appealing interface.
You can customize the appearance of the table and buttons as needed, and change the background colors or other styles to match your app's theme.
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/react-typescript-vite-app.git
cd react-typescript-vite-app
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open your browser at http://localhost:3000.

Tools and Libraries Used
Vite: A fast build tool and development server.
React: JavaScript library for building user interfaces.
TypeScript: Static typing for JavaScript.
PrimeReact: UI component library, used for building the table and input components.
axios: For making HTTP requests to fetch data from the Art Institute API.
ESLint: Linting tool to maintain code quality.
SWC: A JavaScript/TypeScript compiler used for faster builds.
Expanding the ESLint Configuration
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

js
Copy code
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
Replace tseslint.configs.recommended to tseslint.configs.recommendedTypeChecked or tseslint.configs.strictTypeChecked
Optionally add ...tseslint.configs.stylisticTypeChecked
Install eslint-plugin-react and update the config:
js
Copy code
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
