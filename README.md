# Pedidos360 - Frontend 🛒

Frontend del sistema **Pedidos360**, hecho en **Angular** con login mediante **Microsoft Entra ID (MSAL)**. Este es el encargo de la Evaluación Parcial N°1 de **DSY1107 - Desarrollo Cloud Native I**, Duoc UC.

## ¿De qué se trata?

Básicamente es un sistema pa' gestionar pedidos donde implementamos el flujo completo de login con un IDaaS (Microsoft Entra ID) y consumimos un backend que valida el token JWT antes de dejarte hacer cualquier cosa. La idea del ramo es entender cómo se separa la autenticación de la aplicación misma, en vez de hacer un login casero con usuario/contraseña en la BD.

## Con qué está hecho

- **Angular** (standalone components + signals, nada de NgModules)
- **MSAL** (`@azure/msal-browser` y `@azure/msal-angular`) para el login con Microsoft
- **TypeScript**
- **Reactive Forms** para el formulario de pedidos
- **HttpClient** con interceptor que pega el token solo, sin que tengamos que andar pasándolo a mano en cada petición

## Cómo funciona el login (por si el profe pregunta)

1. Le das a "Iniciar sesión" y te manda pa'l login de Microsoft (`loginRedirect`).
2. Eliges tu cuenta institucional y Entra ID te devuelve un token JWT con el scope `OT.Create`.
3. El interceptor de MSAL agarra ese token y lo pega automáticamente como `Authorization: Bearer ...` en cada petición al backend (`localhost:8080`).
4. Las rutas `/pedidos` y `/pedidos/nuevo` están protegidas con `MsalGuard`, o sea si no has iniciado sesión ni cagando entras, te manda directo al login.

## Qué se puede hacer

- Login y logout con el selector de cuenta de Microsoft (nada de escribir el correo a mano cada vez)
- Dashboard de bienvenida que te saluda con tu nombre real
- Ver el listado de pedidos (con su estado de carga, de vacío y de error, pa' que no quede la escoba si el backend está caído)
- Crear un pedido nuevo con formulario (cliente, producto, cantidad, precio, estado)

## Lo que necesitas antes de correr esto

- Node.js (v18 pa'rriba)
- Angular CLI: `npm install -g @angular/cli`
- Tener el backend corriendo en `localhost:8080` → [repo del backend acá](https://github.com/Rushley7/CLOUDNATIVE_backend)

## Instalación

\`\`\`bash
npm install
\`\`\`

## Correrlo en modo desarrollo

\`\`\`bash
ng serve
\`\`\`

Y listo, queda arriba en `http://localhost:4200`.

## Configuración de Entra ID

Toda la config de MSAL está en `src/environments/environment.ts`:

- `clientId`: el Application (client) ID de la app registrada como SPA en Entra ID
- `authority`: la URL del tenant
- `redirectUri`: a dónde te devuelve después de loguearte
- `scopes`: el permiso que le pedimos al backend (`OT.Create`)

## Cómo está organizada la cuestión

\`\`\`
src/app/
├── pages/
│   ├── dashboard/        # la pantalla de bienvenida
│   ├── pedidos-list/     # el listado
│   └── pedido-form/      # el formulario pa' crear pedidos
├── services/
│   └── pedidos.service.ts
├── models/
│   └── pedido.model.ts
├── app.config.ts         # acá vive toda la config de MSAL, rutas, interceptor
├── app.routes.ts         # las rutas y los guards
└── app.ts                # el componente raíz (header, sesión, etc.)
\`\`\`

## El otro repo

- **Backend:** [CLOUDNATIVE_backend](https://github.com/Rushley7/CLOUDNATIVE_backend) — Spring Boot, valida el JWT, conectado a AWS RDS.

## Quién hizo esto

Rubén Velásquez (Rushley) y Maximiliano Millacaris — Ingeniería en Informática, Duoc UC.
