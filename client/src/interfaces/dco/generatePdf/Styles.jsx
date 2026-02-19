import { StyleSheet, Font } from '@react-pdf/renderer';

import Cambria from '../../../Fonts/cambria.ttf';
import CambriaItalic from '../../../Fonts/cambria-italic.ttf';
import CambriaBold from '../../../Fonts/cambria-bold.ttf';


Font.register({
    family: 'Cambria',
    fonts: [
        { src: Cambria },
        { src: CambriaItalic, fontStyle: 'italic' },
        { src: CambriaBold, fontWeight: 'bold' }
    ],
});



const styles = StyleSheet.create({

    font: {
        fontFamily: 'Cambria',
        fontSize: 11
    },
    headerContainer: {
        flexDirection: 'row', // horizontal layout
        alignItems: 'center', // vertical alignment       
        paddingRight: 160,
        gap: 76,
    },

    headerContainer2: {
        flexDirection: 'row', // horizontal layout
        alignItems: 'center', // vertical alignment       
    },

    boldFont: {
        fontFamily: 'Cambria',
        fontWeight: 'bold',
        fontSize: 11
    },
    italicFont: {
        fontFamily: 'Cambria',
        fontStyle: 'italic',
    },
    normalFont: {
        fontFamily: 'Cambria',
        fontSize: 10
    },
    titleBold: {
        fontFamily: 'Cambria',
        fontWeight: 'bold',
        fontSize: 11
    },
    contentNormal: {
        fontFamily: 'Cambria',
        fontSize: 11,
        textAlign: 'justify',
    },
    title: {
        textAlign: 'center',
        marginTop: 15,
        marginLeft: 14,

    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        padding: 72,
    },
    image: {
        marginLeft: 48,
        width: 96.39,
        height: 86.5,
    },

    image2: {
        marginLeft: 35,
        width: 96.39,
        height: 86.5,
    },
    header: {
        fontFamily: 'Cambria',
        fontSize: 11,
        width: '20%', // You can adjust widths here
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#D9D9D9',
        textAlign: 'center',
        paddingBottom: 0
    },
    cell: {
        fontFamily: 'Cambria',
        fontSize: 11,
        width: '20%', // You can adjust widths here
        height: 155,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        textAlign: 'center',
    },


    table: {
        display: 'table',
        width: '81%',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginLeft: 67,
    },

    table2: {
        display: 'table',
        width: '90%',
        marginTop: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginLeft: 45,
    },

    row: {
        flexDirection: 'row'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    footer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    checkbox: {
        width: 13,
        height: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 5,
    },
    ukas: {
        width: 115,
        height: 65,
        backgroundColor: 'white',
    },

    pageNumber: {
        fontFamily: 'Cambria',
        position: 'absolute',
        fontSize: 11,
        bottom: 30,
        right: 70,
    },

    termsBold: {
        fontFamily: 'Cambria',
        fontSize: '8',
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    termsNormal: {
        fontFamily: 'Cambria',
        fontSize: '8',
        textAlign: 'justify'
    },

    roaTable: {
        display: 'table',
        width: '95%',
        marginLeft: 15,
    },
    roaHeader: {
        fontFamily: 'Cambria',
        fontSize: 11,
        width: '20%', // You can adjust widths here
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#D9EAD3',
        textAlign: 'center',
        paddingBottom: 0
    },
    roaHeaderCont: {
        flexDirection: 'row', // horizontal layout
        alignItems: 'center', // vertical alignment       
        paddingRight: 160,
        gap: 25,
    },
    roaUkas: {
        height: 53,
        width: 88,
        backgroundColor: 'white'
    },
    roaTitle: {
        display: 'table',
        backgroundColor: '#B6D7A8',
        marginLeft: 15,
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: '#000', // or any color you prefer
        borderStyle: 'solid',
    },
    roaCell: {
        fontFamily: 'Cambria',
        fontSize: 11,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        padding: 2,
    },

    textWrap: {
        flexWrap: 'wrap',
        flexShrink: 1,
    },

    roaImage: {
        marginLeft: 20,
        height: 90,
        width: 93
    },

    specificCell: {
        borderLeftWidth: 1
    },

    requestBox: {
        borderWidth: 2,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5,
        alignSelf: 'flex-start'
    }

});

export default styles;