"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Edit, Eye, Plus } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

export default function UsersPage() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${API_URL}/users`);
                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await res.json();
                setUsers(data);
                // toast({
                //     title: "Success",
                //     description: "Success to fetch users.",
                // });
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to fetch users. Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [toast, API_URL]);

    const handleView = (id: number) => {
        router.push(`/users/${id}`);
    };
    const handleEdit = (id: number) => {
        router.push(`/users/${id}/edit`);
    };

    return (
        <div className="container mx-auto p-6">
            <Breadcrumb className="mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold ">User List</h1>
                <Link href="/users/add">
                    <Button size="lg">
                        <Plus /> Add User
                    </Button>
                </Link>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} className="h-24 w-full rounded-lg bg-slate-200" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {users?.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-gray-800">
                                    {user.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-sm font-extralight">
                                    {user.email} | {user.company.name}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-end gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => handleView(user.id)} size="icon">
                                                <Eye />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>View User</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleEdit(user.id)}
                                                size="icon"
                                            >
                                                <Edit />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit User</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
