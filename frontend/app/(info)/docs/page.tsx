import { comment } from "postcss";
import { SectionHeader, SectionParagraph } from "../Features/page";

export default function Docs() {
  return (
    <div className="w-full min-h-screen px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16 bg-[#121212]">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
        Documentation
      </h1>

      <SectionParagraph>
        Welcome to <strong>TaskForge</strong>! This guide provides a comprehensive overview of how to use our <strong>bounty automation platform</strong> effectively.
      </SectionParagraph>

      <SectionHeader>1. <strong>Getting Started</strong></SectionHeader>
      <SectionParagraph>
        - <strong>Sign up</strong> for a TaskForge account. <br /><br />
        - <strong>Configure webhooks</strong> to enable automated bounty processing. <br /><br />
        - Ensure your repository includes appropriate <strong>issue labels</strong> for bounty tracking.
      </SectionParagraph>

      <SectionHeader>2. <strong>Creating a Task</strong></SectionHeader>
      <SectionParagraph>
        - Navigate to the <strong>"Create"</strong> page in TaskForge. <br /><br />
        - Specify task details, including <strong>triggers</strong> and <strong>actions</strong> based on the available data. <br /><br />
        - When selecting <strong>email</strong> as an action, enter <strong className="text-white/70">{'{'}comment.email{'}'}</strong> in the <strong>"To"</strong> field and include your relevant text in the <strong>"Body"</strong> field. <br /><br />
        - If selecting <strong>INR</strong> or <strong>Solana</strong> as actions, provide <strong className="text-white/70">{'{'}comment.email{'}'}</strong> in the <strong>"To"</strong> field and <strong className="text-white/70">{'{'}comment.amount{'}'}</strong> in the <strong>"Amount/Solana"</strong> field. <br /><br />
        - <strong>Incorrect formatting</strong> will result in unsuccessful bounty distribution. <br /><br />
        - Both the <strong>sender</strong> and <strong>recipient</strong> must be registered TaskForge users for the bounty to be processed. <br /><br />
        - Review and <strong>confirm</strong> your task before submission.
      </SectionParagraph>

      <SectionHeader>3. <strong>Integrating the Webhook into Your GitHub Repository</strong></SectionHeader>
      <SectionParagraph>
        - Only the <strong>sender</strong> or <strong>repository owner</strong> should perform this integration. <br /><br />
        - Navigate to the repository's <strong>settings</strong> on GitHub. <br /><br />
        - In the left sidebar, select <strong>"Webhooks"</strong>, then click <strong>"Add webhook"</strong>. <br /><br />
        - Paste the generated webhook URL from TaskForge into the <strong>"Payload URL"</strong> field. <br /><br />
        - Select <strong>"application/json"</strong> as the content type. <br /><br />
        - Under <strong>"Which events would you like to trigger this webhook?"</strong> select <strong>"Let me select individual events"</strong>, then check <strong>"Issue Comments"</strong>. <br /><br />
        - Click <strong>"Add webhook"</strong> to finalize the integration. <br /><br />
        - Repository owners must send <strong>bounty details</strong> via the PR comment section by formatting as follows: <br /><br />
          - <strong className="text-white/70">amount: "200", email: "recipient's email"</strong> <br /><br />
        - <strong>INR values</strong> should be provided in rupee format (e.g., amount: "500", amount: "2000"). <br /><br />
        - <strong>Solana values</strong> should be formatted accordingly (e.g., amount: "1", amount: "2"). <br /><br />
        - The <strong>recipient's email</strong> must belong to a registered TaskForge user; otherwise, the transaction will fail.
      </SectionParagraph>

      <SectionHeader>4. <strong>Claiming a Bounty</strong></SectionHeader>
      <SectionParagraph>
        - Complete the <strong>GitHub issue</strong> associated with a bounty. <br /><br />
        - Submit a <strong>pull request (PR)</strong> linked to the issue. <br /><br />
        - Once the PR is <strong>reviewed</strong> by the repository team, the <strong>bounty sender</strong> must enter the bounty details in the PR's comment section. <br /><br />
        - Ensure that the details are <strong>correct</strong> before submitting the comment. <br /><br />
        - After verification, <strong>TaskForge</strong> will automatically process the bounty payout.
      </SectionParagraph>

      <SectionHeader>5. <strong>Security & Compliance</strong></SectionHeader>
      <SectionParagraph>
        - <strong>TaskForge</strong> employs secure <strong>encryption protocols</strong> to safeguard transactions. <br /><br />
        - Users must ensure the <strong>accuracy</strong> of recipient details to avoid misdirected payments. <br /><br />
        - <strong>Webhooks</strong> and <strong>API keys</strong> must be kept confidential to prevent unauthorized access.
      </SectionParagraph>

      <SectionHeader>6. <strong>Support & Assistance</strong></SectionHeader>
      <SectionParagraph>
        Need help? Contact our <strong>support team</strong> at <a className="text-white hover:underline" href="mailto:taskforge18@gmail.com">taskforge18@gmail.com</a> for assistance.
      </SectionParagraph>
    </div>
  );
}