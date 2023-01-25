# Change Log

## V0.0.1

### 29-06-2022
- Se crea el proyecto con el comando 
`yarn create vite`
- Se instala react route dom
`yarn add react-router-dom@6`
- Se instala redux
`yarn add @reduxjs/toolkit react-redux`

#### Se agregan archivos env
.env el cual se agrega en el gitignore
y .env.template que es el que se sube, no puede contener datos sensibles. ya que es el que queda en el repo
Cuando alguien se clona el proyecto debe renombrar este archivo a .env y configurarlo.

#### Se agrega json-server como dev dependency
- `yarn add -D json-server`
- Se crea carpeta mock con configuración de json server.
- Se agrega comando en package.json 

#### Config eslint
`yarn add -D @typescript-eslint/parser`
`yarn add -D eslint-config-airbnb`
`yarn add -D eslint-plugin-github`
`yarn add -D eslint-plugin-regexp@latest`
`yarn add -D eslint-plugin-security@latest`
`yarn add -D eslint-plugin-storybook@latest`

-- 12:20
Se borra todo y se agrega lo siguiente:
`yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
`yarn create @eslint/config`

### 04-07-2022
Se instala MUI 
`yarn add @mui/material @emotion/react @emotion/styled`
`yarn add formik`
## Dev Dependencies
- add `eslint`
- add `@reduxjs/toolkit react-redux`
- add `json-server`