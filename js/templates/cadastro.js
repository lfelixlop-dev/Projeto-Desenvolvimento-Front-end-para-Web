import { escapeHtml } from '../modules/utils.js';
import { aplicarMascara } from '../modules/masks.js';
import { validators } from '../modules/validators.js';
import { buscarCEP } from '../modules/api.js';
import {
  getCadastros, addCadastro, removeCadastro,
  getRascunho, salvarRascunho, limparRascunho,
} from '../modules/storage.js';

const campo = (id, rotulo, tipo = 'text', extra = '') => `
  <div class="campo">
    <label for="${id}">${rotulo}</label>
    <input id="${id}" name="${id}" type="${tipo}" ${extra} aria-describedby="${id}-erro">
    <p class="erro" id="${id}-erro" aria-live="polite"></p>
  </div>`;

export const template = () => `
  <h1 tabindex="-1">Cadastro de voluntários</h1>
  <div class="colunas">
    <form id="form" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>
        ${campo('nome', 'Nome completo', 'text', 'autocomplete="name"')}
        ${campo('cpf', 'CPF', 'text', 'inputmode="numeric" placeholder="000.000.000-00"')}
        ${campo('email', 'E-mail', 'email', 'autocomplete="email"')}
        ${campo('telefone', 'Telefone', 'tel', 'placeholder="(11) 91234-5678" autocomplete="tel"')}
      </fieldset>
      <fieldset>
        <legend>Endereço</legend>
        ${campo('cep', 'CEP', 'text', 'inputmode="numeric" placeholder="00000-000"')}
        <p id="cep-status" class="ajuda" aria-live="polite"></p>
        ${campo('rua', 'Rua')}
        ${campo('numero', 'Número')}
        ${campo('cidade', 'Cidade')}
        ${campo('uf', 'UF', 'text', 'maxlength="2"')}
      </fieldset>
      <fieldset>
        <legend>Participação</legend>
        <div class="campo">
          <label for="interesse">Área de interesse</label>
          <select id="interesse" name="interesse" aria-describedby="interesse-erro">
            <option value="">Selecione</option>
            <option>Educação</option><option>Meio ambiente</option><option>Cultura</option>
          </select>
          <p class="erro" id="interesse-erro" aria-live="polite"></p>
        </div>
      </fieldset>
      <p id="resultado" class="resultado" aria-live="polite"></p>
      <button class="btn" type="submit">Salvar cadastro</button>
    </form>

    <aside aria-labelledby="titulo-lista">
      <h2 id="titulo-lista">Cadastros salvos</h2>
      <ul id="lista-cadastros" class="lista"></ul>
    </aside>
  </div>`;

function mostrarErro(input, msg) {
  document.getElementById(`${input.id}-erro`).textContent = msg;
  input.classList.toggle('invalido', Boolean(msg));
  input.classList.toggle('valido', !msg && input.value !== '');
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function validar(input) {
  const msg = validators[input.id]?.(input.value) ?? '';
  mostrarErro(input, msg);
  return !msg;
}

function renderLista(app) {
  const lista = getCadastros();
  app.querySelector('#lista-cadastros').innerHTML = lista.length
    ? lista.map((c) => `
        <li>
          <span><strong>${escapeHtml(c.nome)}</strong><br>${escapeHtml(c.email)} · ${escapeHtml(c.interesse)}</span>
          <button type="button" class="btn btn--leve" data-remover="${c.id}"
                  aria-label="Remover ${escapeHtml(c.nome)}">Remover</button>
        </li>`).join('')
    : '<li>Nenhum cadastro salvo ainda. Preencha o formulário ao lado.</li>';
}

export function init(app) {
  const form = app.querySelector('#form');
  const campos = [...form.querySelectorAll('input, select')];
  const resultado = app.querySelector('#resultado');
  const statusCep = app.querySelector('#cep-status');

  // Máscaras
  aplicarMascara(form.elements.cpf, 'cpf');
  aplicarMascara(form.elements.telefone, 'telefone');
  aplicarMascara(form.elements.cep, 'cep');

  // Restaura rascunho salvo
  Object.entries(getRascunho()).forEach(([nome, valor]) => {
    if (form.elements[nome]) form.elements[nome].value = valor;
  });

  // Validação ao sair do campo; depois de errado, revalida enquanto digita
  campos.forEach((c) => {
    c.addEventListener('blur', () => { if (c.value !== '' || c.classList.contains('invalido')) validar(c); });
    c.addEventListener('input', () => { if (c.classList.contains('invalido')) validar(c); });
  });

  // Salva rascunho a cada alteração
  form.addEventListener('input', () => salvarRascunho(Object.fromEntries(new FormData(form))));

  // Preenche endereço pelo CEP
  form.elements.cep.addEventListener('blur', async (e) => {
    if (validators.cep(e.target.value)) return;
    statusCep.textContent = 'Buscando endereço...';
    try {
      const d = await buscarCEP(e.target.value);
      form.elements.rua.value = d.logradouro;
      form.elements.cidade.value = d.localidade;
      form.elements.uf.value = d.uf;
      ['rua', 'cidade', 'uf'].forEach((id) => validar(form.elements[id]));
      salvarRascunho(Object.fromEntries(new FormData(form)));
      statusCep.textContent = 'Endereço preenchido. Informe o número.';
      form.elements.numero.focus();
    } catch (erro) {
      statusCep.textContent = `${erro.message} Preencha o endereço manualmente.`;
    }
  });

  // Envio
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalidos = campos.filter((c) => !validar(c));
    if (invalidos.length) {
      resultado.className = 'resultado resultado--erro';
      resultado.textContent = `Corrija ${invalidos.length} campo(s) antes de salvar.`;
      invalidos[0].focus();
      return;
    }
    if (!addCadastro(Object.fromEntries(new FormData(form)))) {
      resultado.className = 'resultado resultado--erro';
      resultado.textContent = 'Não foi possível salvar neste navegador.';
      return;
    }
    limparRascunho();
    form.reset();
    campos.forEach((c) => mostrarErro(c, ''));
    statusCep.textContent = '';
    resultado.className = 'resultado resultado--ok';
    resultado.textContent = 'Cadastro salvo com sucesso.';
    renderLista(app);
  });

  // Remoção (delegação de eventos)
  app.querySelector('#lista-cadastros').addEventListener('click', (e) => {
    const id = e.target.closest('[data-remover]')?.dataset.remover;
    if (id) { removeCadastro(Number(id)); renderLista(app); }
  });

  renderLista(app);
}
