# Instituto Raiz Comum

Projeto acadêmico de desenvolvimento web front-end, com foco em **HTML5 semântico**, **acessibilidade digital** e **validação de formulários**.

## Sobre o projeto

O Instituto Raiz Comum é uma ONG fictícia criada para este projeto, que atua com hortas comunitárias, formação profissional e segurança alimentar em periferias urbanas de São Paulo. O site é composto por três páginas com propósitos distintos:

- **`index.html`** — página inicial institucional, com apresentação da ONG e dados de contato.
- **`projetos.html`** — detalhamento das iniciativas da ONG, incluindo blocos específicos sobre como ser voluntário e como doar.
- **`cadastro.html`** — formulário de cadastro de voluntários/doadores, com validações nativas de HTML5 e máscaras de entrada em JavaScript para CPF, telefone e CEP.

## Estrutura de diretórios

```
ong-instituto-raiz-comum/
├── index.html
├── projetos.html
├── cadastro.html
└── assets/
    └── img/
        └── horta-comunitaria.svg
```

## Principais características técnicas

- Marcação 100% semântica: `header`, `nav`, `main`, `section`, `article`, `aside`, `fieldset`/`legend`, `footer`.
- Hierarquia de títulos (`h1` a `h6`) planejada para navegação por leitor de tela.
- Atributo `alt` descritivo em todas as imagens.
- Formulário com validação nativa (`required`, `pattern`, `type`, `minlength`/`maxlength`) combinada com JavaScript para:
  - Máscara e validação de dígito verificador de **CPF**.
  - Máscara de **telefone**.
  - Máscara de **CEP** com preenchimento automático de endereço via [API ViaCEP](https://viacep.com.br/).
- Sem frameworks ou bibliotecas externas — HTML, CSS e JavaScript puros, cada página autocontida em um único arquivo.

## Como visualizar

Basta abrir qualquer um dos arquivos `.html` diretamente no navegador — não há dependência de servidor ou build.

## Contexto acadêmico

Projeto desenvolvido como exercício de fixação de conceitos de HTML5 semântico e acessibilidade web, com conteúdo institucional fictício criado apenas para fins didáticos.
