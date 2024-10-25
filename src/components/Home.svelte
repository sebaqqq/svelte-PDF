<script>
  import FirstPdf from "./PDF/firstPDF";
  import SecondPDF from "./PDF/secondPDF";
  import ThirdPDF from "./PDF/thirdPDF";

  function generarPDF1() {
    const pdf = new FirstPdf();
    pdf.generatePDF();
  }

  function generarPDF2() {
    const pdf = new SecondPDF();
    pdf.generatePDF();
  }

  function generarPDF3() {
    const pdf = new ThirdPDF();
    pdf.generatePDF();
  }
</script>


<div>
  <h1>Generar PDF en Svelte</h1>
  <button on:click={generarPDF1}>Generar PDF 1</button>
  <button on:click={generarPDF2}>Generar PDF 2</button>
  <button on:click={generarPDF3}>Generar PDF 3</button>
</div> 


<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
    color: #fff;
  }

  button {
    padding: 10px 20px;
    background-color: #fff;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px; 
  }
</style>