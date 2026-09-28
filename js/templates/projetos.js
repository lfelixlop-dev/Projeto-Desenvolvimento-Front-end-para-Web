import { escapeHtml } from '../modules/utils.js';

const projetos = [
  { titulo: 'Horta Comunitária', categoria: 'Meio ambiente', descricao: 'Hortas em terrenos ociosos, cuidadas pelos moradores.' },
  { titulo: 'Reforço Escolar', categoria: 'Educação', descricao: 'Aulas de apoio em matemática e leitura, duas vezes por semana.' },
  { titulo: 'Biblioteca de Rua', categoria: 'Cultura', descricao: 'Estantes abertas em praças, com empréstimo por confiança.' },
  { titulo: 'Coleta Seletiva', categoria: 'Meio ambiente', descricao: 'Pontos de coleta e oficinas de reaproveitamento.' },
  { titulo: 'Oficina de Teatro', categoria: 'Cultura', descricao: 'Encontros semanais para jovens de 12 a 17 anos.' },
];

const cartoes = (lista) => (lista.length
  ? lista.map((p) => `
      <article class="card">
        <h2>${escapeHtml(p.titulo)}</h2>
        <p class="tag">${escapeHtml(p.categoria)}</p>
        <p>${escapeHtml(p.descricao)}</p>
      </article>`).join('')
  : '<p>Nenhum projeto nesta área.</p>');

const categorias = [...new Set(projetos.map((p) => p.categoria))];

export const template = () => `
  <h1 tabindex="-1">Projetos</h1>
  <div class="campo campo--filtro">
    <label for="filtro">Filtrar por área</label>
    <select id="filtro">
      <option value="">Todas</option>
      ${categorias.map((c) => `<option>${escapeHtml(c)}</option>`).join('')}
    </select>
  </div>
  <div id="lista" class="grid" aria-live="polite">${cartoes(projetos)}</div>`;

export function init(app) {
  app.querySelector('#filtro').addEventListener('change', (e) => {
    const cat = e.target.value;
    app.querySelector('#lista').innerHTML = cartoes(cat ? projetos.filter((p) => p.categoria === cat) : projetos);
  });
}
