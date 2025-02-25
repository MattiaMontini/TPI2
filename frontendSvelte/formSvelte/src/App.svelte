<script>
  import { onMount } from "svelte";

  let nome = $state();
  let cognome = $state();
  let data = $state();
  let sesso = $state();
  let skills = $state([]);
  let dati = $state([]);
  let responseMessage = $state();
  let isSuccess = $state(false);

  async function sendData(event) {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3080/utente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cognome, data, sesso, skills }),
      });
      if (res.ok) {
        const responseData = await res.json();
        responseMessage = responseData.message;
        dati = responseData.data;
        isSuccess = true;
        resetForm();
      } else {
        responseMessage = "Errore nell'invio dei dati";
        isSuccess = false;
      }
    } catch (error) {
      responseMessage = "Errore di connessione";
      isSuccess = false;
    }
  }

  function resetForm() {
    nome = "";
    cognome = "";
    data = "";
    sesso = "";
    skills = [];
  }

  async function getDati() {
    try {
      const response = await fetch("http://localhost:3080/utente");
      dati = await response.json();
    } catch (error) {
      responseMessage = "Errore di connessione al server";
      isSuccess = false;
    }
  }

  onMount(getDati);
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1, h2 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input, button {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #007bff;
    color: white;
  }
  .success {
    text-align: center;
    color: green;
  }
  .error {
    text-align: center;
    color: red;
  }
</style>

<div class="container">
  <h1>Benvenuto</h1>

  <form onsubmit={sendData}>
    <input type="text" bind:value={nome} placeholder="Nome" required />
    <input type="text" bind:value={cognome} placeholder="Cognome" required />
    <input type="date" bind:value={data} required />
    
    <p><strong>Sesso:</strong></p>
    <label><input type="radio" bind:group={sesso} value="Maschio" /> Maschio</label>
    <label><input type="radio" bind:group={sesso} value="Femmina" /> Femmina</label>
    
    <p><strong>Skills:</strong></p>
    <label><input type="checkbox" bind:group={skills} value="HTML" /> HTML</label>
    <label><input type="checkbox" bind:group={skills} value="CSS" /> CSS</label>
    <label><input type="checkbox" bind:group={skills} value="JavaScript" /> JavaScript</label>
    <label><input type="checkbox" bind:group={skills} value="PHP" /> PHP</label>
    
    <button type="submit">Invia</button>
  </form>

  <p class={isSuccess ? "success" : "error"}>{responseMessage}</p>
</div>

<h2>Elenco utenti</h2>
<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Cognome</th>
      <th>Data di nascita</th>
      <th>Sesso</th>
      <th>Skills</th>
    </tr>
  </thead>
  <tbody>
    {#each dati as utente}
      <tr>
        <td>{utente.nome}</td>
        <td>{utente.cognome}</td>
        <td>{utente.data}</td>
        <td>{utente.sesso}</td>
        <td>{utente.skills ? utente.skills.join(", ") : "Nessuna"}</td>
      </tr>
    {/each}
  </tbody>
</table>

