import Link from "next/link";
import { Header, HeaderDescription, HeaderTitle, HeaderSubtitle } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const messages = [
    "This isn't your archetype's natural habitat. Maybe you're exploring?",
    "You've taken a detour into the unknown.",
    "No personality type matches this destination.",
    "You seem to be off your usual path.",
    "This place doesn’t align with any known traits."
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Header>
        <HeaderSubtitle>
          404
        </HeaderSubtitle>
        <HeaderTitle>
          Path Not Found
        </HeaderTitle>
        <HeaderDescription>
          {message}
        </HeaderDescription>
      </Header>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">
            Return Home
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/assessment">
            Take the Assessment
          </Link>
        </Button>
      </div>
    </div>
  );
}