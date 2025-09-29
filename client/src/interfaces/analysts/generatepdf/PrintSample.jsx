import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { font } from '../../../Fonts/Cam'
import { ital } from '../../../Fonts/CamItalic'
import { fontBold } from '../../../Fonts/Cam'
import { DAV } from '../components/images/DA5'

function PrintSample({ sampleId }) { // Accept sampleId as a prop
    const [sample, setSamples] = useState(null);

    useEffect(() => {
        // Fetch sample data using the sampleId passed as a prop
        axios.get(`http://localhost:8001/api/samples/${sampleId}`)
            .then((response) => {
                setSamples(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sample:", error);
                setSamples(null);
            });
    }, [sampleId]);

    // Function to generate PDF
    const generatePDF = () => {
        if (!sample) return;

        const doc = new jsPDF({ unit: 'pt', format: [595.276, 842], orientation: 'portrait' });

        doc.addFileToVFS('Cambria-Font-For-Windows.ttf', font);
                doc.addFont('Cambria-Font-For-Windows.ttf', 'cam','bold');
        
                doc.addFileToVFS('Cambria-Italic.ttf', ital)
                doc.addFont('Cambria-Italic.ttf', 'camItal', 'italic')
        
                doc.addFileToVFS('Cambria-Bold.ttf', fontBold)
                doc.addFont('Cambria-Bold.ttf', 'camBold', 'bold')
                
        
                console.log(doc.getFontList());
        
                doc.addImage(DAV, 'PNG', 40, 20, 85.7, 75.7);
        
        
                doc.setFont('camBold', 'bold')
                doc.setFontSize('11')
                doc.text(236,40,'Department of Agriculture')
                doc.text(237,51,'Regional Field Office No. 5')
        
                doc.setFontSize('11')
                doc.text(203,62,'INTEGRATED LABORATORIES DIVISION')
        
                doc.setFontSize('11')
                doc.text(190,73,'Regional Feed Chemical Analysis Laboratory')
        
                doc.text(36.9,115,'Customer Name:')
                doc.text(302,115,'Report Number:')
                doc.text(36.9,140,'Address:')
                doc.text(302,140,'Date Issued:')
                doc.text(302,170,'OR #:')
                doc.text(302,185,'Amount Paid:')
                doc.text(36.9,185,'Contact Number:')
                doc.text(36.9,205,'Date/Time Received:')
                doc.text(36.9,218,'Received By:')
                doc.text(36.9,230,'Date Performed:')
        
                doc.setFontSize('11')
                const x = 36.9; // X position
                const y = 240; // Y position
                const width = 521.48; // Width of the rectangle
                const height = 30; // Height of the rectangle
                const highlightColor = '#A8D08D'; // Yellow highlight color
        
                // Set the fill color and draw the rectangle
                doc.setFillColor(highlightColor);
                doc.rect(x, y, width, height, 'F'); // 'F' for fill
        
                // Set text color and add text inside the rectangle
                doc.setTextColor('#000000'); // Black text color
                doc.setFontSize(11);
                doc.text(x + 185, y + 20, 'REPORT OF ANALYSIS (ROA)');
        
        
        autoTable(doc, {
                startY: y + height + 15,
                head: [["Sample Code", "Lab Code", "Sample \nDescription", "Parameter", "Result", "Test Method"]],
                body: [[
                    sample.sampleCode,
                    sample.labCode, 
                    sample.sampleDescription, 
                    sample.testParameter,
                    sample.sampleResult,
                    sample.testMethod
                ]],
            theme: 'grid',
            styles: { font: "camBold", fontSize: 11, lineColor: [0,0,0] },
            headStyles: {
                fillColor: [168, 208, 141],
                textColor: 0,
                halign: 'center',
                valign: 'middle',
                lineWidth: 0.1,
                lineColor: [0,0,0],
            },
            margin: { left: x, right: 14 },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { cellWidth: 70 },
                2: { cellWidth: 120 },
                3: { cellWidth: 70 },
                4: { cellWidth: 70 },
                5: { cellWidth: 90 }
            }
        });

        const txt = "Results of analysis relate only to the sample(s) as received from Ms. Claire G. Tino.   Reproduction and excerpts from this report unless otherwise \nauthorized by Regional Feed Chemical Analysis Laboratory (RFCAL) is not allowed. Any erasures thereon will invalidate the report."

        doc.setFont('camItal', 'italic')
        doc.setFontSize(9)
        doc.text(36.9,390,txt)

        doc.setFont('camBold','bold')
        doc.setFontSize(11)
        doc.text(84,440,'Analyzed by:')
        doc.text(84,478,'DANICA MAE B.RODRIGUEZ, RCh')

        doc.setFont('cam','normal')
        doc.text(84,491,'Chemist')
        doc.text(84,501,'PRC License No. 0015235')

        doc.setFont('camBold','bold')
        doc.text(350,440,'Certified True and Corrected by:')
        doc.text(350,478,'COREN HOLLY M. MONSALVE, RCh')

        doc.setFont('cam','normal')
        doc.text(350,491,'Laboratory Head, Chemist II')
        doc.text(350,501,'PRC License No. 0011021')

        doc.setFont('camBold','bold')
        doc.text(225,550,'Noted by:')
        doc.text(240,590,'ANALECTO B. ESPLANA')

        doc.setFont('cam','normal')
        doc.text(229,600,'Chief, Integrated Laboratories Division')

        doc.save(`Sample_${sampleId}.pdf`);
    };

    return (
        <button onClick={generatePDF} className="btn p-0 border-0">
            <i className="bi bi-box-arrow-down text-primary "></i>
        </button>
    );
}

export default PrintSample;
