"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/components/Icons";
import { Header, HeaderTitle, HeaderSubtitle, HeaderDescription } from "@/components/ui/Header";
import { ArchetypeGallery } from "@/components/ArchetypeGallery";
import { AgentInput } from "@/components/AgentInput";
import { meta } from "@/config/constants";
import { Separator } from "@/components/ui/Separator";

export default function Home() {
  const agentPlaceholders = [
    "Who are you really?",
    "What drives you to create, collaborate, or retreat? ",
    "Why do some challenges energize you",
    "Explore your inner architecture",
    "What are your dominant drives?",
    "Explore decision-making habits, and adaptive edge",
    "Manage conflict better at work",
    "What’s my growth edge right now?",
    "Remind me how I recharge best.",
    "Why do I freeze up during group meetings?"
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-between gap-12 min-h-[calc(100vh-84px)] py-12">
        <div className="flex flex-col items-center gap-4 mt-auto">
          <Header>
            <HeaderSubtitle>
              Introducing Plebs
            </HeaderSubtitle>
            <HeaderTitle>
              Discover the P in Personality
            </HeaderTitle>
            <HeaderDescription>
              Scientific. Adaptive. Community-driven personality insights—powered by AI.
            </HeaderDescription>
          </Header>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/assessment">
                <span className="z-1">Take the Assessment</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/whitepaper.pdf">
                <span className="z-1 gradient-text">Read the whitepaper</span>
                <ChevronRight className="transition-transform duration-200 ease-out group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>        
        <div className="flex gap-4 mt-auto">
          {meta.socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <Button
                variant="ghost"
                asChild 
                key={index}
              >
                <Link
                  href={social.url}
                  target='_blank'
                >
                  <Icon />
                </Link>
              </Button>
            );
          })}
        </div>
      </section>
      <Separator className="bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <section className="flex flex-col items-center justify-center gap-12 py-[180px]">
        <Header>
          <HeaderSubtitle>
            Understand the Mind&apos;s Blueprint
          </HeaderSubtitle>
          <HeaderTitle>
            Meet the Archetypes
          </HeaderTitle>
          <HeaderDescription>
            There are 9 archetypes under 3 clusters integrating established theories and cognitive models to deliver accurate, research-driven insights.
          </HeaderDescription>
        </Header>
    
        <ArchetypeGallery archetypes={archetypes} />
      </section>
      <Separator className="bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <section className="flex flex-col items-center justify-center gap-12 py-[180px]">
        <Header>
          <HeaderSubtitle>
            Personality for Real-Life Applications
          </HeaderSubtitle>
          <HeaderTitle>
            Designed for Growth and Insight
          </HeaderTitle>
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="flex flex-col gap-4 p-6 rounded-xl bg-gray-900">
            <h3 className="text-xl font-semibold text-gray-50">Deeper Self-Knowledge</h3>
            <p>
              Move beyond labels. Understand your motivations, blind spots, and strengths in real-world situations.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-6 rounded-xl bg-gray-900">
            <h3 className="text-xl font-semibold text-gray-50">Built for Teams</h3>
            <p>
              Empower teams and professional setups with insight-driven collaboration, role clarity, and adaptive communication grounded in cognitive science.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-6 rounded-xl bg-gray-900">
            <h3 className="text-xl font-semibold text-gray-50">AI That Gets You</h3>
            <p>
              Your personalized agent evolves with your data—offering relevant feedback, growth tips, and tailored advice.
            </p>
          </div>
        </div>
      </section>
      <Separator className="bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <section className="flex flex-col items-center justify-center gap-12 py-[180px]">
        <Header>
          <HeaderSubtitle>
            Ask Anything
          </HeaderSubtitle>
          <HeaderTitle>
            Your Agent
          </HeaderTitle>
          <HeaderDescription>
            Talk with your own agent, uniquely trained and built around your personality dimensions.
          </HeaderDescription>
          <p className="max-w-2xl text-center">
            Your Plebs Agent isn't just a chatbot—it's a context-aware, cognitive companion that evolves with your inputs. It draws from your assessment, behavior, and preferences to deliver advice, reflections, and smart nudges when you need them most.
          </p>
        </Header>
        <AgentInput
          placeholders={agentPlaceholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </section>
    </>
  );
}
