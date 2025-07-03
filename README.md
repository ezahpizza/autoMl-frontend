# ensoML Frontend

**ensoML**, pronounced en-saw-muhl (“Enso” is a Zen symbol for completeness and harmony) is a beginner-friendly, no-code AutoML platform. This repository contains the frontend for ensoML, providing a modern, intuitive, and responsive interface that empowers users to upload tabular datasets, generate rich EDA reports, and train optimized machine learning models—all without writing a single line of code.

---

## Product Philosophy

ensoML is inspired by the Zen concept of the Enso: a circle of togetherness, completeness, and simplicity. Our mission is to democratize AI by making machine learning accessible, transparent, and harmonious for everyone—no code required. We believe that the true power of data and machine learning should be available to all, not just expert coders. ensoML eliminates technical barriers, enabling users to focus on insights and impact rather than code and configuration.

---

## Features

- **No-Code ML**: Train, evaluate, and export models with zero code.
- **EDA Reports**: Generate interactive, shareable EDA reports.
- **Model Training**: Supports classification and regression with industry-leading ML libraries.
- **Evaluation Plots**: Visualize confusion matrices, ROC curves, feature importances, and more.
- **Per-User Management**: Secure, isolated workspaces for each user.
- **Modern UI/UX**: Clean, drag-and-drop interface with responsive design.
- **Authentication**: Secure sign-in and user management via Clerk.
- **Seamless Backend Integration**: All features powered by a robust FastAPI backend.

---

## Tech Stack

- **React**: Component-based UI library for building interactive interfaces.
- **Vite**: Lightning-fast build tool and development server for modern web projects.
- **TypeScript**: Strongly-typed JavaScript for safer, more maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid, consistent, and responsive styling.
- **Framer Motion**: Powerful animation library for smooth, engaging UI transitions.
- **Clerk**: Plug-and-play authentication and user management.
- **Radix UI**: Accessible, composable UI primitives for building robust components.
- **Axios**: HTTP client for seamless API communication with the backend.

---

## Backend Integration

The frontend communicates with the [ensoML backend](https://github.com/ezahpizza/autoML-backend) via a RESTful API built with FastAPI. All core features—EDA report generation, model training, prediction, and user management—are handled through secure API calls. The backend leverages PyCaret, YData Profiling, and MongoDB for scalable, production-ready machine learning workflows.

**Key integration points:**
- **EDA Reports**: Upload CSVs, trigger report generation, and view/download results.
- **Model Training**: Upload data, select targets, train models, and visualize metrics/plots.
- **Prediction**: Input data for real-time predictions using trained models.
- **User Management**: Clerk authentication ensures secure, per-user data isolation.

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/ensoml-frontend.git
   cd ensoml-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set the backend API URL and Clerk publishable key.

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080).

---

## Folder Structure

```
src/
  components/    # Reusable UI and feature components
  pages/         # Route-based pages (Dashboard, About, Contact, etc.)
  hooks/         # Custom React hooks
  lib/           # API utilities and helpers
  data/          # Static data (testimonials, etc.)
  types/         # TypeScript types and interfaces
  index.css      # Tailwind and custom styles
  App.tsx        # Main app component and routing
```

---

## Philosophy in Practice

ensoML is built for everyone—from students and analysts to product managers and researchers. The platform’s design emphasizes:

- **Simplicity**: Minimal setup, no code required, and a focus on user experience.
- **Transparency**: Clear, explainable ML workflows and results.
- **Empowerment**: Users can focus on insights and decision-making, not technical hurdles.
- **Harmony**: A seamless blend of robust backend automation and a beautiful, intuitive frontend.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Clerk](https://clerk.com/)
- [Radix UI](https://www.radix-ui.com/)
- [ensoML Backend](https://github.com/ezahpizza/autoML-backend)

---
