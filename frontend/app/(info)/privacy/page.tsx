import { SectionHeader, SectionHeaderProps, SectionParagraph, SectionParagraphProps } from "../Features/page";

export default function Privacy() {
  return (
    <div className="w-full min-h-screen px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16 bg-[#121212]">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
        Privacy Policy
      </h1>

      <SectionParagraph>
        Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.
      </SectionParagraph>

      <SectionHeader>1. Information We Collect</SectionHeader>
      <SectionParagraph>
        We collect information such as TaskForge account details, bounty transaction data to provide our services.
      </SectionParagraph>

      <SectionHeader>2. How We Use Your Information</SectionHeader>
      <SectionParagraph>
        The collected data is used to process bounties, secure transactions, and enhance the platform’s functionality.
      </SectionParagraph>

      <SectionHeader>3. Third-Party Services</SectionHeader>
      <SectionParagraph>
        We may integrate with third-party services like GitHub for authentication and webhook functionalities.
      </SectionParagraph>

      <SectionHeader>4. User Rights</SectionHeader>
      <SectionParagraph>
        Users have the right to request data deletion, access stored information, of their account preferences.
      </SectionParagraph>

      <SectionHeader>6. Policy Changes</SectionHeader>
      <SectionParagraph>
        We reserve the right to update this policy. Changes will be communicated through our platform or via email.
      </SectionParagraph>

      <SectionHeader>7. Contact Information</SectionHeader>
      <SectionParagraph>
        For privacy-related concerns, contact us at <a className="text-white hover:underline" href="mailto:taskforge18@gmail.com">taskforge18@gmail.com</a>.
      </SectionParagraph>
    </div>
  );
}