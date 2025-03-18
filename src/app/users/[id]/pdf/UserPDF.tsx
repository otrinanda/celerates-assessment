import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface User {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    header: { textAlign: "center", fontSize: 18, marginBottom: 10 },
    footer: { textAlign: "center", fontSize: 10, marginTop: 10, color: "gray" },
    section: { marginBottom: 10 },
    title: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
});

const UserPDF = ({ user }: { user: User }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>User Profile Report</Text>

            {/* User Information */}
            <View style={styles.section}>
                <Text style={styles.title}>Personal Information</Text>
                <Text>Name: {user.name}</Text>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <Text>Website: {user.website}</Text>
            </View>

            {/* Address */}
            <View style={styles.section}>
                <Text style={styles.title}>Address</Text>
                <Text>
                    {user.address.street}, {user.address.suite}
                </Text>
                <Text>
                    {user.address.city}, {user.address.zipcode}
                </Text>
                <Text>
                    Geo: {user.address.geo.lat}, {user.address.geo.lng}
                </Text>
            </View>

            {/* Company */}
            <View style={styles.section}>
                <Text style={styles.title}>Company</Text>
                <Text>Name: {user.company.name}</Text>
                <Text>Catchphrase: {user.company.catchPhrase}</Text>
                <Text>Business: {user.company.bs}</Text>
            </View>

            <Text style={styles.footer}>Generated on {new Date().toLocaleString()}</Text>
        </Page>
    </Document>
);

export default UserPDF;
