"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    setMessage(data?.message || "");
    setLoading(false);
  }

  return (
    <section className="py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Password" />
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
            {message && <div className="text-sm text-muted-foreground" role="status" aria-live="polite">{message}</div>}
            <div className="text-sm text-muted-foreground">Have an account? <Link className="underline" href="/auth/signin">Sign in</Link></div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
