"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Plus } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .regex(
            /^(?!\d+$)[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores, and cannot be only numbers"
        ),

    email: z
        .string()
        .email("Invalid email")
        .refine((email) => email.endsWith("@example.com"), {
            message: "Only emails from @example.com domain are allowed",
        }),

    phone: z
        .string()
        .trim()
        .regex(
            /^\+?[1-9][0-9]{9,14}$/,
            "Phone number must be between 10-15 digits and can start with +"
        ),

    website: z
        .string()
        .trim()
        .url("Invalid URL")
        .refine((url) => url.startsWith("https://"), {
            message: "Website URL must be secure (https)",
        }),

    address: z.object({
        street: z.string().trim().min(1, "Street is required"),

        suite: z.string().optional(),

        city: z.string().trim().min(1, "City is required"),

        zipcode: z
            .string()
            .trim()
            .regex(/^[0-9-]+$/, "Zipcode must contain only numbers and dashes"),
    }),

    company: z.object({
        name: z.string().trim().min(1, "Company name is required"),

        catchPhrase: z
            .string()
            .optional()
            .refine((val) => !val || !/\d/.test(val), {
                message: "Catch phrase cannot contain numbers",
            }),

        bs: z.string().optional(),
    }),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function AddUserPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
            address: { street: "", suite: "", city: "", zipcode: "" },
            company: { name: "", catchPhrase: "", bs: "" },
        },
    });

    async function onSubmit(data: UserFormValues) {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to add user");
            }

            form.reset();
            router.push("/users");
            toast({
                title: "Success",
                description: "User added successfully",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to add user. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <Breadcrumb className="mb-2">
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
                        <BreadcrumbPage>Add User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold mb-4 mt-4">Add User</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6 border p-6 rounded-lg shadow-md"
                >
                    <h1 className="text-xl font-bold mb-4">User Information </h1>
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter username" {...field} />
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter phone number" {...field} />
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
                    <h1 className="text-xl font-bold mb-4">User Address </h1>
                    <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Home Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter home street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.suite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Home suite</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter home suite" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Home city</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter home city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.zipcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Home zipcode</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter home zipcode" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h1 className="text-xl font-bold mb-4">Company Information</h1>
                    <FormField
                        control={form.control}
                        name="company.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Company Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company.catchPhrase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company catchPhrase</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Company catchPhrase" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company.bs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Bs</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Company Bs" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="!mt-8" size="lg" type="submit" disabled={loading}>
                        <Plus />
                        {loading ? "Adding..." : "Add User"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
