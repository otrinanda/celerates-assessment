"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import UserProfilePDF from "@/components/pdf/UserProfilePDF";
import BusinessCardPDF from "@/components/pdf/BusinessCardPDF";
import UserContractPDF from "@/components/pdf/UserContractPDF";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<"profile" | "business" | "contract">(
        "profile"
    );
    const { toast } = useToast();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!id) return;

        async function fetchUser() {
            try {
                const res = await fetch(`${API_URL}/users/${id}`);
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
    }, [id, toast, API_URL]);

    const deleteUser = async () => {
        if (!id) return;

        try {
            const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }
            router.push("/users");
            toast({
                title: "User Deleted",
                description: "The user has been successfully deleted.",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to delete user. Please try again later.",
                variant: "destructive",
            });
        }
    };

    const SelectedPDF =
        selectedTemplate === "profile"
            ? UserProfilePDF
            : selectedTemplate === "business"
            ? BusinessCardPDF
            : UserContractPDF;
    return (
        <div className="container mx-auto p-6">
            <Breadcrumb  className="mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Detail User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold mb-4">User Details</h1>
            </div>
            {loading ? (
                <Skeleton className="h-96 w-96 rounded-lg bg-slate-200" />
            ) : (
                user && (
                    <div className="w-96">
                        <Card className="hover:shadow-lg transition ">
                            <CardHeader>
                                <CardTitle className="text-3xl font-semibold text-gray-800">
                                    {user.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-lg font-semibold">
                                    (@{user.username})
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm">
                                <p className="text-gray-600">
                                    📧 <span className="font-medium text-lg">{user.email}</span>
                                </p>
                                <p className="text-gray-600">
                                    📞 <span className="font-medium text-lg">{user.phone}</span>
                                </p>
                                <p className="text-gray-600">
                                    🌍{" "}
                                    <a
                                        href={`https://${user.website}`}
                                        className="text-blue-500 hover:underline text-lg"
                                    >
                                        {user.website}
                                    </a>
                                </p>
                                <p className="text-gray-600 text-lg">
                                    🏠 {user.address.street}, {user.address.suite},{" "}
                                    {user.address.city}, {user.address.zipcode}
                                </p>
                                <p className="text-gray-600 text-lg">
                                    🏢 <span className="font-medium">{user.company.name}</span> -{" "}
                                    {user.company.catchPhrase}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end items-end gap-2">
                                <Link href={`/users/${id}/edit`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">Delete</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                        </DialogHeader>
                                        <p>
                                            Are you sure you want to delete this user? This action
                                            cannot be undone.
                                        </p>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="destructive" onClick={deleteUser}>
                                                Confirm Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                {user && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Export</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl w-full">
                                            <DialogHeader>
                                                <DialogTitle>PDF Preview</DialogTitle>
                                            </DialogHeader>
                                            <div className="mb-4">
                                                <Select
                                                    onValueChange={(value) =>
                                                        setSelectedTemplate(
                                                            value as "profile" | "business"
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select Template" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="profile">
                                                            User Profile
                                                        </SelectItem>
                                                        <SelectItem value="business">
                                                            Business Card
                                                        </SelectItem>
                                                        <SelectItem value="contract">
                                                            User Contract
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="h-[500px] overflow-auto border p-2">
                                                <PDFViewer width="100%" height="100%">
                                                    <SelectedPDF user={user} />
                                                </PDFViewer>
                                            </div>
                                            <PDFDownloadLink
                                                document={<SelectedPDF user={user} />}
                                                fileName={`User-${id}-${selectedTemplate}.pdf`}
                                            >
                                                {({ loading }) => (
                                                    <Button
                                                        size="lg"
                                                        variant="default"
                                                        className="mt-4"
                                                    >
                                                        {loading
                                                            ? "Preparing PDF..."
                                                            : "Download PDF"}
                                                    </Button>
                                                )}
                                            </PDFDownloadLink>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                )
            )}
        </div>
    );
}
