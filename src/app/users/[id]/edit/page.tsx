"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    city: z.string().min(1, "City is required"),
    website: z.string().url("Invalid URL"),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function EditUserPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<UserFormValues | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setInitialData({
                    name: data.name,
                    email: data.email,
                    city: data.address.city,
                    website: data.website,
                });
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to fetch user data.",
                    variant: "destructive",
                });
            }
        }
        fetchUser();
    }, [id, toast]);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: initialData || {
            name: "",
            email: "",
            city: "",
            website: "",
        },
        values: initialData || undefined,
    });

    async function onSubmit(data: UserFormValues) {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            router.push("/users/"+id);
            toast({
                title: "Success",
                description: "User updated successfully",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to update user. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <Link href="/users" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Users
            </Link>
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            
            {initialData ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6 border p-6 rounded-lg shadow-md"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter city" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter website" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update User"}
                        </Button>
                    </form>
                </Form>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
