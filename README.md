# CRM Web UI

A modern, responsive Customer Relationship Management (CRM) web application built with Angular 21. This project features a beautiful Material Design-inspired UI with a gradient color scheme and comprehensive dashboard functionality.

## 🚀 Features

- **Modern Dashboard** - Comprehensive analytics and statistics
- **User Authentication** - Secure login with form validation
- **Responsive Design** - Mobile-first approach with collapsible sidebar
- **Beautiful UI** - Gradient theme with blue (#3b81fa) and cyan (#69cad5) colors
- **Type-Safe Forms** - Reactive forms with TypeScript interfaces
- **Route Guards** - Protected routes with authentication
- **Modular Architecture** - Clean, scalable folder structure

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Angular CLI](https://angular.dev/tools/cli) (v21.0.0)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/DaiHoang1114/crm-web-ui.git
cd crm-web-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## 📁 Project Structure

```
src/
 ├─ app/
 │   ├─ core/                    # Singleton services, guards, interceptors
 │   │   ├─ components/          # Core UI components
 │   │   │   ├─ navbar/          # Top navigation bar
 │   │   │   └─ sidebar/         # Side navigation menu
 │   │   ├─ guards/              # Route guards
 │   │   │   └─ auth-guard.ts    # Authentication guard
 │   │   ├─ interfaces/          # Shared interfaces
 │   │   │   └─ login-form.interface.ts
 │   │   └─ layout/              # Layout components
 │   │       └─ main-layout/     # Main app layout with navbar + sidebar
 │   │
 │   ├─ pages/                   # Feature modules (domain-based)
 │   │   ├─ auth/                # Authentication module
 │   │   │   ├─ login/           # Login page
 │   │   │   └─ interfaces/      # Auth-specific interfaces
 │   │   ├─ home/                # Home/landing page
 │   │   └─ dashboard/           # Dashboard with analytics
 │   │
 │   ├─ app.routes.ts            # Application routing
 │   └─ app.component.ts         # Root component
 │
 ├─ styles/                      # Global styles
 │   ├─ _variables.scss          # SCSS variables (colors, spacing, etc.)
 │   └─ styles.scss              # Global styles and resets
 │
 ├─ assets/                      # Static assets
 └─ environments/                # Environment configurations
```

## 🎨 Design System

### Color Palette
- **Primary**: `#3b81fa` (Blue)
- **Secondary**: `#69cad5` (Cyan/Turquoise)
- **Error**: `#f44336`
- **Success**: `#4CAF50`
- **Warning**: `#FF9800`

### Spacing Scale
- XS: `4px`
- SM: `8px`
- MD: `16px`
- LG: `24px`
- XL: `32px`

### Typography
- XS: `12px`
- SM: `14px`
- MD: `16px`
- LG: `18px`
- XL: `20px`

## 🔧 Development

### Code Scaffolding

Generate a new component:
```bash
ng generate component component-name
```

Generate a new service:
```bash
ng generate service service-name
```

Generate a new guard:
```bash
ng generate guard guard-name
```

For a complete list of available schematics:
```bash
ng generate --help
```

### Building

Build the project for production:
```bash
ng build
```

Build artifacts will be stored in the `dist/` directory, optimized for performance.

Build with specific configuration:
```bash
ng build --configuration production
```

### Running Tests

Execute unit tests:
```bash
ng test
```

Execute end-to-end tests:
```bash
ng e2e
```

### Linting

Run linting:
```bash
ng lint
```

## 📱 Key Components

### Authentication
- **Login Page** - Reactive form with validation
- **Auth Guard** - Protects routes requiring authentication
- **Token Management** - LocalStorage-based authentication

### Dashboard
- **Statistics Cards** - Key metrics with trend indicators
- **Charts** - Visual data representation
- **Recent Activity** - Activity feed with user avatars
- **Product Sales** - Sales metrics with progress bars

### Navigation
- **Navbar** - Top navigation with search, notifications, and user menu
- **Sidebar** - Collapsible side navigation with sections
- **Breadcrumbs** - Page navigation tracking

### Layout
- **Responsive** - Mobile-first design with breakpoints
- **Collapsible Sidebar** - Toggle between expanded/collapsed states
- **Sticky Navbar** - Fixed top navigation

## 🔐 Authentication Flow

1. User visits login page
2. Enters credentials (validated with reactive forms)
3. On success, token stored in localStorage
4. Auth guard checks token on protected routes
5. Redirects to login if not authenticated

## 🎯 Routing Structure

```typescript
/login          - Login page (public)
/home           - Home page (protected)
/dashboard      - Dashboard with analytics (protected)
```

## 📦 Key Dependencies

- **Angular** - v21.0.0
- **Angular Material** - Material Design components
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Use reactive forms for form handling
- Use standalone components
- Follow SCSS best practices with variables

## 🐛 Known Issues

- None at the moment

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Dai Hoang** - [DaiHoang1114](https://github.com/DaiHoang1114)

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🔗 Links

- [Repository](https://github.com/DaiHoang1114/crm-web-ui)
- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)

---

**Note**: This is a development project. For production deployment, ensure proper security measures, API integration, and environment configuration.
