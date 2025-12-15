import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import styles from './Styles';
import image1 from '../../analysts/components/images/DA5.jpg';
import image2 from '../../dco/components/images/unnamed.png'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const GenerateRoa = ({ roaId, icon, disabledIcon, copyType, fileType, copyCode }) => {

    const [report, setReport] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8001/api/report/reportData/${roaId}`)
            .then((response) => {
                setReport(response.data);
            })
            .catch((error) => {
                console.error("Error fetching report data:", error);
                setReport(null);
            })
    }, [roaId]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    function generatePdf() {
        if (!report || !report.roaDetails) return;
        return (
            <Document>
                <Page style={[styles.body, { marginTop: 5, paddingBottom: 250 }]} size="A4">
                    <View style={styles.roaHeaderCont} fixed>
                        <Image style={styles.roaImage} src={image1} />
                        <View style={{ alignItems: 'justify', marginTop: -10 }} >
                            <Text style={styles.normalFont} >Department of Agriculture Regional Field Office 5</Text>
                            <Text style={styles.boldFont} >INTEGRATED LABORATORIES DIVISION</Text>
                            <Text style={styles.font} >Regional Feed Chemical Analysis Laboratory</Text>
                            <Text style={styles.normalFont} >San Agustin, Pili, Camarines Sur</Text>
                        </View>
                    </View>

                    <View style={[styles.row, { position: 'absolute', right: 10, color: 'red', fontSize: 8, border: '2 solid red', padding: 5, marginTop: 8 }]} fixed>
                        <Text>{copyType}</Text>
                    </View>

                    <View style={[styles.boldFont, { marginLeft: 35, marginTop: 15 }]} fixed>
                        <Text>Customer Name: <Text style={{ fontWeight: 'normal' }}>{report.customerName}</Text></Text>
                        <Text>Address: <Text style={{ fontWeight: 'normal' }}>{report.customerAddress}</Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <Text>Contact Number: <Text style={{ fontWeight: 'normal' }}>{report.customerContact}</Text></Text>
                            </View>
                            <View style={{ width: '40%' }}>
                                <Text>Report ID: <Text style={{ fontWeight: 'normal' }}>{report.reportId}-{copyCode}</Text></Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <Text>Date Received: <Text style={{ fontWeight: 'normal' }}>{formatDate(report.dateReceived)}</Text></Text>
                            </View>
                            <View style={{ width: '40%' }}>
                                <Text>Date Issued: <Text style={{ fontWeight: 'normal' }}>{formatDate(report.dateIssued)}</Text></Text>
                            </View>
                        </View>
                        <Text>Date Performed: <Text style={{ fontWeight: 'normal' }}>{report.datePerformed}</Text></Text>
                    </View>

                    <View style={[styles.roaTitle]} fixed>
                        <View style={[styles.row, styles.boldFont]}>
                            <Text style={[{ width: "100%", textAlign: 'center', fontSize: 20 }]}>REPORT OF ANALYSIS</Text>
                        </View>
                    </View>

                    <View style={[styles.roaTable]}>
                        <View style={[styles.row, styles.boldFont]} fixed>
                            <Text style={[styles.roaHeader, styles.specificCell, { width: "20%", paddingTop: 0 }]}>LAB CODE</Text>
                            <Text style={[styles.roaHeader, { width: "20%", paddingTop: 0 }]}>SAMPLE CODE</Text>
                            <Text style={[styles.roaHeader, { width: "28%", paddingTop: 0 }]}>SAMPLE DESCRIPTION</Text>
                            <Text style={[styles.roaHeader, { width: "20%", paddingTop: 0 }]}>PARAMETER </Text>
                            <Text style={[styles.roaHeader, { width: "13%", paddingTop: 0 }]}>RESULT </Text>
                            <Text style={[styles.roaHeader, { width: "29%", paddingTop: 0 }]}>TEST METHOD</Text>
                        </View>
                        {report.roaDetails.map((row, index) => (
                            <View style={styles.row} key={index} wrap={false}>
                                <Text style={[styles.roaCell, styles.specificCell, { width: "20%", textAlign: 'center' }]}>{row.labCode}</Text>
                                <Text style={[styles.roaCell, { width: "20%", textAlign: 'center' }]}>{row.sampleCode}</Text>
                                <Text style={[styles.roaCell, { width: "28%", textAlign: 'center' }]}>{row.sampleDescription}</Text>
                                <Text style={[styles.roaCell, { width: "20%", textAlign: 'center' }]}>{row.sampleParam}</Text>
                                <Text style={[styles.roaCell, { width: "13%", textAlign: 'center' }]}>{row.result}</Text>
                                <Text style={[styles.roaCell, { width: "29%", flexWrap: 'wrap' }]}>{row.testMethod}</Text>
                            </View>
                        ))}
                        <View style={[styles.row, { fontSize: 9, textAlign: 'justify', marginTop: 5 }]} fixed>
                            <Text style={styles.italicFont}>Note: The result is based on the sample received and analyzed by the laboratory. This report shall not be reproduced without full approval of the Department of Agriculture Regional Field Office 5 - Integrated Laboratories Division.</Text>
                        </View>

                    </View>




                    <View style={[styles.font, { paddingLeft: 55, bottom: 180, position: 'absolute' }]} fixed>
                        <Text style={{ fontWeight: 'bold', bottom: 35 }}>Analyzed/Examined By:</Text>
                        <Text style={{ fontWeight: 'bold' }}>{report.analyzedBy}, RCh</Text>
                        <Text>Chemist, PRC License No. {report.analystPRC}</Text>
                    </View>

                    <View style={[styles.font, { paddingLeft: 335, bottom: 180, position: 'absolute' }]} fixed>
                        <Text style={{ fontWeight: 'bold' }}>{report.analyzedBy2}, RCh</Text>
                        <Text>Chemist, PRC License No. {report.analystPRC2}</Text>
                    </View>

                    <View style={[styles.row, { position: 'absolute', bottom: 95, gap: 35 }]} fixed>
                        <View style={[styles.font, { paddingLeft: 55 }]}>
                            <Text style={{ fontWeight: 'bold', bottom: 30 }}>Certified By:</Text>
                            <Text style={{ fontWeight: 'bold' }}>CORREN HOLLY M. MONSALVE, Rch</Text>
                            <Text>Laboratory Head, Chemist III</Text>
                            <Text>PRC License No. 0011021</Text>
                        </View>

                        <View style={[styles.font, { paddingLeft: 72 }]}>
                            <Text style={{ fontWeight: 'bold', bottom: 30 }}>Noted By:</Text>
                            <Text style={{ fontWeight: 'bold' }}>ANACLETO B. ESPLANA, RAgr</Text>
                            <Text>OIC-Chief, Integrated Laboratories Division</Text>
                            <Text>PRC LIC.NO.0020472</Text>
                        </View>
                    </View>


                    <View style={[styles.footer, { position: 'absolute', bottom: 20, left: 20, }]} fixed>
                        <View style={[styles.font]}>
                            <Text>ILD-RFCAL-005-1</Text>
                            <Text>Effectivity Date: April 14,2025</Text>
                        </View>
                    </View>
                    <Image style={[styles.roaUkas, { position: 'absolute', bottom: 42, right: 15 }]} src={image2} fixed />
                    <Text
                        style={[styles.pageNumber, { right: 30 }]}
                        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
                        fixed />
                </Page>
            </Document>
        )
    }

    return (
        <>
            {report ? (
                <PDFDownloadLink document={generatePdf()} fileName={`${report.reportId}${fileType}`} style={{ padding: 0 }}>
                    <button className="btn p-0 border-0">
                        {icon}
                    </button>
                </PDFDownloadLink>
            ) : (
                <button className="btn p-0 border-0" disabled>
                    {disabledIcon}
                </button>
            )}
        </>
    )

}

export default GenerateRoa