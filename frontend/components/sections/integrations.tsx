// "use client";

// const integrations = [
//   { name: "Slack", color: "bg-[#4A154B]" },
//   { name: "Google", color: "bg-[#4285F4]" },
//   { name: "Notion", color: "bg-black" },
//   { name: "GitHub", color: "bg-[#2088FF]" },
//   { name: "Trello", color: "bg-[#0079BF]" },
//   { name: "Asana", color: "bg-[#F06A6A]" },
//   { name: "Dropbox", color: "bg-[#0061FF]" },
//   { name: "Zoom", color: "bg-[#2D8CFF]" },
// ];

// export function Integrations() {
//   return (
//     <div className="py-24 sm:py-32 bg-gray-50" id="integrations">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             Connect with your favorite tools
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             TaskForge works with 1000+ apps and services you use every day
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
//           {integrations.map((app, i) => (
//             <div
//               key={i}
//               className="group relative aspect-square rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//             >
//               <div className={`absolute inset-0 ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-2xl font-semibold text-gray-900">{app.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }