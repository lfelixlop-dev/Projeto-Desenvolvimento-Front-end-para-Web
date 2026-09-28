// Roteador por hash: #/  #/projetos  #/cadastro
import * as home from '../templates/home.js';
import * as projetos from '../templates/projetos.js';
import * as cadastro from '../templates/cadastro.js';
import * as naoEncontrada from '../templates/naoEncontrada.js';

const routes = {
  '/':         { title: 'Início',   view: home },
  '/projetos': { title: 'Projetos', view: projetos },
  '/cadastro': { title: 'Cadastro', view: cadastro },
};

export function initRouter(app) {
  let primeiraRenderizacao = true;

  function render() {
    const path = location.hash.slice(1) || '/';
    const route = routes[path] ?? { title: 'Página não encontrada', view: naoEncontrada };

    app.innerHTML = route.view.template();      // 1. injeta o template
    route.view.init?.(app);                     // 2. liga eventos da nova view
    document.title = `${route.title} | Instituto Raiz Comum`;

    document.querySelectorAll('nav a').forEach((a) => {
      if (a.dataset.route === path) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    // Acessibilidade: leva o foco ao <h1> para leitores de tela perceberem a troca
    if (!primeiraRenderizacao) app.querySelector('h1')?.focus();
    primeiraRenderizacao = false;
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', render);
  render();
}
