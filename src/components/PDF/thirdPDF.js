import jsPDF from "jspdf";
import "jspdf-autotable";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);

export default function ThirdPDF() {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 600;
  document.body.appendChild(canvas);

  const data = {
    labels: [
      "Cognitiva",
      "Condicional",
      "Coordinativa",
      "Emotiva",
      "Expresiva",
      "Mental",
      "Socio-afectiva",
    ],
    datasets: [
      {
        label: "Jugador",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Categoria",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  };

  const chart = new Chart(canvas, {
    type: "radar",
    data: data,
    options: {
      responsive: false, // Ensure fixed size for PDF rendering
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
      scales: {
        r: {
          pointLabels: {
            color: "white",
            font: {
              size: 14,
            },
          },
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });

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

    // Título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleText = "Informe Técnico";
    const textWidth = doc.getTextWidth(titleText);
    const xTitlePosition = (pageWidth - textWidth) / 2;
    doc.text(titleText, xTitlePosition, 20);

    doc.autoTable({
      startY: 30,
      head: [
        ["NOMBRE", "Sebastian Quintana"],
        ["CATEGORÍA", "USA PRO"],
      ],
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

    // Subtítulo: Evaluaciones Físicas
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 7,
      head: [["1. DEFINICIÓN DE ESTRUCTURAS DEL JUGADOR:"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const conditionalStructure = `
    - Estructura Condicional:

        Basada en las cualidades físicas (fuerza, velocidad, resistencia, etc.), en las cuales se
        resustentan las demás cualidades (resistencia, potencia, velocidad, coordinación).
  `;
    doc.text(conditionalStructure, 15, doc.autoTable.previous.finalY + 5);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const coordinatingStructure = `
    - Estructura Coordinativa:
    
        La “TAREA” se considera como el vehículo que permite relacionar al deportista con las
        acciones que se presenten en el juego. La TAREA permite que exista interacción, que 
        los esquemas motrices, cognitivos, condicionales se modifiquen y puedan cambiar. Todo 
        esto llevara a lograr el proceso de optimización del deportista y debe de ser 
        adaptada a lo larga de su vida deportiva.
  `;
    doc.text(coordinatingStructure, 15, doc.autoTable.previous.finalY + 30);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const cognitiveStructure = `
    - Estructura Cognitiva:
    
       Conocimientos y reconocimiento de la información para que el jugador realice las 
       acciones del juego. Esto compone las capacidades cognitivas, que representan las 
       capacidades humanas de vital importancia para el fútbol.
  `;
    doc.text(cognitiveStructure, 15, doc.autoTable.previous.finalY + 70);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const emotionalVolitiveStructure = `
    - Estructura Emotivo-Volitiva:
    
      Es aquella que nos mueve a hacer acciones por las cuales conseguimos la satisfacción del
      deseo personal de obtener reconocimiento o simplemente la satisfacción de haber hecho
      bien la tarea. La podemos relacionar con las necesidades personales del jugador y que
      supondrán que éste se mueva para satisfacerlas. 
  `;
    doc.text(
      emotionalVolitiveStructure,
      15,
      doc.autoTable.previous.finalY + 100
    );

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const expressiveCreativeStructure = `
    - Estructura Expresivo-Creativa:
    
      Es la estructura que consiste en tratar de sacar la originalidad del jugador y todos sus
      conocimientos. La sorpresa entra en juego en esta estructura en donde el jugador deberá
      desarrollar un grado de inteligencia para manifestar creatividad frente a sus adversarios y 
      al mismo tiempo comprender las acciones sorpresivas de sus compañeros de equipo.
  `;
    doc.text(
      expressiveCreativeStructure,
      15,
      doc.autoTable.previous.finalY + 135
    );

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const mentalStructure = `
    - Estructura Mental:
    
      Como el jugador va manifestando respuesta a situaciones cambiantes e imprevistas (ir
      ganando o perdiendo un partido, situaciones arbitrarias desfavorables o no, etc.) que
      desequilibran su estado habitual y lo obligan a que pueda ajustarse a las nuevas 
      situaciones e incorporarlas a su configuración inicial.
  `;
    doc.text(mentalStructure, 15, doc.autoTable.previous.finalY + 170);

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

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const socioAffectiveStructure = `
    - Estructura Socio-Afectiva:
    
      Referente a las relaciones interpersonales e intergrupales que se establecen, éstas son
      responsables del éxito al cual se aspira cuando se compite.
  `;
    doc.text(socioAffectiveStructure, 15, doc.autoTable.previous.finalY - 40);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY - 10,
      head: [["EVALUACIÓN DEL JUGADOR, EN BASE A ESTRUCTURAS:"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    //                            (X, Y, Ancho, Alto)
    doc.addImage(chartImg, "PNG", 45, 65, 120, 120);

    doc.autoTable({
      startY: 205,
      head: [["ESTRUCTURA", "JUGADOR", "CATEGORÍA"]],
      body: [
        ["Cognitiva", "6.7", "6.5"],
        ["Condicional", "6.3", "6.1"],
        ["Coordinativa", "6.7", "6.6"],
        ["Emotiva", "6.4", "6.3"],
        ["Expresiva", "6.8", "6.4"],
        ["Mental", "6.4", "5.5"],
        ["Socio-afectiva", "5.8", "6.2"],
        ["PROMEDIO", "6.4", "6.2"],
      ],
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
      columnStyles: {
        0: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        1: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        2: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      },
    });

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
      startY: 15,
      head: [["DETALLE DE PARTIDOS DISPUTADOS:"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.autoTable({
      startY: 30,
      head: [["POSICION DEL JUGADOR EN CANCHA", ""]],
      body: [
        ["Principal", "Mediocentro"],
        ["Secundaria", "Interior Izquierdo"],
      ],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          cellWidth: 100,
        },
        1: {
          cellWidth: 81,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      },
    });

    doc.autoTable({
      startY: 70,
      head: [["ENTRENAMIENTOS", "", ""]],
      body: [
        ["Total Categoría", "Asistidos", "% Asistencia"],
        ["71", "65", "91.7%"],
      ],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          cellWidth: 60,
        },
        1: {
          cellWidth: 60,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        2: {
          cellWidth: 60,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      },
    });

    doc.autoTable({
      startY: 110,
      head: [["PARTIDOS", "", "", "", ""]],
      body: [
        [
          "Total Categoría",
          "Citaciones",
          "% De participación",
          "Titularidades",
          "Ingresos como Suplente",
        ],
        ["12", "12", "91.7%", "12", "0"],
      ],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          cellWidth: 35,
        },
        1: {
          cellWidth: 35,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        2: {
          cellWidth: 35,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        3: {
          cellWidth: 35,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        4: {
          cellWidth: 40,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      },
    });

    doc.autoTable({
      startY: 150,
      head: [["2. ANEXO DEL ÁREA FÍSICA"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const anthropometricVariables = `
    - Variables Antropométricas:

      Consideramos las mediciones antropométricas como un elemento clave para un correcto
      desarrollo deportivo que conlleva a una adecuada evaluación nutricional. Es por ello que
      medimos a los jugadores y jugadoras en peso, altura e IMC (Índice de Masa Corporal), para
      establecer un punto de referencia comparativo de cara a lo que será el 2do Semestre 2023.
    `;
    doc.text(anthropometricVariables, 10, doc.autoTable.previous.finalY + 5);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const yoyoTest = `
    - YOYO Test (de recuperación intermitente):

      Mide la capacidad máxima, de forma indirecta, del consumo de oxígeno de los deportistas,
      lo cuál se traduce en que tanto (volumen) puede el organismo transportar oxígeno por
      unidad de tiempo.
      Los jugadores/as deben recorrer una distancia de 20 metros de ida y vuelta con una
      recuperación de 10 segundos por cada silbato.
      La velocidad de desplazamiento debe ir aumentando progresivamente hasta alcanzar el
      agotamiento, donde el jugador abandona la prueba. Esto tiene como finalidad, medir la
      capacidad de recuperación ante esfuerzos intermitentes progresivos.
    `;
    doc.text(yoyoTest, 10, doc.autoTable.previous.finalY + 45);

    // Añadir una nueva página 4
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
      startY: 20,
      head: [["VARIABLES ANTROPOMÉTRICAS"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.autoTable({
      startY: 40,
      theme: "grid",
      head: [["Medidas Corporales", ""]],
      body: [
        ["Altura", "1,70 mts"],
        ["Peso", "60 kg"],
      ],
      margin: { left: 10 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 40 },
      },

      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
    });

    doc.autoTable({
      startY: 40,
      margin: { left: 105 },
      theme: "grid",
      head: [["IMC"]],
      body: [["19"]],
      columnStyles: {
        0: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
    });

    doc.autoTable({
      startY: 75,
      head: [["YOYO TEST"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.autoTable({
      startY: 90,
      theme: "grid",
      head: [["JUGADOR", "CATEGORIA"]],
      body: [["54,2", "47,5"]],
      columnStyles: {
        0: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
    });

    doc.autoTable({
      startY: 105,
      head: [["El valor del jugador es superior al promedio de la categoría"]],
      body: [],
      theme: "grid",
      styles: {
        halign: "left",
        fontSize: 12,
        textColor: [255, 255, 255],
        fillColor: [31, 41, 55],
      },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
      },
    });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const technicalComments = `
    - COMENTARIOS TÉCNICOS:

      Sebastian es uno de los jugadores más dotados tecnicamente dentro del plantel. Muy 
      bueno en todos los aspectos del juego y siempre dispuesto a cooperar con el colectivo. 
      Debe mejorar su responsabilidad/concentración con respecto a la indumentaria de juego 
      que corresponde en los días de entrenamiento, ya que siempre le falta o se le queda algo. 
      Además de seguir sacando más voz de mando dentro del cancha, ya que es alguien 
      que entiende muy bien el juego.
    `;
    doc.text(technicalComments, 10, doc.autoTable.previous.finalY + 15);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const physicalComments = `
    - COMENTARIOS FÍSICOS: 

      Es un mediocampista fisicamente completo. Es fuerte, ágil, resistente y con un buen 
      rechazo. Debe, de todas formas, aumentar su porcentaje de masa muscular para ser un 
      jugador explosivo y rápido al momento de desplazance dentro del campo de juego. A 
      pesar de que no destaca en las evaluaciones de velocidad, si lo hace en la evaluación 
      de resistencia, cualidad primordial para desempeñarse de buena forma en su posición.
    `;
    doc.text(physicalComments, 10, doc.autoTable.previous.finalY + 65);

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);

    document.body.removeChild(canvas);
  }, 1000);
}
