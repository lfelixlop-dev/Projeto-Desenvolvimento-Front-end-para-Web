# Instituto Raiz Comum – SPA

Site estático transformado em Single Page Application com JavaScript puro (ES Modules).

## Como executar
Módulos ES não funcionam abrindo o arquivo direto (`file://`). Use um servidor local a partir da raiz do projeto e abra `/html/index.html`:
- VS Code: extensão **Live Server** → "Go Live"
- ou no terminal: `npx serve .` / `python3 -m http.server`

## Estrutura
- `html/index.html` – esqueleto fixo (header, nav, `<main id="app">`, footer)
- `css/style.css` – estilos responsivos
- `imagens/logo.svg` – logo e favicon
- `js/main.js` – ponto de entrada
- `js/modules/` – `router.js`, `validators.js`, `masks.js`, `api.js`, `storage.js`, `utils.js`
- `js/templates/` – uma view por arquivo (`template()` + `init()`)

## Requisitos atendidos
Navegação sem recarregar · templates JS · validação com feedback por campo (`aria-live`, `aria-invalid`) · persistência em `localStorage` · código modular por funcionalidade.
