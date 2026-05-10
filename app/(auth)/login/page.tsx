"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/lib/utils/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { ArrowLeft, ChefHat, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-brand-500/5 rounded-l-full hidden lg:block" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-5xl w-full flex bg-card rounded-3xl shadow-2xl border overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black mb-3">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue ordering</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12"
                  error={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button size="xl" variant="brand" className="w-full rounded-2xl" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-black hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest font-bold">Or continue with</div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="rounded-xl h-12">
                <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} className="mr-2" />
                Google
              </Button>
              <Button variant="outline" className="rounded-xl h-12">
                <Image src="https://authjs.dev/img/providers/apple.svg" alt="Apple" width={20} height={20} className="mr-2" />
                Apple
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Visual */}
        <div className="hidden lg:block w-1/2 bg-slate-900 relative">
          <Image 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" 
            alt="Delicious food" 
            fill 
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 to-black/80 flex flex-col justify-end p-16 text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <ChefHat size={32} />
            </div>
            <h2 className="text-4xl font-black leading-tight mb-4">
              Quality Food, <br />
              Speedy Delivery.
            </h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-sm">
              &quot;The best delivery service I&apos;ve ever used. The food is always hot and the tracking is accurate.&quot;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-700" />
                ))}
              </div>
              <span className="text-sm font-medium">Join 50k+ foodies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginContent />
    </React.Suspense>
  );
}
