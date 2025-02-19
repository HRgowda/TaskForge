import { SectionHeaderProps, SectionParagraphProps, SectionHeader, SectionParagraph } from "../Features/page"

export default function TnC() {
  return (
    <div className="w-full min-h-screen px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16 bg-[#121212]">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
        Terms & Conditions
      </h1>

      <SectionParagraph>
        By using our bounty automation platform, you agree to the following terms and conditions. Please read carefully.
      </SectionParagraph>

      <SectionHeader>1. Introduction</SectionHeader>
      <SectionParagraph>
      . Welcome to <strong>TaskForge</strong>. By using our services, you agree to comply with these Terms and Conditions. <br />
      . This platform automates bounty distribution for GitHub issues through seamless integration and secure transactions. <br />
      . Please read these terms carefully before using the service.
      </SectionParagraph>

      <SectionHeader>2. Eligibility</SectionHeader>
      <SectionParagraph>
        . Users must have a valid GitHub and TaskForge account and comply with GitHub's Terms of Service. <br />
        . Users must provide accurate bounty details, including the correct recipient information. <br />
        . The platform is intended for legal use only and cannot be used for fraudulent activities.
      </SectionParagraph>

      <SectionHeader>3. Service Description</SectionHeader>
      <SectionParagraph>
        . Our platform automates bounty rewards by integrating with GitHub repositories via webhooks. <br />
        . Users can submit bounty details, and upon PR closure, the system verifies the transaction and sends rewards securely. <br />
        . We ensure transactions are executed based on predefined conditions without manual intervention.
      </SectionParagraph>

      <SectionHeader>4. User Responsibilities</SectionHeader>
      <SectionParagraph>
        . Users must provide accurate bounty details and configure their GitHub repository correctly. <br />
        . Any disputes regarding bounty payments must be resolved between the repository owner and contributors.
      </SectionParagraph>

      <SectionHeader>5. Security & Privacy</SectionHeader>
      <SectionParagraph>
        . The platform employs secure encryption protocols for handling transactions and user data. <br />
        . Webhooks are uniquely generated for each user to ensure security and prevent unauthorized access.
      </SectionParagraph>

      <SectionHeader>6. Limitations & Liability</SectionHeader>
      <SectionParagraph>
        . We do not guarantee that every bounty submission will be successfully processed due to potential GitHub API limitations or external factors. <br />
        . The platform is not liable for incorrect payments due to user errors in providing bounty details. <br />
        . In case of technical failures, we will make reasonable efforts to restore functionality but do not guarantee uptime. <br />
        . We are not responsible for any disputes between contributors and repository owners regarding bounty eligibility.
      </SectionParagraph>

      <SectionHeader>7. Contact Information</SectionHeader>
      <SectionParagraph>
        For any queries regarding these terms, please contact our support team at <a className="text-white hover:underline" href="mailto:taskforge18@gmail.com">taskforge18@gmail.com</a>.
      </SectionParagraph>
    </div>
  );
}