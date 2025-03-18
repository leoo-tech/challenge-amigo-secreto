const participantes = [];
const participantesList = document.getElementById("participantes");
const resultadoDiv = document.getElementById("resultado");

document.getElementById("adicionar").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  if (nome && !participantes.includes(nome)) {
    participantes.push(nome);
    const li = document.createElement("li");
    li.textContent = nome;
    participantesList.appendChild(li);
    document.getElementById("nome").value = ""; // Limpa o campo de entrada
  } else {
    alert("Nome inválido ou já adicionado!");
  }
});

document.getElementById("sortear").addEventListener("click", () => {
  if (participantes.length < 2) {
    alert("Adicione pelo menos 2 participantes para sortear!");
    return;
  }

  const amigosSecretos = [...participantes];
  const resultado = {};

  for (let i = 0; i < participantes.length; i++) {
    const amigoIndex = Math.floor(Math.random() * amigosSecretos.length);
    const amigo = amigosSecretos[amigoIndex];

    // Garante que ninguém tire a si mesmo
    if (amigo === participantes[i]) {
      i--; // Tenta novamente
      continue;
    }

    resultado[participantes[i]] = amigo;
    amigosSecretos.splice(amigoIndex, 1); // Remove o amigo sorteado da lista
  }

  // Exibe o resultado
  resultadoDiv.innerHTML = "<h2>Resultados do Amigo Secreto:</h2>";
  for (const [participante, amigo] of Object.entries(resultado)) {
    resultadoDiv.innerHTML += `<p>${participante} tirou ${amigo}</p>`;
  }
});
