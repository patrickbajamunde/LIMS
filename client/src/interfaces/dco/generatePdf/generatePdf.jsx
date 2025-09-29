import axios from 'axios';
import {Page, Text, View, Document, StyleSheet, Image, PDFViewer} from '@react-pdf/renderer';
import styles from './Styles';
import  image1 from '../../analysts/components/images/DA5.jpg';
import image2 from '../../dco/components/images/unnamed.png'
import terms from './data/Terms';

const tableData = [
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test2', sampleCode: 'B456', description: 'Sample B', parameter: 'Param 2', result: '20.3', method: 'KJELDAHL (AOAC 2001.11)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' },
  { labCode: 'Test1', sampleCode: 'A123', description: 'Sample A', parameter: 'Param 1', result: '10.5', method: 'KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15)' }
  // ... add more data rows here to force a page break
];

function GeneratePdf(){
    return (
            <Document>
            <Page style={[styles.body,{marginTop:5, paddingBottom:328}]} size="A4">
                <View style={styles.roaHeaderCont} fixed>
                    <Image style={styles.roaImage} src={image1}/>
                    <View style={{alignItems:'justify', marginTop:-10}} >
                        <Text style={styles.normalFont} >Department of Agriculture Regional Field Office 5</Text>
                        <Text style={styles.boldFont} >INTEGRATED LABORATORIES DIVISION</Text>
                        <Text style={styles.font} >Regional Feed Chemical Analysis Laboratory</Text>
                        <Text style={styles.normalFont} >San Agustin, Pili, Camarines Sur</Text>
                    </View>
                </View>

                
                <View style={[styles. boldFont, {marginLeft:35, marginTop:15}]} fixed>
                    <Text>Customer Name: </Text>
                    <Text>Address: </Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ width: '50%' }}>
                            <Text>Contact Number:</Text>
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text>Report ID: </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ width: '50%' }}>
                            <Text>Date Received:</Text>
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text>Date Issued: </Text>
                        </View>
                    </View>
                    <Text>Date Performed: </Text>
                </View>

                <View style={[styles.roaTitle]}fixed>
                    <View style={[styles.row, styles.boldFont]}>
                        <Text style={[{width:"100%",textAlign:'center', fontSize:20}]}>REPORT OF ANALYSIS</Text>
                    </View>
                </View>

                <View style={[styles.roaTable]}>
                    <View style={[styles.row, styles.boldFont]} fixed>
                        <Text style={[styles.roaHeader, styles.specificCell, {width:"20%", paddingTop:0}]}>LAB CODE</Text>
                        <Text style={[styles.roaHeader, {width:"20%", paddingTop:0}]}>SAMPLE CODE</Text>
                        <Text style={[styles.roaHeader, {width:"28%", paddingTop:0}]}>SAMPLE DESCRIPTION</Text>
                        <Text style={[styles.roaHeader, {width:"20%", paddingTop:0}]}>PARAMETER </Text>
                        <Text style={[styles.roaHeader, {width:"13%", paddingTop:0}]}>RESULT </Text>
                        <Text style={[styles.roaHeader, {width:"29%", paddingTop:0}]}>TEST METHOD</Text>
                    </View>
                    {tableData.map((row,index)=>(
                        <View style={styles.row} key={index} wrap={false}>
                            <Text style={[styles.roaCell, styles.specificCell, {width:"20%"}]}>Test</Text>
                            <Text style={[styles.roaCell, {width:"20%"}]}>Test</Text>
                            <Text style={[styles.roaCell, {width:"28%"}]}>Test</Text>
                            <Text style={[styles.roaCell, {width:"20%"}]}>Test</Text>
                            <Text style={[styles.roaCell, {width:"13%"}]}>Test</Text>
                            <Text style={[styles.roaCell, {width:"29%", flexWrap:'wrap'}]}>{row.method}</Text>
                        </View>
                    ))}

                </View>


                    <View style={[styles.row, {position:'absolute', paddingLeft:15, fontSize:9,textAlign:'justify', paddingRight:25, bottom: 320}]} fixed>
                        <Text style={styles.italicFont}>Note: The result is based on the sample received and analyzed by the laboratory. This report shall not be reproduced without full approval of the Department of Agriculture Regional Field Office 5 - Integrated Laboratories Division.</Text>
                    </View>

                    <View style={[styles.font, {paddingLeft:55, bottom: 245, position:'absolute'}]} fixed>
                        <Text style={{fontWeight:'bold', bottom: 35}}>Analyzed/Examined By:</Text>
                        <Text style={{fontWeight:'bold'}}>DANICA MAE B. RODRIGUES, RCh</Text>
                        <Text>Chemist, PRC License No. 0015235</Text>
                    </View>

                    <View style={[styles.row, {position:'absolute', bottom:120, gap:35}]} fixed>
                        <View style={[styles.font, {paddingLeft:55}]}>
                            <Text style={{fontWeight:'bold', bottom:30}}>Certified By:</Text>
                            <Text style={{fontWeight:'bold'}}>CORREN HOLLY M. MONSALVE, Rch</Text>
                            <Text>Laboratory Head, Chemist III</Text>
                            <Text>PRC License No. 0011021</Text>
                        </View>

                        <View style={[styles.font, {paddingLeft:72}]}>
                            <Text style={{fontWeight:'bold', bottom:30}}>Noted By:</Text>   
                            <Text style={{fontWeight:'bold'}}>ANACLETO B. ESPLANA, RAgr</Text>
                            <Text>OIC-Chief, Integrated Laboratories Division</Text>
                            <Text>PRC LIC.NO.0020472</Text>
                        </View>
                    </View>
            
                
                <View  style={[styles.footer, {position:'absolute', bottom: 20, left:20,}]} fixed>
                    <View style={[styles.font]}>
                        <Text>ILD-RFCAL-005-1</Text>
                        <Text>Effectivity Date: April 14,2025</Text>
                    </View>
                </View>
                <Image style={[styles.roaUkas, {position:'absolute', bottom: 42, right:15}]} src={image2} fixed />
                <Text
                style={[styles.pageNumber, {right:30}]}
                render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
                fixed/>
            </Page>
        </Document>
        )
}

export default GeneratePdf