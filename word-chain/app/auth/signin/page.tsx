"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl: "/play" });
    setLoading(false);
  }

  return (
    <section className="py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Password" />
            <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
            <div className="text-sm text-muted-foreground">No account? <Link className="underline" href="/auth/signup">Sign up</Link></div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
