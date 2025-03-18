"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// Define User type
interface User {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
    };
    website: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await res.json();
                setUsers(data);
                toast({
                    title: "Success",
                    description: "Success to fetch users.",
                });
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
    }, [toast]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} className="h-24 w-full rounded-lg bg-slate-200" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {users?.map((user) => (
                        <Link key={user.id} href={`/users/${user.id}`}>
                            <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-gray-500">{user.address.city}</p>
                                <p className="text-blue-500 hover:underline">{user.website}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
