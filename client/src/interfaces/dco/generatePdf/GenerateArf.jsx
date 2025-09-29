import React, {PureComponent} from 'react'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { font } from '../../../Fonts/Cam'
import { ital } from '../../../Fonts/CamItalic'
import { fontBold } from '../../../Fonts/Cam'
import { DAV } from '../../analysts/components/images/DA5'

export default class GenerateArf extends PureComponent{



    constructor(props){
        super(props)

        this.state = {

        }
    }

    jsPdfGenerator = () => {
        const doc = new jsPDF({ unit: 'pt', format: [595.35, 842], orientation: 'portrait' });
        doc.addFileToVFS('Cambria-Font-For-Windows.ttf', font);
        doc.addFont('Cambria-Font-For-Windows.ttf', 'cam','bold');

        doc.addFileToVFS('Cambria-Italic.ttf', ital)
        doc.addFont('Cambria-Italic.ttf', 'cam', 'italic')

        doc.addFileToVFS('Cambria-Bold.ttf', fontBold)
        doc.addFont('Cambria-Bold.ttf', 'cam', 'bold')
        

        console.log(doc.getFontList());

        doc.addImage(DAV, 'PNG', 40, 20, 96.39, 86.5);

        doc.setFont('cam', 'normal')
        doc.setFontSize('10')
        doc.text(236,40,'Republic of the Philippines')

        doc.setFont('cam', 'bold')
        doc.setFontSize('11')
        doc.text(209.5,51,'DEPARTMENT OF AGRICULTURE')

        doc.setFont('cam', 'bold')
        doc.setFontSize('11')
        doc.text(224,62,'REGIONAL FIELD OFFICE 5')

        doc.setFont('cam', 'normal')
        doc.setFontSize('10')
        doc.text(224,73,'San Agustin, Pili, Camarines Sur')

        doc.setFont('cam', 'bold')
        doc.setFontSize('11')
        doc.text(208.5,130,'ANALYSIS REQUEST FORM (ARF)')

        doc.setFont('cam', 'normal')
        doc.setFontSize('11')
        doc.text(352,155,'Request ID:')

        doc.setFont('cam', 'normal')
        doc.setFontSize('11')
        doc.text(352,166,'Transaction Date:')

        doc.setFontSize('11')
        doc.text(64,178,'Customer Name:')
        doc.text(64,189,'Gender:')
        doc.text(64,200,'Address:')
        doc.text(64,211,'Contact No./Email Add:')
        doc.text(64,223,'Date of Sample Disposal:')
        doc.text(352,211,'Report due date:')








        
        doc.setFontSize('11')
        const x = 58; // X position
        const y = 240; // Y position
        const width = 400.48; // Width of the rectangle
        const height = 30; // Height of the rectangle

        const tableColumn = ["LAB CODE", "SAMPLE CODE", "SAMPLE DESCRIPTION", "TEST PARAMETER \nREQUESTED","TEST METHOD"];
        const tableRows = [
            [
                { content: "Customer Name Customer Name Customer NameCustomer Name", styles: { minCellHeight: 70 } },
                { content: "test", styles: { minCellHeight: 70 } },
                { content: "test", styles: { minCellHeight: 70 } },
                { content: "test", styles: { minCellHeight: 70 } },
                {
                content: "Titrimetric Method (AOAC 972.02), Molybdovanadate Method, Kjeldahl (AOAC 2001.11), Gravimetric Method (AOAC 930.15), Soxhlet Extraction - Indirect Method (AOAC 920.39), Gravimetric Method (AOA 942.05)Titrimetric Method (AOAC 972.02), Molybdovanadate Method, Kjeldahl (AOAC 2001.11), Gravimetric Method (AOAC 930.15), Soxhlet Extraction - Indirect Method (AOAC 920.39), Gravimetric Method (AOA 942.05)",
                styles: { minCellHeight: 70 }
                }
            ]
            ];

        autoTable(doc,{
            startY: 250, // Starting Y position for the table
            head: [tableColumn],
            body: tableRows,
            theme: 'grid', // You can use 'striped', 'grid', or 'plain'
            styles: { font: 'cam', fontStyle: 'normal', fontSize: 11, lineColor: [0,0,0]
            },
            headStyles: {
                fillColor: [217, 217, 217], // Yellow color for the table head background
                textColor: 0, // Black text color for the table head
                halign: 'center', // Horizontal alignment
                valign: 'top', // Vertical alignment
                lineWidth: 0.1,
                lineColor: [0,0,0],
                cellPadding: {
                    top:2,
                    bottom:2,
                }, 
            },
            
            margin: {left: x, right:5},
            columnStyles: {
                0: { cellWidth: 75.78 },
                1: { cellWidth: 88 },
                2: { cellWidth: 123 },
                3: { cellWidth: 105 },
                4: { cellWidth: 93 },
            },

            bodyStyles: {
            cellPadding: { bottom: 10 }, // ⬅️ Increases row height
            minCellHeight: 20, // ⬅️ Ensures minimum height for each cell
            }
        });


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
        

        doc.save("ROA.pdf");

    }

    render(){
        return(
            <button 
            className=" btn p-0 border-0" 
            onClick={(e) => {
                e.preventDefault();
                this.jsPdfGenerator();
            }}
            >
            <i className="bi bi-box-arrow-down text-primary "></i>
            </button>
        )
    }
}

