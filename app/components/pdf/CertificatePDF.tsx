import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts (optional - using system fonts for now)
// Font.register({ family: 'Inter', src: '/fonts/Inter-Regular.ttf' });

// Maru Brand Colors
const colors = {
  primary: '#3DD6D0', // Maru Turquoise
  secondary: '#1a365d', // Deep Navy
  accent: '#2D3748', // Dark Gray
  gold: '#D69E2E', // Certificate Gold
  white: '#FFFFFF',
  lightGray: '#F7FAFC',
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    padding: 40,
    fontFamily: 'Helvetica',
  },
  border: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: 'solid',
  },
  innerBorder: {
    position: 'absolute',
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
    borderWidth: 1,
    borderColor: colors.gold,
    borderStyle: 'solid',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 5,
  },
  certificateTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    letterSpacing: 3,
  },
  ofText: {
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 20,
  },
  recipientName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.gold,
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    marginHorizontal: 60,
  },
  completionText: {
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.5,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 15,
  },
  streamBadge: {
    backgroundColor: colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  streamText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 40,
  },
  detailBox: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: colors.accent,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginHorizontal: 60,
  },
  signatureBox: {
    alignItems: 'center',
    width: 150,
  },
  signatureLine: {
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    marginBottom: 8,
  },
  signatureLabel: {
    fontSize: 10,
    color: colors.accent,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  certificateId: {
    fontSize: 8,
    color: colors.accent,
    marginTop: 10,
  },
  verifyText: {
    fontSize: 8,
    color: colors.accent,
    marginTop: 5,
  },
});

export interface CertificateData {
  recipientName: string;
  courseName: string;
  stream: 'Beginner' | 'Intermediate';
  modulesCompleted: number;
  totalModules: number;
  completionDate: string;
  certificateId: string;
  totalHours?: number;
}

interface CertificatePDFProps {
  data: CertificateData;
}

export const CertificatePDF: React.FC<CertificatePDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Decorative Borders */}
        <View style={styles.border} fixed />
        <View style={styles.innerBorder} fixed />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>MARU AI ACADEMY</Text>
          <Text style={styles.subtitle}>AI Productivity Training for African Professionals</Text>
        </View>

        {/* Certificate Title */}
        <Text style={styles.certificateTitle}>CERTIFICATE</Text>
        <Text style={styles.ofText}>OF COMPLETION</Text>

        {/* Recipient Name */}
        <Text style={styles.recipientName}>{data.recipientName}</Text>

        {/* Completion Text */}
        <Text style={styles.completionText}>
          has successfully completed the requirements for
        </Text>

        {/* Course Name */}
        <Text style={styles.courseName}>{data.courseName}</Text>

        {/* Stream Badge */}
        <View style={styles.streamBadge}>
          <Text style={styles.streamText}>{data.stream} Stream</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>MODULES COMPLETED</Text>
            <Text style={styles.detailValue}>{data.modulesCompleted}/{data.totalModules}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>COMPLETION DATE</Text>
            <Text style={styles.detailValue}>{data.completionDate}</Text>
          </View>
          {data.totalHours && (
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>TOTAL HOURS</Text>
              <Text style={styles.detailValue}>{data.totalHours}+ hours</Text>
            </View>
          )}
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Maru Online</Text>
            <Text style={styles.signatureLabel}>Platform Provider</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>AI Academy</Text>
            <Text style={styles.signatureLabel}>Certificate Authority</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.certificateId}>Certificate ID: {data.certificateId}</Text>
          <Text style={styles.verifyText}>
            Verify at: academy.maruonline.com/verify/{data.certificateId}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
