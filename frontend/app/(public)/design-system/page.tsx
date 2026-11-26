import { Container, Section } from "@/components/layout/container";
import { H1, H2, H3, H4, P, Muted, Code } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { InfoIcon, AlertTriangleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";

export const metadata = {
  title: "Design System | LearnCS",
};

export default function DesignSystemPage() {
  return (
    <Container className="py-12">
      <Section className="py-0">
        <H1 className="mb-2">Design System</H1>
        <P className="text-muted-foreground mt-0 mb-8">
          LearnCS Production UI Primitives and Tokens Showcase.
        </P>

        <div className="space-y-16">
          {/* Typography */}
          <div className="space-y-4">
            <H2>Typography</H2>
            <div className="space-y-4 rounded-xl border p-6">
              <H1>Heading 1 (H1)</H1>
              <H2>Heading 2 (H2)</H2>
              <H3>Heading 3 (H3)</H3>
              <H4>Heading 4 (H4)</H4>
              <P>Paragraph (P): The quick brown fox jumps over the lazy dog.</P>
              <Muted>Muted: The quick brown fox jumps over the lazy dog.</Muted>
              <div><Code>Code: console.log("Hello LearnCS!");</Code></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <H2>Buttons</H2>
            <div className="flex flex-wrap gap-4 rounded-xl border p-6">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-4">
            <H2>Forms</H2>
            <div className="grid gap-6 md:grid-cols-2 rounded-xl border p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email Address</label>
                <Input type="email" placeholder="student@university.edu" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Status</label>
                <Select options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium leading-none">Bio</label>
                <Textarea placeholder="Tell us about your computer science journey..." />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <H2>Badges</H2>
            <div className="flex flex-wrap gap-4 rounded-xl border p-6">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            <H2>Alerts</H2>
            <div className="grid gap-4 rounded-xl border p-6">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
              </Alert>
              <Alert variant="info">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>Your learning path has been updated with new modules.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Assessment submitted successfully. You earned 50 XP!</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Your subscription is expiring in 3 days.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to fetch data from the server. Please try again.</AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Cards & Feedback */}
          <div className="space-y-4">
            <H2>Cards & Feedback</H2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 rounded-xl border p-6 bg-muted/30">
              <Card>
                <CardHeader>
                  <CardTitle>Data Structures</CardTitle>
                  <CardDescription>Learn arrays, linked lists, trees, and graphs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={65} />
                    <Muted>65% Complete</Muted>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue Learning</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading State</CardTitle>
                  <CardDescription>Example of skeleton loaders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-24 w-full mt-4" />
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </Section>
    </Container>
  );
}
