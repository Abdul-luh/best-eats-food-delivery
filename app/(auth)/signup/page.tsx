"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signupSchema } from "@/lib/utils/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { ArrowLeft, User, Mail, Lock, Store, Bike, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"CUSTOMER" | "VENDOR" | "DISPATCHER">("CUSTOMER");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8 relative">
      <div className="absolute top-0 left-0 -z-10 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border-[40px] border-primary rounded-full" />
        <div className="absolute bottom-20 left-20 w-72 h-72 border-[30px] border-orange-500 rounded-full" />
      </div>

      <div className="max-w-xl w-full">
        <div className="bg-card rounded-3xl shadow-2xl border p-8 sm:p-12">
          <Link href="/login" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Login
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black mb-3">Create Account</h1>
            <p className="text-muted-foreground">Join the best food commerce ecosystem</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              type="button"
              onClick={() => { setRole("CUSTOMER"); setValue("role", "CUSTOMER"); }}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                role === "CUSTOMER" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/50 hover:bg-muted"
              )}
            >
              <User size={24} />
              <span className="text-xs font-bold">Customer</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("VENDOR"); setValue("role", "VENDOR"); }}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                role === "VENDOR" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/50 hover:bg-muted"
              )}
            >
              <Store size={24} />
              <span className="text-xs font-bold">Vendor</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("DISPATCHER"); setValue("role", "DISPATCHER"); }}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                role === "DISPATCHER" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/50 hover:bg-muted"
              )}
            >
              <Bike size={24} />
              <span className="text-xs font-bold">Dispatcher</span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  {...register("name")}
                  placeholder="John Doe"
                  className="pl-12"
                  error={!!errors.name}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  {...register("email")}
                  placeholder="name@example.com"
                  className="pl-12"
                  error={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-12"
                  error={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button size="xl" variant="brand" className="w-full rounded-2xl" isLoading={isLoading}>
              Create Account <ChevronRight size={20} className="ml-2" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-black hover:underline">
              Sign In
            </Link>
          </p>

          <p className="mt-8 text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
