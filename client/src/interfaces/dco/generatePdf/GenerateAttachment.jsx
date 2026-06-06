import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import styles from './Styles';
import image1 from '../../analysts/components/images/DA5.jpg';
import image2 from '../../dco/components/images/unnamed.png'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const GenerateAttachment = ({ requestId, icon, disabledIcon }) => {

    const [request, setRequest] = useState(null)

    useEffect(() => {
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
        if (!request || !request.sampleDetails || !request.ArfAttachment) return;
        return (
            <Document>
                <Page style={[styles.body, { marginTop: 5, paddingBottom: 50 }]} size="A4" orientation='landscape'>
                    <View style={[styles.headerContainer3, styles.row, {width: '90%', marginLeft: 43.5}]}fixed>
                        <View style={[styles.headerCell, { justifyContent: 'center' }]}>
                            <Image style={styles.image} src={image1} />
                        </View>

                        <View style={[styles.headerOffice, styles.headerCell]}>
                            <View style={{paddingRight: 35, paddingLeft: 3}}>
                                <Text style={[styles.normalFont, { fontSize: 10 }]} >Republic of the Philippines</Text>
                                <Text style={[styles.boldFont, { fontSize: 10 }]} >DEPARTMENT OF AGRICULTURE</Text>
                                <Text style={[styles.boldFont, { fontSize: 10 }]} >REGIONAL FIELD OFFICE 5</Text>
                                <Text style={[styles.boldFont, { fontSize: 10 }]} >INTEGRATED LABORATORIES DIVISION</Text>
                                <Text style={[styles.normalFont, { fontSize: 10 }]} >San Agustin, Pili, Camarines Sur</Text>
                            </View>
                        </View>

                        <View style={[styles.formTitle, styles.headerCell]} >
                            <Text style={[styles.titleBold, { fontSize: 12, paddingLeft: 20, paddingRight: 20 }]}>ANALYSIS REQUEST FORM ATTACHMENT</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column'}]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 25, paddingRight: 25 }]}>Document Code</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5, paddingLeft: 20 }]}>ILD5-RFCAL-006-0</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 35 }]}>Record ID</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, paddingRight: 2, paddingLeft: 2 }]}>{request.requestId}</Text>
                        </View>

                        <View style={[styles.headerCell, { flexDirection: 'column', borderRightWidth: 0 }]}>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 10, paddingRight: 10 }]}>Effectivity Date</Text>
                            <Text style={[styles.normalFont, { fontSize: 10, borderBottom: 1, padding: 5, paddingLeft: 10 }]}>March 17, 2026</Text>
                            <Text style={[styles.boldFont, { fontSize: 10, borderBottom: 1, paddingLeft: 25 }]}>Page No.</Text>
                            <Text
                                style={{ fontFamily: 'Cambria', fontSize: 10, paddingLeft: 24 }}
                                render={({ pageNumber, totalPages }) => pageNumber <= 2 ? ` ${pageNumber}   of   ${totalPages} ` : ''}
                                fixed />
                        </View>
                    </View>

                    <View style={[styles.normalFont, { fontSize: 11, marginTop: 8 }]} fixed>
                        <View style={[styles.row, { alignItems: 'center' }]}>
                            <Text style={[{ marginLeft: 45, paddingBottom: 12, paddingRight: 5 }]}>Request ID: (to filled up by RFCAL)</Text>
                            <View style={styles.requestBox}>
                                <Text >
                                    {request.requestId}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.table2, { borderLeftWidth:0, borderTopWidth:0,}]}>
                        <View style={[styles.row, {marginTop: 15}]}fixed>
                            <Text style={[styles.header2, { width: "25%", paddingTop: 0, backgroundColor: '#ffffff', borderTopWidth: 1 }]}>CODE NO. {'\n'} (For Lab Use ONLY)</Text>
                            <Text style={[styles.header, { width: "43%", backgroundColor: '#ffffff', paddingHorizontal: 18, paddingBottom: 15, borderTopWidth: 1 }]}>SAMPLE DESCRIPTION {'\n'} (Province-District No.-Number Sample Collection-Name of Sample) {'\n'} e.g., CS-2-001-Premium Hag Starter Pellet</Text>
                            <Text style={[styles.header, { width: "35%", paddingTop: 0, backgroundColor: '#ffffff', borderTopWidth: 1 }]}>ADDRESS</Text>
                        </View>
                        <View style={[styles.row, { textAlign: 'center' }]} fixed>
                            <Text style={[styles.roaCell2, { width: "12%", paddingVertical: 0}]}>Lab Code</Text>
                            <Text style={[styles.roaCell, { width: "13%", paddingVertical: 0 }]}>Sample Code</Text>
                            <Text style={[styles.roaCell, { width: "43%", paddingVertical: 0 }]}></Text>
                            <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>Barangay</Text>
                            <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>Municipality</Text>
                            <Text style={[styles.roaCell, { width: "11%", paddingVertical: 0 }]}>Province</Text>
                        </View>

                        {request.ArfAttachment.map((item, index) => (
                            <View style={[styles.row, { textAlign: 'center' }]} key={index} wrap={false}>
                                <View style={[styles.roaCell, { width: "12%", paddingVertical: 0, borderLeftWidth: 1 }]}>
                                    <Text>{item.labCode?.substring(0, 14)}</Text>
                                    <Text>{item.labCode?.substring(14)}</Text>
                                </View>
                                <View style={[styles.roaCell, { width: "13%", paddingVertical: 0 }]}>
                                    <Text>{item.sampleCode?.substring(0, 11)}</Text>
                                    <Text>{item.sampleCode?.substring(11)}</Text>
                                </View>
                                <Text style={[styles.roaCell, { width: "43%", paddingVertical: 0 }]}>{item.sampleDescription}</Text>
                                <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>{item.Barangay}</Text>
                                <Text style={[styles.roaCell, { width: "12%", paddingVertical: 0 }]}>{item.Municipality}</Text>
                                <Text style={[styles.roaCell, { width: "11%", paddingVertical: 0 }]}>{item.Province}</Text>
                            </View>
                        ))}
                    </View>

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
                // When request is not loaded yet, show a disabled button.
                // Use `disabledIcon` if provided, otherwise fall back to `icon` so the
                // UI is visible (but disabled) instead of rendering an empty button.
                <button className="btn p-0 border-0" disabled>
                    {disabledIcon || icon}
                </button>
            )}
        </>
    );

}

export default GenerateAttachment