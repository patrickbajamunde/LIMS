import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import styles from './Styles';
import image1 from '../../analysts/components/images/DA5.jpg';
import terms from './data/Terms';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
const TestPdf = ({ requestId, icon, disabledIcon }) => {

    const [request, setRequest] = useState(null)

    useEffect(() => {
        // Fetch request data using the requestId passed as a prop
        axios.get(`http://192.168.100.177:8001/api/client/getClient/${requestId}`)
            .then((response) => {
                setRequest(response.data);
            })
            .catch((error) => {
                console.error("Error fetching request:", error);
                setRequest(null);
            });
    }, [requestId]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const generatePdf = () => {
        if (!request || !request.sampleDetails) return null;
        return (
            <Document>
                <Page style={[styles.body, { marginTop: 10 }]} size="A4">
                    <View style={[styles.headerContainer3, styles.row, { width: '92%', marginLeft: 25 }]} >
                        <View style={[styles.headerCell, { justifyContent: 'center' }]}>
                            <Image style={styles.image} src={image1} />
                        </View>

                        <View style={[styles.headerOffice, styles.headerCell]}>
                            <View style={{ lineHeight: 0.7 }}>
                                <Text style={[styles.normalFont, { fontSize: 7 }]} >Republic of the Philippines</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >DEPARTMENT OF AGRICULTURE</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >REGIONAL FIELD OFFICE 5</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >INTEGRATED LABORATORIES DIVISION</Text>
                                <Text style={[styles.normalFont, { fontSize: 7 }]} >San Agustin, Pili, Camarines Sur</Text>
                            </View>
                        </View>

                        <View style={[styles.formTitle, styles.headerCell]} >
                            <Text style={[styles.titleBold, { fontSize: 12, paddingLeft: 2, paddingRight: 2 }]}>ANALYSIS REQUEST FORM (ARF)</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column', }]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 15 }]}>Document Code</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5 }]}>ILD5-RFCAL-001-0</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 25 }]}>Record ID</Text>
                            <Text style={[styles.normalFont, { fontSize: 8, paddingRight: 2, paddingLeft: 2 }]}>{request.requestId}</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column', borderRightWidth: 0 }]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 5 }]}>Effectivity Date</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5 }]}>March 17, 2026</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 20 }]}>Page No.</Text>
                            <Text
                                style={styles.testPdfpage}
                                render={({ pageNumber, totalPages }) => pageNumber <= 2 ? ` ${pageNumber}   of   2` : ''}
                                fixed />
                        </View>
                    </View>


                    <View style={[styles.contentNormal, { marginLeft: 25, marginTop: 15 }]}>
                        <View style={[styles.contentNormal, styles.row]}>
                            <Text style={{ width: '60%' }}>Customer Name: {request.clientName}</Text>
                            <Text style={{ width: '40%' }}>Transaction Date: {formatDate(request.transactionDate)}</Text>
                        </View>
                        <Text>Gender: {request.clientGender}</Text>
                        <Text>Address: {request.clientAddress}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <Text>Contact No./Email Add: {request.clientEmail}</Text>
                            </View>
                        </View>
                        <Text>Date of Sample Disposal: {formatDate(request.sampleDisposal)}</Text>
                        <View style={[styles.row]}>
                            <Text>Document Type: </Text>
                            <View style={[styles.row, { alignItems: 'center', marginLeft: 15 }]}>
                                <Text style={styles.checkbox}></Text>
                                <Text>Hard Copy</Text>
                            </View>
                            <View style={[styles.row, { alignItems: 'center', marginLeft: 20 }]}>
                                <Text style={styles.checkbox}></Text>
                                <Text>E-copy</Text>
                            </View>
                        </View>
                        <Text>Report due date: {formatDate(request.reportDue)}</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={[styles.header, { width: "15%", paddingTop: 0 }]}>LAB CODE</Text>
                            <Text style={[styles.header, { width: "15%", paddingTop: 0 }]}>SAMPLE CODE</Text>
                            <Text style={[styles.header, { width: "25%", paddingTop: 0 }]}>SAMPLE DESCRIPTION</Text>
                            <Text style={[styles.header, { width: "18%", paddingTop: 0 }]}>TEST PARAMETER REQUESTED</Text>
                            <Text style={[styles.header, { width: "27%", paddingTop: 0 }]}>TEST METHOD</Text>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.cell, { width: "15%", fontSize: 10 }]}>
                                {request.sampleDetails.map((s, index) => (
                                    <View key={index} style={{ paddingBottom: 23 }}>
                                        <Text>{s.labCode?.substring(0, 14)}</Text>
                                        <Text>{s.labCode?.substring(14)}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={[styles.cell, { width: "15%", fontSize: 10 }]}>
                                {request.sampleDetails.map((s, index) => (
                                    <View key={index} style={{ paddingBottom: 23 }}>
                                        <Text>{s.sampleCode?.substring(0, 11)}</Text>
                                        <Text>{s.sampleCode?.substring(11)}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={[styles.cell, { width: "25%", fontSize: 10, textAlign: 'left' }]}>
                                {request.sampleDetails.map((row, index) => (
                                    <View key={index} style={{ paddingBottom: 23, flexDirection: "row" }} >
                                        <Text style={{ marginRight: 4 }}>{index + 1}.</Text>
                                        <Text style={{ flex: 1 }} hyphenationCallback={word => [word]}>{row.sampleDescription}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={[styles.cell, { width: "18%", fontSize: 10 }]}>
                                {request.sampleDetails.map((row, index) => (
                                    <View key={index} style={{ paddingBottom: 23 }} >
                                        <Text hyphenationCallback={word => [word]}>{row.parameterReq}</Text>
                                    </View>
                                ))}
                            </View>

                            <Text style={[styles.cell, { width: "27%", fontSize: 10, textAlign: 'left' }]} >{request.sampleDetails.map(s => s.methodReq).join("\n")}</Text>
                        </View>
                    </View>
                    <Text style={[styles.font, { marginLeft: 25, marginTop: 3 }]}>Discussed with customer:</Text>
                    <View style={[styles.row, { paddingLeft: 25, marginTop: 15, textAlign: 'justify' }]}>
                        <Text style={styles.boldFont}>Conforme:</Text>
                        <Text style={[styles.italicFont, { fontSize: 11, }]}> I have agreed to the details including the terms and conditions stated in this Analysis Request Form</Text>
                    </View>



                    <View style={[styles.row, styles.font, { paddingLeft: 25, marginTop: 15 }]}>
                        <Text>Mode of Release:</Text>
                        <View style={[styles.row, { alignItems: 'center', marginLeft: 24 }]}>
                            <Text style={styles.checkbox}></Text>
                            <Text>Personal</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', marginLeft: 56 }]}>
                            <Text style={styles.checkbox}></Text>
                            <Text>Authorized Representative</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', marginLeft: 25 }]}>
                            <Text style={styles.checkbox}></Text>
                            <Text>E-mail</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.font, { marginTop: 15, paddingLeft: 25, marginBottom: 0 }]}>Customer Signature:</Text>
                        <Text style={[styles.font, { marginTop: 15, paddingLeft: 25, marginBottom: 0 }]}>____________________________________________________</Text>
                    </View>
                    <View style={[styles.row, styles.font, { marginTop: 15, paddingLeft: 25 }]}>
                        <View>
                            <Text style={styles.boldFont}>Samples Submitted by:</Text>
                            <Text style={{ marginTop: 15 }}>Name: ____________________________________________</Text>
                            <Text style={{ marginTop: 15 }}>Signature: ________________________________________</Text>
                        </View>
                        <View style={{ marginLeft: 84 }}>
                            <Text style={styles.boldFont}>Samples Received by:</Text>
                            <Text style={{ marginTop: 15 }}>Name: ____________________________________________</Text>
                            <Text style={{ marginTop: 15 }}>Signature: ________________________________________</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.font, { paddingLeft: 25, marginTop: 16 }]}>ILD-RFCAL-001-1{'\n'}Effectivity Date: March 17, 2026</Text>
                    </View>
                    <Text style={[styles.font, { marginLeft: 25 }]}>
                        -----------------------------------------------------------------------------------------------------------------------------------------------------
                    </Text>
                    <View style={[{ width: '100%', textAlign: 'center', }]}>
                        <Text style={[styles.boldFont, { textAlign: 'center' }]}>
                            AUTHORIZATION/CLAIM STUB {'\n'} (DA-RFCAL 5)
                        </Text>
                    </View>
                    <Text style={[styles.font, { marginLeft: 25 }]}>Report due date:________________________</Text>
                    <Text style={[styles.font, { marginLeft: 110, marginRight: 25, textAlign: 'justify', marginTop: 20 }]}>I hereby authorize _______________________________________________________, to claim the Report of</Text>
                    <Text style={[styles.font, { marginLeft: 25 }]}>Analysis in my behalf.</Text>
                    <View style={{ textAlign: 'right', marginRight: 35, marginTop: 5 }}>
                        <Text style={styles.font}>_______________________________________</Text>
                        <Text style={[styles.font, { marginRight: 13 }]}>Signature of the Customer</Text>
                    </View>


                </Page>
                <Page>
                    <View style={[styles.headerContainer3, styles.row, { marginTop: 10 ,width: '92%', marginLeft: 25 }]}>
                        <View style={[styles.headerCell, { justifyContent: 'center' }]}>
                            <Image style={styles.image} src={image1} />
                        </View>

                        <View style={[styles.headerOffice, styles.headerCell]}>
                            <View style={{ lineHeight: 0.7 }}>
                                <Text style={[styles.normalFont, { fontSize: 7 }]} >Republic of the Philippines</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >DEPARTMENT OF AGRICULTURE</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >REGIONAL FIELD OFFICE 5</Text>
                                <Text style={[styles.boldFont, { fontSize: 7 }]} >INTEGRATED LABORATORIES DIVISION</Text>
                                <Text style={[styles.normalFont, { fontSize: 7 }]} >San Agustin, Pili, Camarines Sur</Text>
                            </View>
                        </View>

                        <View style={[styles.formTitle, styles.headerCell]} >
                            <Text style={[styles.titleBold, { fontSize: 12, paddingLeft: 2, paddingRight: 2 }]}>ANALYSIS REQUEST FORM (ARF)</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column', }]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 15 }]}>Document Code</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5 }]}>ILD5-RFCAL-001-0</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 25 }]}>Record ID</Text>
                            <Text style={[styles.normalFont, { fontSize: 8, paddingRight: 2, paddingLeft: 2 }]}>{request.requestId}</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column', borderRightWidth: 0 }]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 5 }]}>Effectivity Date</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5 }]}>March 17, 2026</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 20 }]}>Page No.</Text>
                            <Text
                                style={styles.testPdfpage}
                                render={({ pageNumber, totalPages }) => pageNumber <= 2 ? ` ${pageNumber}   of   2` : ''}
                                fixed />
                        </View>
                    </View>
                    <Text style={[styles.termsBold, { marginLeft: 72, marginRight: 72, marginTop: 25, fontSize: 10 }]}>Terms & Conditions</Text>
                    {terms.map((term, index) => (
                        <View key={index} style={{ marginLeft: 72, marginRight: 72, fontSize: 10 }}>
                            <Text style={[styles.row, { flexWrap: 'wrap' }]}>
                                <Text style={styles.termsBold}>{`${term.title}`}</Text>
                                <Text style={styles.termsNormal}>{`${term.content}`}</Text>
                            </Text>
                        </View>
                    ))}

                </Page>
            </Document>
        )
    }

    const handleDownload = async () => {
        const blob = await pdf(generatePdf()).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${request.requestId}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {request ? (
                <button className="btn p-0 border-0" onClick={handleDownload}>
                    {icon}
                </button>
            ) : (
                <button className="btn p-0 border-0" disabled>
                    {disabledIcon}
                </button>
            )}
        </>
    );

}

export default TestPdf