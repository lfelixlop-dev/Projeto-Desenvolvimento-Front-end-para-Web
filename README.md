# Instituto Raiz Comum – SPA

Projeto acadêmico de desenvolvimento web front-end, desenvolvido para a criação do site institucional do **Instituto Raiz Comum**, uma ONG fictícia voltada para hortas comunitárias, formação profissional e segurança alimentar em periferias urbanas de São Paulo.

O projeto evoluiu de um site tradicional em HTML/CSS para uma **Single Page Application (SPA)** utilizando **JavaScript puro com ES Modules**, mantendo como foco a semântica HTML5, acessibilidade, responsividade, validação de formulários e organização modular do código.

## Sobre o projeto

O Instituto Raiz Comum é uma organização não governamental fictícia criada exclusivamente para fins acadêmicos.

A aplicação apresenta informações institucionais e permite ao usuário navegar entre diferentes seções do site sem recarregamento completo da página.

Entre as funcionalidades implementadas estão:

* Navegação dinâmica utilizando JavaScript;
* Renderização de conteúdo por templates;
* Formulário de cadastro de voluntários e doadores;
* Validação de campos com feedback visual;
* Máscaras para CPF, telefone e CEP;
* Validação do dígito verificador do CPF;
* Consulta automática de endereço através da API ViaCEP;
* Persistência de dados utilizando `localStorage`;
* Recursos de acessibilidade utilizando atributos ARIA;
* Layout responsivo para diferentes tamanhos de tela;
* Organização do JavaScript em módulos por responsabilidade.

## Como executar

Como o projeto utiliza **ES Modules**, os arquivos não devem ser executados diretamente através do protocolo `file://`.

É necessário utilizar um servidor local a partir da raiz do projeto.

### VS Code

Utilize a extensão **Live Server** e clique em:

**Go Live**

Depois, acesse:

```text
/html/index.html
```

### Terminal

Também é possível utilizar um servidor local através do terminal:

```bash
npx serve .
```

ou:

```bash
python3 -m http.server
```

Após iniciar o servidor, abra no navegador o endereço fornecido pelo terminal e acesse:

```text
/html/index.html
```

## Estrutura do projeto

```text
raiz-comum-spa/
│
├── html/
│   └── index.html
│
├── css/
│   └── style.css
│
├── imagens/
│   └── logo.svg
│
├── js/
│   ├── main.js
│   │
│   ├── modules/
│   │   ├── api.js
│   │   ├── masks.js
│   │   ├── router.js
│   │   ├── storage.js
│   │   ├── utils.js
│   │   └── validators.js
│   │
│   └── templates/
│       ├── cadastro.js
│       ├── home.js
│       ├── naoEncontrada.js
│       └── projetos.js
│
└── README.md
```

## Organização dos arquivos

### HTML

* `html/index.html` – estrutura base da aplicação, contendo `header`, navegação, `<main id="app">` e `footer`.

### CSS

* `css/style.css` – estilos visuais, responsividade, componentes e estados de interação da aplicação.

### JavaScript

* `js/main.js` – ponto de entrada da aplicação e inicialização dos módulos.
* `js/modules/router.js` – responsável pelo roteamento e navegação entre as páginas.
* `js/modules/validators.js` – regras de validação dos formulários.
* `js/modules/masks.js` – aplicação de máscaras para CPF, telefone e CEP.
* `js/modules/api.js` – comunicação com a API ViaCEP.
* `js/modules/storage.js` – gerenciamento da persistência de dados utilizando `localStorage`.
* `js/modules/utils.js` – funções auxiliares utilizadas pela aplicação.

### Templates

* `js/templates/home.js` – template e inicialização da página inicial.
* `js/templates/projetos.js` – template e inicialização da página de projetos.
* `js/templates/cadastro.js` – template e inicialização do formulário de cadastro.
* `js/templates/naoEncontrada.js` – página exibida para rotas inexistentes.

## Requisitos e conceitos aplicados

### HTML5 semântico

Utilização de elementos semânticos como:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`
* `fieldset`
* `legend`

### Acessibilidade

Aplicação de conceitos de acessibilidade digital, incluindo:

* Hierarquia adequada de títulos;
* Textos alternativos para imagens;
* Navegação estruturada;
* Atributos `aria-live`;
* Atributo `aria-invalid`;
* Feedback de validação associado aos respectivos campos;
* Estrutura compatível com tecnologias assistivas.

### JavaScript

Implementação de:

* ES Modules;
* Roteamento no lado do cliente;
* Templates dinâmicos;
* Manipulação do DOM;
* Eventos;
* Validação de formulários;
* Máscaras de entrada;
* Consumo de API;
* Persistência com `localStorage`;
* Organização modular por responsabilidade.

### CSS

Utilização de CSS3 para:

* Layout responsivo;
* Flexbox;
* Grid;
* Componentização visual;
* Estados de interação;
* Transições;
* Adaptação para diferentes tamanhos de tela.

## Requisitos atendidos

* Navegação entre páginas sem recarregamento completo;
* Renderização dinâmica através de templates JavaScript;
* Código organizado em módulos por funcionalidade;
* Validação de formulários com feedback por campo;
* Uso de `aria-live` e `aria-invalid`;
* Máscaras de entrada para CPF, telefone e CEP;
* Validação do dígito verificador do CPF;
* Consulta de endereço através da API ViaCEP;
* Persistência de dados utilizando `localStorage`;
* Layout responsivo;
* Estrutura HTML semântica;
* Práticas básicas de acessibilidade web.

## Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **ES Modules**
* **API ViaCEP**
* **localStorage**
* **Git / GitHub**

## Contexto acadêmico

Projeto desenvolvido como exercício acadêmico para aplicação prática de conceitos de **desenvolvimento front-end, HTML5 semântico, CSS3, JavaScript, acessibilidade digital, validação de formulários, consumo de APIs e organização modular de código**.

Todo o conteúdo institucional utilizado no projeto é fictício e foi desenvolvido exclusivamente para fins didáticos.

---

## Autor

Projeto acadêmico desenvolvido por **Lucas Felix Lopes**.
