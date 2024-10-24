<script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';

  function generarPDF() {
    const doc = new jsPDF();

    doc.setFillColor(14, 30, 46);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); 

    // Título centrado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); 
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const titleText = 'Informe Físico';
    const textWidth = doc.getTextWidth(titleText); 
    const xTitlePosition = (pageWidth - textWidth) / 2; 
    doc.text(titleText, xTitlePosition, 20);

    //Tabla para "Nombre" y "Categoría"
    doc.autoTable({
      startY: 30, // Posición Y donde empieza la tabla
      head: [['NOMBRE', 'Sebastian Quintana'], ['CATEGORÍA', 'USA PRO']],
      body: [],
      theme: 'grid',
      styles: {
        halign: 'center', // Centrar texto en las celdas
        fontSize: 12,
        textColor: [255, 255, 255], // Texto blanco
        fillColor: [31, 41, 55], // Fondo de las celdas con el color #1F2937 (RGB: 31, 41, 55)
      },
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
      },
    });

    // Subtítulo: Evaluaciones Físicas
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10, // Posición Y donde empieza el subtítulo
      head: [['Evaluaciones Físicas']],
      body: [],
      theme: 'grid',
      styles: {
        halign: 'center', // Centrar texto en las celdas
        fontSize: 12,
        textColor: [255, 255, 255], // Texto blanco
        fillColor: [31, 41, 55], // Fondo de las celdas con el color #1F2937 (RGB: 31, 41, 55)
      },
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
      },
    });

    // Texto de la evaluación Squat Jump (SJ)
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Texto en blanco
    const squatJumpText = `
      - Squat Jump (SJ):

      Prueba que mide la potencia del tren inferior del jugador. El jugador comienza en posición 
      de sentadilla en 90°, con las manos en la cintura, y a la indicación del profesor debe, 
      sin bajar para impulsarse, saltar lo más alto posible. Debe mantener las manos en 
      la cintura en todo momento.
    `;
    doc.text(squatJumpText, 10, doc.autoTable.previous.finalY + 10);

    // Crear gráfico debajo del texto de la prueba Squat Jump
    const graphYPosition = doc.autoTable.previous.finalY + 40;

    // Jugador
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('Jugador', 17, graphYPosition + 12); // Etiqueta "Jugador"
    doc.setFillColor(31, 41, 55); //(RGB: 31, 41, 55)
    doc.rect(50, graphYPosition + 5, 40, 10, 'F'); // Rectángulo para la barra del jugador
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('37,9', 66, graphYPosition + 11); // Valor del jugador

    // Categoría\
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('Categoría', 17, graphYPosition + 32); // Etiqueta "Categoría"
    doc.setFillColor(31, 41, 55); // Fondo negro
    doc.rect(50, graphYPosition + 25, 40, 10, 'F'); // Rectángulo para la barra de categoría
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('36,1', 66, graphYPosition + 31); // Valor de la categoría

    // Evaluación (gráfico de colores)
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('Evaluación', 17, graphYPosition + 64); 
    doc.setFillColor(255, 0, 0); // Rojo
    doc.rect(50, graphYPosition + 57, 20, 10, 'F'); // Barra para 'Deficiente'
    doc.setFillColor(255, 255, 0); // Amarillo
    doc.rect(70, graphYPosition + 57, 10, 10, 'F'); // Barra para 'Regular'
    doc.setFillColor(0, 255, 0); // Verde
    doc.rect(80, graphYPosition + 57, 20, 10, 'F'); // Barra para 'Bueno' 
    doc.setFillColor(53, 122, 56); // Azul
    doc.rect(100, graphYPosition + 57, 20, 10, 'F'); // Barra para 'Muy bueno'

    // Números debajo del gráfico
    doc.setTextColor(255, 255, 255); // Texto negro
    doc.setFontSize(10);
    doc.text('0', 50, graphYPosition + 72); // Valor '0'
    doc.text('10', 60, graphYPosition + 72); // Valor '10'
    doc.text('20', 70, graphYPosition + 72); // Valor '20'
    doc.text('30', 85, graphYPosition + 72); // Valor '30'
    doc.text('40', 100, graphYPosition + 72); // Valor '40'
    doc.text('50', 117, graphYPosition + 72); // Valor '50'

    // Texto de leyenda debajo del gráfico
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('El jugador tiene un valor mayor al promedio de la categoría', 55, graphYPosition + 125);

    // Leyenda de colores para la evaluación
    const legendYPosition = graphYPosition + 65;

    // Leyenda - Deficiente
    doc.setFillColor(255, 0, 0); // Rojo
    doc.rect(133, legendYPosition - 55, 5, 5, 'F'); // Cuadro rojo
    doc.text('DEFICIENTE: menor a 27 cms', 140, legendYPosition - 50);

    // Leyenda - Regular
    doc.setFillColor(255, 255, 0); // Amarillo
    doc.rect(133, legendYPosition - 45, 5, 5, 'F'); // Cuadro amarillo
    doc.text('REGULAR: entre 27 y 32,5 cms', 140, legendYPosition - 40);

    // Leyenda - Bueno
    doc.setFillColor(0, 255, 0); // Verde claro
    doc.rect(133, legendYPosition - 35, 5, 5, 'F'); // Cuadro verde claro
    doc.text('BUENO: entre 32,5 y 35,5 cms', 140, legendYPosition - 30);

    // Leyenda - Muy Bueno
    doc.setFillColor(0, 128, 0); // Verde oscuro
    doc.rect(133, legendYPosition - 25, 5, 5, 'F'); // Cuadro verde oscuro
    doc.text('MUY BUENO: Sobre 35,5 cms', 140, legendYPosition - 20);


    // Añadir una nueva página 2
    doc.addPage();

    doc.setFillColor(14, 30, 46);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); 

    // Texto de la evaluación Counter Movement Jump (CMJ)
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Texto en blanco
    const counterMovementJump = `
      - Counter Movement Jump (CMJ):

      Prueba que mide la capacidad de fuerza explosiva elástica de un jugador. El jugador 
      comienza de pie en una posición neutra, pero con las manos en la cintura. A la indicación 
      del profesor, debe bajar lo más rápido posible para luego saltar de forma rápida y así poder 
      llegar lo más alto posible. Debe mantener las manos en la cintura en todo momento.
    `;
    doc.text(counterMovementJump, 10, 30);

    // Jugador
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('Jugador', 17, graphYPosition - 32); // Etiqueta "Jugador"
    doc.setFillColor(31, 41, 55); //(RGB: 31, 41, 55)
    doc.rect(50, graphYPosition - 39, 40, 10, 'F'); // Rectángulo para la barra del jugador
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('37,9', 66, graphYPosition - 32); // Valor del jugador

    // Leyenda - Deficiente
    doc.setFillColor(255, 0, 0); // Rojo
    doc.rect(130, legendYPosition - 100, 5, 5, 'F'); // Cuadro rojo
    doc.text('DEFICIENTE: menor a 27 cms', 137, legendYPosition - 95);

    // Leyenda - Regular
    doc.setFillColor(255, 255, 0); // Amarillo
    doc.rect(130, legendYPosition - 90, 5, 5, 'F'); // Cuadro amarillo
    doc.text('REGULAR: entre 27 y 32,5 cms', 137, legendYPosition - 85);

    // Leyenda - Bueno
    doc.setFillColor(0, 255, 0); // Verde claro
    doc.rect(130, legendYPosition - 80, 5, 5, 'F'); // Cuadro verde claro
    doc.text('BUENO: entre 32,5 y 35,5 cms', 137, legendYPosition - 75);
    
    // Leyenda - Muy Bueno
    doc.setFillColor(0, 128, 0); // Verde oscuro
    doc.rect(130, legendYPosition - 70, 5, 5, 'F'); // Cuadro verde oscuro
    doc.text('MUY BUENO: Sobre 35,5 cms', 137, legendYPosition - 65);


    // Evaluación (gráfico de colores)
    doc.setTextColor(255, 255, 255); // Texto en blanco
    doc.text('Evaluación', 17, graphYPosition + 3); 
    doc.setFillColor(255, 0, 0); // Rojo
    doc.rect(50, graphYPosition - 3, 20, 10, 'F'); // Barra para 'Deficiente'
    doc.setFillColor(255, 255, 0); // Amarillo
    doc.rect(70, graphYPosition - 3, 10, 10, 'F'); // Barra para 'Regular'
    doc.setFillColor(0, 255, 0); // Verde
    doc.rect(80, graphYPosition - 3, 20, 10, 'F'); // Barra para 'Bueno' 
    doc.setFillColor(53, 122, 56); // Verde Oscuro
    doc.rect(100, graphYPosition - 3, 20, 10, 'F'); // Barra para 'Muy bueno'

    // Números debajo del gráfico
    doc.setTextColor(255, 255, 255); // Texto negro
    doc.setFontSize(10);
    doc.text('0', 50, graphYPosition + 12); // Valor '0'
    doc.text('10', 60, graphYPosition + 12); // Valor '10'
    doc.text('20', 70, graphYPosition + 12); // Valor '20'
    doc.text('30', 85, graphYPosition + 12); // Valor '30'
    doc.text('40', 100, graphYPosition + 12); // Valor '40'
    doc.text('50', 117, graphYPosition + 12); // Valor '50'

    // Texto de la evaluación Abalakov
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Texto en blanco
    const Abalakov = `
      - Abalakov (ABK):

      Prueba que mide la capacidad coordinativa entre miembro superior e inferior. El jugador
      comienza en una posición neutra y con las manos libres. A la indicación del profesor, debe
      bajar lo, más rápido posible para luego saltar de forma rápida y así poder llegar lo más alto
      posible. Al tener los brazos en una posición no fija, éstos servirán para tomar impulso y así
      poder saltar más.
    `;
    doc.text(Abalakov, 10, 150);

    doc.autoTable({
      startY: 190, // Posición Y donde empieza la tabla
      head: [['RESULTADO DEL JUGADOR', '51,8', 'MUY BUENO']],
      body: [],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      styles: {
        halign: 'center', // Centrar texto en las celdas
      }
    });

    doc.autoTable({
      startY: 205, // Posición Y donde empieza la tabla
      head: [],
      body: [
        ['DEFICIENTE', 'Menor a 37 cms'],
        ['REGULAR', 'Entre 37 y 41 cms'],
        ['BUENO', 'Entre 41 y 45 cms'],
        ['MUY BUENO', 'Sobre 45 cms']
      ],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 85, halign: 'center', fillColor: [200, 200, 200], textColor: [0, 0, 0] }, // Primera columna
        1: { cellWidth: 97, halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0] },  // Segunda columna
      },
      styles: {
        halign: 'center', 
      }
    });

    // Añadir una nueva página 3
    doc.addPage();

    doc.setFillColor(14, 30, 46);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); 

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Texto en blanco
    const metersT10 = `
      - Aceleración 10 metros (T10):

      Prueba que consiste en correr en el menor tiempo posible 10 metros, entregando como
      información que tan rápido es capaz de acelerar el jugador, comenzando en una posición
      estática. El jugador comienza en posición neutra, y al sonido del silbato, debe salir lo más
      rápido posible para correr en línea recta los 10 metros.
    `;
    doc.text(metersT10, 10, 30);

    doc.autoTable({
      startY: 65, // Posición Y donde empieza la tabla
      head: [['RESULTADO DEL JUGADOR', '1,84', 'BUENO']],
      body: [],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      styles: {
        halign: 'center', // Centrar texto en las celdas
      }
    });

    doc.autoTable({
      startY: 80, // Posición Y donde empieza la tabla
      head: [],
      body: [
        ['DEFICIENTE', 'Mayor que 2 segundos'],
        ['REGULAR', 'Entre 1,85 y 2 segundos'],
        ['BUENO', 'Entre 1,7 y 1,85 segundos'],
        ['MUY BUENO', 'Menor que 1,7 segundos']
      ],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 85, halign: 'center', fillColor: [200, 200, 200], textColor: [0, 0, 0] }, // Primera columna
        1: { cellWidth: 97, halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0] },  // Segunda columna
      },
      styles: {
        halign: 'center', 
      }
    });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Texto en blanco
    const metersT30 = `
      -  Aceleración 30 metros (T30):

      Prueba que consiste en correr en el menor tiempo posible 30 metros, entregando como
      información que tan rápido es capaz de acelerar el jugador, comenzando en una posición
      estática. El jugador comienza en posición neutra, y al sonido del silbato, debe salir lo más
      rápido posible para correr en línea recta los 30 metros.
    `;
    doc.text(metersT30, 10, 130);

    doc.autoTable({
      startY: 170, // Posición Y donde empieza la tabla
      head: [['RESULTADO DEL JUGADOR', '4,39', 'MUY BUENO']],
      body: [],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      styles: {
        halign: 'center', // Centrar texto en las celdas
      }
    });

    doc.autoTable({
      startY: 185, // Posición Y donde empieza la tabla
      head: [],
      body: [
        ['DEFICIENTE', 'Mayor que 5 segundos'],
        ['REGULAR', 'Entre 4,5 y 5 segundos'],
        ['BUENO', 'Entre 4 y 4,5 segundos'],
        ['MUY BUENO', 'Menor que 4 segundos']
      ],
      headStyles: {
        fillColor: [31, 41, 55], // Fondo negro para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
        fontSize: 12,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 85, halign: 'center', fillColor: [200, 200, 200], textColor: [0, 0, 0] }, // Primera columna
        1: { cellWidth: 97, halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0] },  // Segunda columna
      },
      styles: {
        halign: 'center', 
      }
    });

    // Guardar el PDF o abrir en una nueva pestaña
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
</script>

<div>
  <h1>Generar PDF en Svelte</h1>
  <button on:click={generarPDF}>Generar PDF</button>
</div> 


<style>
  div {
    display: flex;
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
  }
</style>