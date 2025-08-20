import { saveAs } from "file-saver";

export function exportLandingPage(data) {
  const html = `
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>${data.headline}</title>
       <script src="https://cdn.tailwindcss.com"></script>
     </head>
     <body class="bg-gray-50">
       <section class="p-8 text-center">
         <h1 class="text-4xl font-bold mb-4">${data.headline}</h1>
         <p class="text-lg mb-6">${data.subheadline}</p>
         <ul class="mb-6">
           ${data.benefits.map((b) => `<li class="mb-2">✅ ${b}</li>`).join("")}
         </ul>
         <a href="#" class="bg-blue-600 text-white px-6 py-3 rounded">${
           data.cta
         }</a>
       </section>
     </body>
     </html>
   `;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  saveAs(blob, "landing-page.html");
}
