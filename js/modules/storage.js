// Tudo que toca o localStorage fica aqui. Só guarda texto, por isso JSON.
const CHAVE_LISTA = 'raizcomum:cadastros';
const CHAVE_RASCUNHO = 'raizcomum:rascunho';

function ler(chave, padrao) {
  try { return JSON.parse(localStorage.getItem(chave)) ?? padrao; }
  catch { return padrao; }
}
function gravar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); return true; }
  catch { return false; }
}

export const getCadastros = () => ler(CHAVE_LISTA, []);
export function addCadastro(cadastro) {
  return gravar(CHAVE_LISTA, [...getCadastros(), { ...cadastro, id: Date.now() }]);
}
export function removeCadastro(id) {
  gravar(CHAVE_LISTA, getCadastros().filter((c) => c.id !== id));
}

export const getRascunho = () => ler(CHAVE_RASCUNHO, {});
export const salvarRascunho = (dados) => gravar(CHAVE_RASCUNHO, dados);
export function limparRascunho() {
  try { localStorage.removeItem(CHAVE_RASCUNHO); } catch { /* ignora */ }
}
