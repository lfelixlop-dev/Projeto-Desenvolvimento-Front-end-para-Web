// Cada validador devolve '' (válido) ou a mensagem de erro.
const obrigatorio = (v) => (v.trim() ? '' : 'Preencha este campo.');

export function validaCPF(cpf) {
  const n = cpf.replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  const digito = (tam) => {
    let soma = 0;
    for (let i = 0; i < tam; i++) soma += Number(n[i]) * (tam + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(n[9]) && digito(10) === Number(n[10]);
}

export const validators = {
  nome: (v) => (v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5 ? '' : 'Informe nome e sobrenome.'),
  cpf: (v) => (validaCPF(v) ? '' : 'CPF inválido. Confira os 11 dígitos.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'E-mail inválido. Exemplo: nome@dominio.com'),
  telefone: (v) => (/^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ? '' : 'Use o formato (11) 91234-5678.'),
  cep: (v) => (/^\d{5}-\d{3}$/.test(v) ? '' : 'CEP inválido. Exemplo: 01310-100'),
  rua: obrigatorio,
  numero: obrigatorio,
  cidade: obrigatorio,
  uf: (v) => (/^[A-Za-z]{2}$/.test(v.trim()) ? '' : 'Informe a sigla do estado (ex.: SP).'),
  interesse: (v) => (v ? '' : 'Escolha uma área de interesse.'),
};
