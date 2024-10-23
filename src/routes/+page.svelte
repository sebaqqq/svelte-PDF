<script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';

  function generarPDF() {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Informe Físico – 1° Semestre 2024', 10, 10);

    // Información del jugador
    doc.setFontSize(14);
    doc.text('Nombre: Sebastian Quintana', 10, 20);
    doc.text('Categoría: USA PRO', 10, 30);

    // Squat Jump (SJ)
    doc.setFontSize(16);
    doc.text('Squat Jump (SJ)', 10, 50);
    doc.setFontSize(12);
    doc.text('Prueba que mide la potencia del tren inferior.', 10, 60);
    doc.text('Resultado: 36.1', 10, 70);
    doc.text('Clasificación: Bueno', 10, 80);
    
    // Counter Movement Jump (CMJ)
    doc.setFontSize(16);
    doc.text('Counter Movement Jump (CMJ)', 10, 100);
    doc.setFontSize(12);
    doc.text('Mide la capacidad de fuerza explosiva elástica.', 10, 110);
    doc.text('Resultado: 51.8', 10, 120);
    doc.text('Clasificación: Muy Bueno', 10, 130);
    
    // Aceleración 10 metros (T10)
    doc.setFontSize(16);
    doc.text('Aceleración 10 metros (T10)', 10, 150);
    doc.setFontSize(12);
    doc.text('Mide la capacidad de acelerar en 10 metros.', 10, 160);
    doc.text('Resultado: 1.84 segundos', 10, 170);
    doc.text('Clasificación: Bueno', 10, 180);

    // Aceleración 30 metros (T30)
    doc.setFontSize(16);
    doc.text('Aceleración 30 metros (T30)', 10, 200);
    doc.setFontSize(12);
    doc.text('Mide la capacidad de acelerar en 30 metros.', 10, 210);
    doc.text('Resultado: 4.39 segundos', 10, 220);
    doc.text('Clasificación: Bueno', 10, 230);

    // Gráfico - Evaluación
    // Aquí usaremos un gráfico básico de barras como texto simple
    doc.setFontSize(14);
    doc.text('Evaluación Comparativa (Gráfico de ejemplo)', 10, 250);

    // Dibujar barras simples como ejemplo
    doc.setDrawColor(0);
    doc.setFillColor(100, 150, 255); // Color de las barras
    doc.rect(10, 260, 50, 10, 'F'); // Barra para "Squat Jump"
    doc.text('Squat Jump: 36.1', 70, 268);

    doc.setFillColor(255, 100, 100); // Otro color para barras
    doc.rect(10, 280, 70, 10, 'F'); // Barra para "CMJ"
    doc.text('CMJ: 51.8', 70, 288);

    // Guardar el PDF
    doc.save('informe_fisico_sebastian_quintana.pdf');
  }
</script>

<div>
  <h1>Generar PDF en Svelte</h1>
  <button on:click={generarPDF}>Generar PDF</button>
</div>
