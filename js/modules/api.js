// Consulta de endereço pelo ViaCEP.
export async function buscarCEP(cep) {
  const resposta = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
  if (!resposta.ok) throw new Error('Não foi possível consultar o CEP agora.');
  const dados = await resposta.json();
  if (dados.erro) throw new Error('CEP não encontrado.');
  return dados;
}
