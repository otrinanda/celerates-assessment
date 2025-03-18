import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface User {
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
        catchPhrase: string;
    };
}

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    header: { textAlign: "center", fontSize: 18, marginBottom: 60 },
    section: { marginBottom: 30 },
    title: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
    paragraph: { marginBottom: 5 },
    footer: { position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center", fontSize: 10, color: "gray" },
    signature: { marginTop: 80, textAlign: "right" },
    signatureSection: { display: "flex" },
});

const UserContractPDF = ({ user }: { user: User }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Service Subscription Contract</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Parties Involved</Text>
                <Text style={styles.paragraph}>This agreement is made between:</Text>
                <Text>
                    - {user.name}, Contact: {user.email}, Phone: {user.phone}
                </Text>
                <Text>
                    - {user.company.name}, Represented by {user.company.catchPhrase}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Agreement Terms</Text>
                <Text style={styles.paragraph}>
                    1. The user agrees to subscribe to the services provided by {user.company.name}.
                </Text>
                <Text style={styles.paragraph}>
                    2. The service includes access to premium features as per the chosen plan.
                </Text>
                <Text style={styles.paragraph}>
                    3. The user agrees to abide by the terms and conditions of the service.
                </Text>
                <Text style={styles.paragraph}>
                    4. Payment must be made according to the agreed schedule.
                </Text>
                <Text style={styles.paragraph}>
                    5. This contract is valid until terminated by either party with prior notice.
                </Text>
            </View>

            <View style={styles.signatureSection}>
                <View style={styles.section}>
                    <View style={styles.signature}>
                        <Text>__________________________</Text>
                        <Text>{user.name} (User)</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.signature}>
                        <Text>__________________________</Text>
                        <Text>Authorized Representative ({user.company.name})</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.footer}>Generated on {new Date().toLocaleDateString()}</Text>
        </Page>
    </Document>
);

export default UserContractPDF;
