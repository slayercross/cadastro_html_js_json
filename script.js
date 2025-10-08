    let usuarios = [];

    function cadastrar() {
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;

      if (!nome || !email || !telefone) {
        alert("Preencha todos os campos.");
        return;
      }

      const usuario = { id: Date.now(), nome, email, telefone };
      usuarios.push(usuario);
      salvarLocalStorage();
      listarUsuarios();
      limparCampos();
    }

    function listarUsuarios() {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";

      usuarios.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${usuario.nome} - ${usuario.email} - ${usuario.telefone}
          <button onclick="editar(${usuario.id})">Editar</button>
          <button onclick="excluir(${usuario.id})">Excluir</button>
        `;
        lista.appendChild(li);
      });
    }

    function excluir(id) {
      usuarios = usuarios.filter(u => u.id !== id);
      salvarLocalStorage();
      listarUsuarios();
    }

    function editar(id) {
      const usuario = usuarios.find(u => u.id === id);
      const novoNome = prompt("Novo nome:", usuario.nome);
      const novoEmail = prompt("Novo email:", usuario.email);
      const novoTelefone = prompt("Novo telefone:", usuario.telefone);

      if (novoNome && novoEmail && novoTelefone) {
        usuario.nome = novoNome;
        usuario.email = novoEmail;
        usuario.telefone = novoTelefone;
        salvarLocalStorage();
        listarUsuarios();
      }
    }

    function salvarLocalStorage() {
     // localStorage.setItem("usuarios", JSON.stringify(usuarios));
      const dados = JSON.stringify(usuarios, null, 2); // converte e formata
      const blob = new Blob([dados], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "usuarios.json"; // nome do arquivo
      a.click();

      URL.revokeObjectURL(url);
    }

    function carregarLocalStorage() {
      //const dados = localStorage.getItem("usuarios");
      //if (dados) {
      //  usuarios = JSON.parse(dados);
      //  listarUsuarios();
      //}
	fetch('dados/usuarios.json')
	  .then(response => {
	  if (!response.ok) throw new Error('Erro ao carregar JSON');
	  return response.json();
	  })
	  .then(data => {
	    usuarios = data;
	    listarUsuarios(); // chama sua função que mostra os dados na tela
	    console.log('Usuários carregados:', usuarios);
	  })
	  .catch(error => console.error('Erro:', error));
    }

    function limparCampos() {
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      document.getElementById("telefone").value = "";
    }

    function baixarJSON() {
      const blob = new Blob([JSON.stringify(usuarios, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "usuarios.json";
      a.click();

      URL.revokeObjectURL(url);
    }

    // Carrega ao iniciar
    carregarLocalStorage();
