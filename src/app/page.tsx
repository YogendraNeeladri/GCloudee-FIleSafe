import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl font-bold tracking-tight">
              GCloud File Safe
            </CardTitle>
            <CardDescription>
              Secure File Management in the Cloud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button asChild size="lg" className="w-full font-bold">
                <Link href="/dashboard">
                  <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.2 69.2c-20.3-19.2-49-30.8-80.7-30.8-64.8 0-117.2 52.4-117.2 117.2s52.4 117.2 117.2 117.2c73.2 0 102-52.4 105-78.2H248v-69h239.2c1.2 12.8 2.8 25.5 2.8 38.8z"></path>
                  </svg>
                  Sign in with Google
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
