import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface User {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    card: { width: 250, height: 150, border: "1 solid black", padding: 10, borderRadius: 5 },
    name: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    email: { fontSize: 16, color: "blue" , textAlign: "center", marginBottom: 5 },
    phone: { fontSize: 16 , textAlign: "center", marginBottom: 5},
    website: { fontSize: 12, textDecoration: "underline", textAlign: "center", marginBottom: 5 },
    company: { marginBottom: 5, fontSize: 16, fontWeight: "bold" },
    catchPhrase: { fontSize: 10, fontStyle: "italic" },
    footer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
        color: "gray",
    },
});

const BusinessCardPDF = ({ user }: { user: User }) => (
    <Document>
        <Page size={{ width: 300, height: 200 }} style={styles.page}>
            <View style={styles.card}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
                <Text style={styles.website}>{user.website}</Text>
                <View style={styles.footer}>
                    <Text>{user.company.name}</Text>
                    <Text style={styles.catchPhrase}>{user.company.catchPhrase}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default BusinessCardPDF;
