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

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }, 1000);
}
