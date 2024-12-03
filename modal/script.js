function consultarCep() {
  abrirPopup();
}

function abrirPopup() {
  // Mostra a DIV do popup
  document.getElementById('meuPopup').style.display = 'block';

  // Obtém o valor do CEP
  const cep = document.getElementById('InputCep').value;
  const validaCep = /^[0-9]{8}$/;

  // Valida o CEP
  if (!validaCep.test(cep)) {
    document.getElementById('InputCep').value = '';
    alert("CEP Inválido! Digite um CEP válido.");
    fecharPopup(); // Fecha o popup em caso de CEP inválido
    return;
  }

  // URL para a consulta do CEP
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // Faz a requisição ao serviço ViaCEP
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!("erro" in data)) {
        // Atualiza a DIV com os dados do CEP
        const cepInfoDiv = document.getElementById('cepInfo');
        cepInfoDiv.innerHTML = `
          <h4 class="text-center">Dados do CEP ${cep}</h4>
          <p>Logradouro: ${data.logradouro}</p>
          <p>Bairro: ${data.bairro}</p>
          <p>Cidade: ${data.localidade}</p>
          <p>Estado: ${data.uf}</p>
          <p>DDD: ${data.ddd}</p>
          <p>IBGE: ${data.ibge}</p>
        `;
      } else {
        document.getElementById('InputCep').value = '';
        alert("CEP não encontrado. Por favor, verifique o CEP e tente novamente.");
        fecharPopup(); // Fecha o popup em caso de CEP não encontrado
      }
    })
    .catch(error => console.error('Ocorreu um erro:', error));
}

function fecharPopup() {
  // Esconde a DIV do popup
  document.getElementById('meuPopup').style.display = 'none';

  // Limpa o campo de entrada do CEP
  document.getElementById('InputCep').value = '';
}
