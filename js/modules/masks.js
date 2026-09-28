// Máscaras de entrada (CPF, telefone, CEP).
const digitos = (v) => v.replace(/\D/g, '');

export const masks = {
  cpf: (v) => digitos(v).slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),

  telefone: (v) => {
    const d = digitos(v).slice(0, 11);
    const regex = d.length > 10 ? /(\d{2})(\d{5})(\d{0,4})/ : /(\d{2})(\d{4})(\d{0,4})/;
    return d.replace(regex, '($1) $2-$3').replace(/-$/, '');
  },

  cep: (v) => digitos(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),
};

export function aplicarMascara(input, tipo) {
  input.addEventListener('input', () => { input.value = masks[tipo](input.value); });
}
