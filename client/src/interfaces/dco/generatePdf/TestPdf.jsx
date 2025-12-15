import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import styles from './Styles';
import image1 from '../../analysts/components/images/DA5.jpg';
import image2 from '../../dco/components/images/unnamed.png'
import terms from './data/Terms';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const TestPdf = ({ requestId, icon, disabledIcon }) => {

    const [request, setRequest] = useState(null)

    useEffect(() => {
        // Fetch request data using the requestId passed as a prop
        axios.get(`http://localhost:8001/api/client/getClient/${requestId}`)
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
        if (!request || !request.sampleDetails || !request.ArfAttachment) return;
        return (
            <Document>
                <Page style={[styles.body, { marginTop: 5 }]} size="A4">
                    <View style={styles.headerContainer}>
                        <Image style={styles.image} src={image1} />
                        <View style={{ alignItems: 'center', marginTop: -31 }} >
                            <Text style={styles.normalFont} >Republic of the Philippines</Text>
                            <Text style={styles.boldFont} >DEPARTMENT OF AGRICULTURE</Text>
                            <Text style={styles.boldFont} >REGIONAL FIELD OFFICE 5</Text>
                            <Text style={styles.normalFont} >San Agustin, Pili, Camarines Sur</Text>
                        </View>
                    </View>
                    <View style={styles.title} >
                        <Text style={styles.titleBold}>ANALYSIS REQUEST FORM (ARF)</Text>
                    </View>
                    <View style={[styles.contentNormal, { marginLeft: 366, marginTop: 17, }]}>
                        <Text>Request ID: {request.requestId}</Text>
                        <Text>Transaction Date: {formatDate(request.transactionDate)}</Text>
                    </View>
                    <View style={[styles.contentNormal, { marginLeft: 72 }]}>
                        <Text>Customer Name: {request.clientName}</Text>
                        <Text>Gender: {request.clientGender}</Text>
                        <Text>Address: {request.clientAddress}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <Text>Contact No./Email Add: {request.clientEmail}</Text>
                            </View>
                            <View style={{ width: '40%' }}>
                                <Text>Report due date: {formatDate(request.reportDue)}</Text>
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
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={[styles.header, { width: "18%", paddingTop: 0 }]}>LAB CODE</Text>
                            <Text style={[styles.header, { width: "20%", paddingTop: 0 }]}>SAMPLE CODE</Text>
                            <Text style={[styles.header, { width: "29%", paddingTop: 0 }]}>SAMPLE DESCRIPTION</Text>
                            <Text style={[styles.header, { width: "22%", paddingTop: 0 }]}>TEST PARAMETER REQUESTED</Text>
                            <Text style={[styles.header, { width: "20%", paddingTop: 0 }]}>TEST METHOD</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { width: "18%" }]}>{request.sampleDetails.map(s => s.labCode).join(", ")}</Text>
                            <Text style={[styles.cell, { width: "20%" }]}>{request.sampleDetails.map(s => s.sampleCode).join(", ")}</Text>
                            <Text style={[styles.cell, { width: "29%" }]}>{request.sampleDetails.map(s => s.sampleDescription).join(", ")}</Text>
                            <Text style={[styles.cell, { width: "22%" }]}>{request.sampleDetails.map(s => s.parameterReq).join(", ")}</Text>
                            <Text style={[styles.cell, { width: "20%" }]}>{request.sampleDetails.map(s => s.methodReq).join(", ")}</Text>
                        </View>

                    </View>
                    <Text style={[styles.font, { marginLeft: 72, marginTop: 3 }]}>Discussed with customer:</Text>
                    <View style={[styles.row, { paddingLeft: 72, marginTop: 5, textAlign: 'justify' }]}>
                        <Text style={styles.boldFont}>Conforme:</Text>
                        <Text style={[styles.italicFont, { fontSize: 11, }]}> I have agreed to the details including the terms and conditions stated in this Analysis</Text>
                    </View>

                    <Text style={[styles.italicFont, { paddingLeft: 72, fontSize: 11, }]}>Request Form</Text>

                    <View style={[styles.row, styles.font, { paddingLeft: 72, marginTop: 5 }]}>
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
                        <Text style={[styles.font, { marginTop: 5, paddingLeft: 72, marginBottom: 0 }]}>Customer Signature: {'\n'}____________________________________________________</Text>
                    </View>
                    <View style={[styles.row, styles.font, { marginTop: 10, paddingLeft: 72 }]}>
                        <View>
                            <Text>Samples Submitted by:</Text>
                            <Text style={{ marginTop: 4 }}>Name: ____________________________________________</Text>
                            <Text style={{ marginTop: 1 }}>Signature: ________________________________________</Text>
                        </View>
                        <View style={{ marginLeft: 34 }}>
                            <Text>Samples Received by:</Text>
                            <Text style={{ marginTop: 4 }}>Name: ____________________________________________</Text>
                            <Text style={{ marginTop: 1 }}>Signature: ________________________________________</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.font, { paddingLeft: 72, marginTop: 16 }]}>ILD-RFCAL-001-1{'\n'}Effectivity Date: September 22, 2025</Text>
                    </View>
                    <Text style={[styles.font, { marginLeft: 72 }]}>
                        -----------------------------------------------------------------------------------------------------------------------------------
                    </Text>
                    <View style={styles.row}>
                        <Text style={[styles.font, { marginLeft: 72 }]}>Report due date:________________________</Text>
                        <Text style={[styles.boldFont, { marginLeft: 25 }]}>AUTHORIZATION/CLAIM STUB {'\n'} (DA-RFCAL 5)</Text>
                    </View>
                    <Text style={[styles.font, { marginLeft: 110, marginRight: 72, textAlign: 'justify' }]}>I hereby authorize _______________________________________________________, to claim the Report of</Text>
                    <Text style={[styles.font, { marginLeft: 72 }]}>Analysis in my behalf.</Text>
                    <View style={{ textAlign: 'right', marginRight: 72, marginTop: -2 }}>
                        <Text style={styles.font}>_______________________________________</Text>
                        <Text style={[styles.font, { marginRight: 13 }]}>Signature of the Customer</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={[styles.font, { flex: 1, marginLeft: 72, marginTop: 40, justifyContent: 'flex-end' }]}>
                            <Text>ILD-RFCAL-001-1</Text>
                            <Text>Effectivity Date: September 22,2025</Text>
                        </View>

                        <Image style={[styles.ukas, { alignSelf: 'flex-end', marginRight: 30 }]} src={image2} />
                    </View>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) => pageNumber <= 2 ? `Page ${pageNumber} of 2` : ''}
                        fixed />
                    <Text style={[styles.termsBold, { marginLeft: 72, marginRight: 72, marginTop: 72 }]}>Terms & Conditions</Text>
                    {terms.map((term, index) => (
                        <View key={index} style={{ marginLeft: 72, marginRight: 72 }}>
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

    return (
        <>
            {request ? (
                <PDFDownloadLink document={generatePdf()} fileName={request.requestId} style={{ padding: 0 }}>
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
    );

}

export default TestPdf