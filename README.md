# React Starter Template

## **Overview**
The **React Starter Template** is designed to provide a standardized foundation for building scalable and maintainable front-end applications. It follows best practices and ensures consistency across projects with **Vite + TypeScript + TailwindCSS**. This template is pre-configured with essential development tools and Docker support to streamline development.

---

## **Creating a New Project from the Template**

### **1. Use this Template**  
- Click on the **"Use this template"** button on the GitHub repository page.

### **2. Create a New Repository**  
- Name your new repository.
- Optionally, add a description.
- Choose to make the repository public or private.
- Click on **"Create repository from template."**

### **3. Clone Your New Repository**  
```sh
git clone https://github.com/PangeaTech/your-new-repo-name.git
cd your-new-repo-name
```

### **4. Rename the Project**  
Update the project name and description details in `package.json` to match your new repository name and relevant details.

---

## **Installation Guide**  

### **1. Install Dependencies**  
Using npm:  
```sh
npm install
```
Using yarn:  
```sh
yarn install
```

### **2. Start the Development Server**  
Using npm:  
```sh
npm run dev
```
Using yarn:  
```sh
yarn dev
```

### **3. Build the Application for Production**  
```sh
npm run build
```

### **4. Run the Application with Docker**  
```sh
docker-compose up --build
```

### **5. Access the Application**  
- Open **http://localhost:5173/** (default Vite port)  

---

## **Project File Structure**  
```bash
src/
  ├── api/
  │   ├── API.ts             # Contains exported API methods (e.g., getAPI, postAPI)
  │   ├── EndPoints.json     # JSON file with all API endpoints
  │
  ├── components/
  │   ├── {componentName}/   # Folder named after the component
  │   │   ├── {componentName}.tsx       # Component file with JSX and logic
  │   │   ├── {componentName}CRUD.tsx   # API calls related to the component
  │
  ├── pages/
  │   ├── {pageName}.tsx     # Page component integrating required components
  │
  ├── redux/
  │   ├── store.ts           # Sets up the Redux store
  │   ├── rootReducer.ts     # Combines all reducers
  │   ├── reducers/
  │   │   ├── {reducerName}.ts  # Reducer definition and implementation
  │   │   │   ├── Interface used for the reducer
  │   │   │   ├── Initial state
  │   │   │   ├── Actions names available (JSON mapper)
  │   │   │   ├── Reducer function
  │   │   │   ├── Actions (Reducer and action name mapper)
  │
  ├── utility/
  │   ├── {utilityName}Util.ts   # Common utility functions used across the app
  │
  ├── routes/
  │   ├── privateRoutes.tsx      # Collection of all private routes
  │   ├── routesPaths.ts         # Mapper for route URLs in the frontend
  │
  ├── public/assets/             # Contains all media files
```

---

## **Guidelines for Media Files**  
- Organize media files into subfolders within `public/assets/`.  
  - `images/` – Store all image assets.  
  - `icons/` – Keep SVG or other icon assets separate.  
  - `videos/` – Store any video assets used in the app.  
  - `fonts/` – Include custom fonts if necessary.  
- Use descriptive file names (e.g., `logo-dark.png` instead of `logo.png`).  
- Optimize images for performance (consider using WebP format where possible).  

---

## **Interface & Naming Conventions**  
- **Interface Definitions:**  
  - Prefix all interface names with `I`.  
  - Common interfaces should be written in a shared file and exported.  
  - All component props should have an interface named `I{ComponentName}`, defined at the start of the component file.  

- **Component Naming Structure:**  
  - `{componentName}/` (folder)  
  - `{componentName}.tsx` (component file)  
  - `{componentName}CRUD.tsx` (CRUD file)  
  - `{componentName}Model.tsx` (common model file with shared interfaces)  

---

## **Contributing**
Contributions are welcome! If you would like to improve this template, please fork the repository, make your changes, and submit a pull request.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

This README provides a structured and well-documented guide for your GitHub repository. 🚀 Let me know if you'd like any changes!

