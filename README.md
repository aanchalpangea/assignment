# React Template

A modern React template built with Vite, TypeScript, Redux Toolkit, Material UI, and Tailwind CSS.

## Features

- ⚡️ Vite for fast development and building
- 🎯 TypeScript for type safety
- 📦 Redux Toolkit for state management
- 🎨 Material UI for components
- 💅 Tailwind CSS for styling
- 🚦 React Router for routing
- 🔒 Private routes implementation
- 📝 Todo example implementation

## Project Structure

```
src/
├── api/
│   ├── API.ts
│   └── Endpoints.json
├── components/
│   └── Todo/
│       ├── Todo.tsx
│       └── TodoCRUD.tsx
├── pages/
│   └── TodosPage.tsx
├── redux/
│   ├── reducers/
│   │   └── todoReducer.ts
│   ├── rootReducer.ts
│   └── store.ts
├── utility/
│   └── storageUtil.ts
├── privateRoutes.tsx
└── routesPaths.ts
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   VITE_APP_NAME=React Template
   VITE_APP_VERSION=1.0.0
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Dependencies

- React 18
- React Router DOM 6
- Redux Toolkit
- Material UI
- Tailwind CSS
- Axios
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
