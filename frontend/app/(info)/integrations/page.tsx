"use client";

import { SectionHeader, SectionParagraph } from "@/components/ReusableComponents";

interface ListItem {
  title: string;
  description: string;
}

interface SectionListProps {
  items: ListItem[];
}

const SectionList = ({ items }: SectionListProps) => (
  <ul className="text-lg text-gray-300 mb-6 sm:text-base md:text-lg lg:text-xl">
    {items.map((item, index) => (
      <li key={index} className="mt-6">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="text-gray-400 mt-2">{item.description}</p>
      </li>
    ))}
  </ul>
);

const integrations = [
  {
    title: "GitHub",
    description: "Seamlessly integrates with GitHub issues, allowing bounty tracking and automated distribution.",
  },
  {
    title: "Prisma & PostgreSQL",
    description: "Uses Prisma ORM with PostgreSQL for efficient and scalable database management.",
  },
  {
    title: "Email Notifications",
    description: "Sends automated emails using Nodemailer for bounty updates and confirmations.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-12 sm:px-4 md:px-12 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-8 sm:text-3xl md:text-4xl">Integrations</h1>

      <SectionParagraph className="text-center">
        Our application integrates with industry-leading tools to provide a seamless bounty distribution experience.
      </SectionParagraph>

      <SectionList items={integrations} />
    </div>
  );
}
