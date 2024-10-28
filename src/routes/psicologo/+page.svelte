<script>
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import Chart from "chart.js/auto";
  import ChartDataLabels from "chartjs-plugin-datalabels";

  let deportista = "";
  let edad = "";
  let categoria = "";
  let entrevista = "";
  let testTecnificacion = "";
  let observaciones = "";

  let nombrePsicologo = "";
  let institucion = "";
  let telefono = "";
  let correo = "";

  let evaluationValues = {
    autoConfianza: "",
    energiaNegativa: "",
    controlAtencion: "",
    controlVisual: "",
    motivacion: "",
    energiaPositiva: "",
    controlActivacion: "",
  };

  function generatePDF() {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    document.body.appendChild(canvas);

    const chartData = {
      labels: [
        "AUTOCONFIANZA", 
        "ENERGIA NEGATIVA", 
        "CONTROL DE LA ATENCION", 
        "CONTROL VISUAL Y DE IMAGEN", 
        "NIVEL DE MOTIVACION", 
        "ENERGIA POSITIVA", 
        "CONTROL DE ACTIVACION"
      ],
      datasets: [{
        label: "Año 2023",
        data: [
          evaluationValues.autoConfianza, 
          evaluationValues.energiaNegativa, 
          evaluationValues.controlAtencion, 
          evaluationValues.controlVisual, 
          evaluationValues.motivacion, 
          evaluationValues.energiaPositiva, 
          evaluationValues.controlActivacion
        ],
        backgroundColor: "#FFD700"
      }]
    };

    const chart = new Chart(canvas, {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: true,
            color: "#fff",
            anchor: "end",
            align: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Variables",
              color: "#FFF",
              font: {
                size: 14,
              }
            },
          },
          y: {
            beginAtZero: true,
            max: 30,
            title: {
              display: true,
              text: "Valoración de Variables",
              color: "#FFF",
              font: {
                size: 14,
              }
            },
            ticks: {
              color: "#FFF",
              font: {
                size: 12,
              },
            },
          },
        },
        layout: {
          padding: {
            top: 20,
          },
        },
      },
      plugins: [ChartDataLabels],
    })

    setTimeout(() => {
      const chartImg = canvas.toDataURL("image/png");
      const doc = new jsPDF();

      doc.setFillColor(14, 30, 46);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleText = "Informe Físico";
      const textWidth = doc.getTextWidth(titleText);
      const xTitlePosition = (pageWidth - textWidth) / 2;
      doc.text(titleText, xTitlePosition, 20);

      const headers = [["Campo", "Valor"]];
      const data = [
        ["Deportista", deportista],
        ["Edad", edad],
        ["Categoría", categoria],
      ];

      doc.autoTable({
        head: headers,
        body: data,
        startY: 30,
        theme: "grid",
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: "bold",
        },
      });

      doc.setFontSize(12);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Desarrollo de Entrevista"]],
        body: [],
        theme: "grid",
        styles: {
          halign: "center",
          fontSize: 12,
          textColor: [255, 255, 255],
          fillColor: [31, 41, 55],
        },
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
        },
      });

      const splitText = doc.splitTextToSize(entrevista, 180);
      let yPosition = 90; 
      const pageHeight = doc.internal.pageSize.height; 
      const lineHeight = 10; 

      splitText.forEach(line => {
        if (yPosition + lineHeight > pageHeight - 20) {
          doc.addPage(); 

          doc.setFillColor(14, 30, 46);
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

          yPosition = 20; 
        }
        doc.text(line, 15, yPosition);
        yPosition += lineHeight; 
      });
      
      // Añadir una nueva página 2
      doc.addPage();

      doc.setFillColor(14, 30, 46);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "F"
      );

      doc.autoTable({
        startY:  20,
        head: [["Test Tecnificación Deportiva:"]],
        body: [],
        theme: "grid",
        styles: {
          halign: "center",
          fontSize: 12,
          textColor: [255, 255, 255],
          fillColor: [31, 41, 55],
        },
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
        },
      });

      const splitText2 = doc.splitTextToSize(testTecnificacion, 180);
      let yPosition2 = 40; 
      const pageHeight2 = doc.internal.pageSize.height; 
      const lineHeight2 = 10;
      const chartHeight = 80; 
      const chartYPosition = 155; 

      splitText2.forEach(line => {
        if (yPosition2 + lineHeight2 > pageHeight2 - 20) {
          doc.addPage(); 

          doc.setFillColor(14, 30, 46);
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

          yPosition2 = 20; 
        }
        doc.text(line, 15, yPosition2);
        yPosition2 += lineHeight2; 
      });

      if (yPosition2 + chartHeight > pageHeight2 - 20) {
        doc.addPage();

        doc.setFillColor(14, 30, 46);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

        yPosition2 = 20; 
      }

      doc.addImage(chartImg, "PNG", 45, 155, 120, 80);

      // Añadir una nueva página 3
      doc.addPage();

      doc.setFillColor(14, 30, 46);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "F"
      );
      doc.autoTable({
        startY:  20,
        head: [["Observaciones:"]],
        body: [],
        theme: "grid",
        styles: {
          halign: "center",
          fontSize: 12,
          textColor: [255, 255, 255],
          fillColor: [31, 41, 55],
        },
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
        },
      });
      
      const splitText3 = doc.splitTextToSize(observaciones, 180);
      let yPosition3 = 40; 
      const pageHeight3 = doc.internal.pageSize.height; 
      const lineHeight3 = 10; 

      splitText3.forEach(line => {
        if (yPosition3 + lineHeight3 > pageHeight3 - 20) {
          doc.addPage(); 

          doc.setFillColor(14, 30, 46);
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

          yPosition3 = 20; 
        }
        doc.text(line, 15, yPosition3);
        yPosition3 += lineHeight3; 
      });


      doc.autoTable({
        startY:  215,
        head: [["Datos de contacto área psicológica "]],
        body: [],
        theme: "grid",
        styles: {
          halign: "center",
          fontSize: 12,
          textColor: [255, 255, 255],
          fillColor: [31, 41, 55],
        },
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
        },
      });
      doc.text(testTecnificacion, 15, 40);


      const headersProfessional = [["Campo", "Valor"]];
      const dataProfessional = [
        ["Nombre psicólogo", nombrePsicologo],
        ["Institución", institucion],
        ["Teléfono", telefono],
        ["Correo", correo],
      ];

      doc.autoTable({
        head: headersProfessional,
        body: dataProfessional,
        startY: 225,
        theme: "grid",
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: "bold",
        },
      });

      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);

      document.body.removeChild(canvas);
  }, 1000);
}
</script>

<section class="hero">
<div class="container">
  <div class="form-card">
    <div class="form-header">
      <h1>Generar Test Psicológico</h1>
    </div>
    <div class="form-body">
      <div class="form-grid">
        <div class="form-group full-width">
          <label for="deportista">Deportista</label>
          <input type="text" id="deportista" bind:value={deportista} placeholder="Nombre del Deportista" />
        </div>
        <div class="form-group">
          <label for="edad">Edad</label>
          <input type="text" id="edad" bind:value={edad} placeholder="Edad" />
        </div>
        <div class="form-group">
          <label for="categoria">Categoría</label>
          <input type="text" id="categoria" bind:value={categoria} placeholder="Categoría" />
        </div>
        <div class="form-group full-width">
          <label for="entrevista">Desarrollo de la Entrevista</label>
          <textarea id="entrevista" bind:value={entrevista} placeholder="Desarrollo de la Entrevista" rows="3"></textarea>
        </div>
        <div class="form-group full-width">
          <label for="testTecnificacion">Test Tecnificación Deportiva</label>
          <textarea id="testTecnificacion" bind:value={testTecnificacion} placeholder="Test Tecnificación Deportiva" rows="3"></textarea>
        </div>
      </div>

      <div class="evaluation-section">
        <h2 class="evaluation-title">Evaluación Psicológica</h2>
        <div class="evaluation-grid">
          {#each Object.entries(evaluationValues) as [key, value]}
            <div class="form-group">
              <label for={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
              <input type="number" id={key} bind:value={evaluationValues[key]} min="0" max="50" />
            </div>
          {/each}
        </div>
      </div>
    
      <div class="form-group full-width">
        <label for="observaciones" class="subTitle">Observaciones</label>
        <textarea id="observaciones" bind:value={observaciones} placeholder="Observaciones" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="categoria">Nombre psicólogo</label>
        <input type="text" id="categoria" bind:value={nombrePsicologo} placeholder="Nombre psicólogo" />
      </div>
      <div class="form-group">
        <label for="categoria">Institución</label>
        <input type="text" id="categoria" bind:value={institucion} placeholder="Institución" />
      </div>
      <div class="form-group">
        <label for="categoria">Teléfono</label>
        <input type="text" id="categoria" bind:value={telefono} placeholder="ej: +569 55443322" />
      </div>
      <div class="form-group">
        <label for="categoria">Correo</label>
        <input type="text" id="categoria" bind:value={correo} placeholder="correo@gmail.com" />
      </div>
      
      <button on:click={generatePDF} class="generate-btn">
        Generar PDF
      </button>
    </div>
  </div>
</div>
</section>

<style>
  .hero {
    background-color: #111;
    font-family: "Prompt", sans-serif;
    color: white;
    padding: 1rem 0;
  }

  .container {
    margin: 0 auto;
    padding: 2rem 1rem;
    max-width: 1000px;
    background-color: #111;
  }

  .form-card {
    background-color: #0E1E2E;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(31, 41, 55);
    overflow: hidden;
  }

  .form-header {
    background-color: rgba(31, 41, 55);
    color: white;
    padding: 1.5rem;
    text-align: center;
  }

  .form-header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .form-body {
    padding: 2rem;
  }

  .form-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .full-width {
    grid-column: 1 / -1;
  }


  label {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: #fff;
  }

  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }

  .evaluation-section {
    margin-top: 2rem;
  }

  .evaluation-section h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .evaluation-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .evaluation-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .generate-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    gap: 0.5rem;
    width: 50%;
    padding: 0.75rem;
    margin-top: 2rem;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .generate-btn:hover {
    background-color: #303f9f;
  }

  @media (max-width: 600px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>