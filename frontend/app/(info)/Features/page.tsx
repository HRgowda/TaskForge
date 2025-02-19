export interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader = ({ children }: SectionHeaderProps) => (
  <h2 className="text-2xl font-semibold text-white mt-8 mb-4 sm:text-xl md:text-2xl lg:text-xl">{children}</h2>
);

export interface SectionParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionParagraph = ({ children, className = '' }: SectionParagraphProps) => (
  <p className={`text-lg text-gray-500 mb-4 ${className} sm:text-base md:text-lg lg:text-xl`}>
    {children}
  </p>
);

interface ListItem {
  title: string;
  description: string;
}

interface SectionListProps {
  items: ListItem[];
}

const SectionList = ({ items }: SectionListProps) => (
  <ul className="pl-6 text-lg text-gray-300 mb-6 sm:text-base md:text-lg lg:text-xl">
    {items.map((item, index) => (
      <li key={index} className="mt-6">
        <strong className="block text-white text-xl mb-1">{item.title}</strong>
        <span className="text-gray-400 text-lg">{item.description}</span>
      </li>
    ))}
  </ul>
);

export default function Features () {
  const featuresList: ListItem[] = [
    {
      title: 'Automated Bounty Distribution',
      description: 'Ensures bounties are validated and transferred without manual intervention.',
    },
    {
      title: 'Seamless GitHub Integration',
      description: 'Connect your GitHub repository to automate issue tracking and bounty assignments.',
    },
    {
      title: 'Secure Bounty Transfers',
      description: 'Uses secure transactions to ensure safe bounty distribution.',
    },
    {
      title: 'Real-Time Notifications',
      description: 'Stay updated with instant notifications on bounty status.',
    },
  ];

  return (
    <div className="w-full h-screen px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16 bg-[#121212]">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
        Features
      </h1>

      <SectionParagraph>
        Our application automates the bounty distribution process for GitHub issues, ensuring seamless and secure transactions.
      </SectionParagraph>

      <SectionHeader>Core Features</SectionHeader>
      <SectionList items={featuresList} />
    </div>
  );
};
