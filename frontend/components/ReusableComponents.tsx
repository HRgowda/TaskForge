import React from "react";

// Reusable Section Header
interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader = ({ children }: SectionHeaderProps) => (
  <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h2>
);

// Reusable Section Paragraph
interface SectionParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionParagraph = ({ children, className = "" }: SectionParagraphProps) => (
  <p className={`text-lg text-gray-500 mb-4 ${className}`}>{children}</p>
);

// Reusable List Component
interface ListItem {
  title: string;
  description: string;
}

interface SectionListProps {
  items: ListItem[];
}

export const SectionList = ({ items }: SectionListProps) => (
  <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
    {items.map((item, index) => (
      <li key={index} className="mt-4">
        <strong className="text-white">{item.title}:</strong> {item.description}
      </li>
    ))}
  </ul>
);
