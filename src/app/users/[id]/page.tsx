"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import UserPDF from "@/components/pdf/UserPDF";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define User type
interface User {
    id: number;
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

export default function UserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!id) return;

        async function fetchUser() {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await res.json();
                setUser(data);
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to fetch user details. Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [id, toast]);

    return (
        <div className="container mx-auto p-6">
            <Link href="/users" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Users
            </Link>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">User Details</h1>
                <div className="space-x-4">
                    <Link href={`/users/${id}/edit`}>
                        <Button size="lg">Edit User</Button>
                    </Link>
                    {user && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" variant="outline">
                                    Preview PDF
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl w-full">
                                <DialogHeader>
                                    <DialogTitle>PDF Preview</DialogTitle>
                                </DialogHeader>
                                <div className="h-[500px] overflow-auto border p-2">
                                    <PDFViewer width="100%" height="100%">
                                        <UserPDF user={user} />
                                    </PDFViewer>
                                </div>
                                <PDFDownloadLink
                                    document={<UserPDF user={user} />}
                                    fileName={`User-${id}-Profile.pdf`}
                                >
                                    {({ loading }) => (
                                        <Button size="lg" variant="default" className="mt-4">
                                            {loading ? "Preparing PDF..." : "Download PDF"}
                                        </Button>
                                    )}
                                </PDFDownloadLink>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
            {loading ? (
                <Skeleton className="h-32 w-full rounded-lg bg-slate-200" />
            ) : (
                user && (
                    <div className="border p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-500">{user.address.city}</p>
                        <p className="text-blue-500 hover:underline">{user.website}</p>
                    </div>
                )
            )}
        </div>
    );
}
