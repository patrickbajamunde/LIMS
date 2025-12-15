import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import styles from './Styles';
import image1 from '../../analysts/components/images/DA5.jpg';
import image2 from '../../dco/components/images/unnamed.png'
import terms from './data/Terms';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const GenerateAttachment = ({ requestId, icon, disabledIcon }) => {

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
                <Page style={[styles.body, { marginTop: 5 }]} size="A4" orientation='landscape'>
                    <View style={styles.headerContainer2}>
                        <Image style={styles.image2} src={image1} />
                        <View style={{ alignItems: 'justify', }} >
                            <Text style={styles.normalFont} >Republic of the Philippines</Text>
                            <Text style={styles.boldFont} >DEPARTMENT OF AGRICULTURE</Text>
                            <Text style={styles.boldFont} >REGIONAL FIELD OFFICE 5</Text>
                            <Text style={styles.normalFont} >San Agustin, Pili, Camarines Sur</Text>
                        </View>
                    </View>
                    <View style={styles.title} >
                        <Text style={[styles.titleBold, { fontSize: 14 }]}>ANALYSIS REQUEST FORM ATTACHMENT</Text>
                    </View>

                    <View style={[styles.normalFont, { fontSize: 11, marginTop: 8 }]}>
                        <View style={[styles.row, { alignItems: 'center' }]}>
                            <Text style={[{ marginLeft: 45, paddingBottom: 12, paddingRight: 5 }]}>Request ID: (to filled up by RFCAL)</Text>
                            <View style={styles.requestBox}>
                                <Text >
                                    {request.requestId}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.table2}>
                        <View style={styles.row}>
                            <Text style={[styles.header, { width: "25%", paddingTop: 0, backgroundColor: '#ffffff' }]}>CODE NO. {'\n'} (For Lab Use ONLY)</Text>
                            <Text style={[styles.header, { width: "43%", backgroundColor: '#ffffff', paddingHorizontal: 18, paddingBottom: 15 }]}>SAMPLE DESCRIPTION {'\n'} (Province-District No.-Number Sample Collection-Name of Sample) {'\n'} e.g., CS-2-001-Premium Hag Starter Pellet</Text>
                            <Text style={[styles.header, { width: "35%", paddingTop: 0, backgroundColor: '#ffffff' }]}>ADDRESS</Text>
                        </View>
                        <View style={[styles.row, { textAlign: 'center' }]}>
                            <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>Lab Code</Text>
                            <Text style={[styles.roaCell, { width: "13%", paddingVertical: 0 }]}>Sample Code</Text>
                            <Text style={[styles.roaCell, { width: "43%", paddingVertical: 0 }]}></Text>
                            <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>Barangay</Text>
                            <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>Municipality</Text>
                            <Text style={[styles.roaCell, { width: "11%", paddingVertical: 0 }]}>Province</Text>
                        </View>

                        {request.ArfAttachment.map((item, index) => (
                            <View style={[styles.row, { textAlign: 'center'}]} key={index} wrap={false}>
                                <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>{item.labCode}</Text>
                                <Text style={[styles.roaCell, { width: "13%", paddingVertical: 0 }]}>{item.sampleCode}</Text>
                                <Text style={[styles.roaCell, { width: "43%", paddingVertical: 0 }]}>{item.sampleDescription}</Text>
                                <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>{item.Barangay}</Text>
                                <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>{item.Municipality}</Text>
                                <Text style={[styles.roaCell, { width: "11%", paddingVertical: 0 }]}>{item.Province}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.footer2]}>
                        <View style={[styles.font, { flex: 1, marginLeft: 45, marginTop: 40, justifyContent: 'flex-end' }]}>
                            <Text>ILD-RFCAL-056-0</Text>
                            <Text>Effectivity Date: September 22,2025</Text>
                        </View>

                        <Image style={[styles.ukas, { alignSelf: 'flex-end', marginRight: 30, marginBottom: 15 }]} src={image2} />
                    </View>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) => pageNumber === 1 ? `Page 1 of 1` : ''}
                        fixed />

                </Page>
            </Document>
        )
    }

    return (
        <>
            {request ? (
                <PDFDownloadLink document={generatePdf()} fileName={`${request.requestId}-ArfAttachment`} style={{ padding: 0 }}>
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

export default GenerateAttachment