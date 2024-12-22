"use strict";(()=>{var e={};e.id=963,e.ids=[963],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9647:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>f,originalPathname:()=>h,patchFetch:()=>b,requestAsyncStorage:()=>g,routeModule:()=>c,serverHooks:()=>u,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>v});var a={};r.r(a),r.d(a,{POST:()=>p});var i=r(5419),n=r(9108),o=r(9678),s=r(8070);let d=require("puppeteer");var l=r.n(d);async function p(e){try{let{content:t,userInfo:r,legislators:a}=await e.json();if(!t||!r||!a)return s.Z.json({error:"Missing required fields"},{status:400});let i=await l().launch({headless:!0}),n=await i.newPage(),o=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),d=a.map((e,a)=>`
      ${a>0?'<div style="page-break-before: always;"></div>':""}
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page {
              size: letter;
              margin: 1in;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              line-height: 1;
              color: #000000;
              margin: 0;
              padding: 0;
            }
            .sender-info {
              margin-bottom: 24pt;
              text-align: left;
            }
            .date {
              margin-bottom: 24pt;
            }
            .recipient-info {
              margin-bottom: 24pt;
            }
            .salutation {
              margin-bottom: 24pt;
            }
            .letter-content {
              margin-bottom: 24pt;
            }
            .letter-content p {
              margin: 0 0 24pt 0;
              text-align: left;
            }
            .letter-content p:last-child {
              margin-bottom: 24pt;
            }
            .closing {
              margin-bottom: 48pt; /* 4 line spaces for signature */
            }
            .signature {
              margin-bottom: 0;
            }
          </style>
        </head>
        <body>
          <div class="sender-info">
            ${r.name}<br>
            ${r.address}<br>
            ${r.city}, ${r.state} ${r.zip}
          </div>

          <div class="date">
            ${o}
          </div>

          <div class="recipient-info">
            ${e.name}<br>
            ${e.role}<br>
            ${e.address.street}<br>
            ${e.address.suite}<br>
            ${e.address.city}, ${e.address.state} ${e.address.zip}
          </div>

          <div class="salutation">
            Dear ${e.role} ${e.name},
          </div>

          <div class="letter-content">
            ${t.split("\n\n").map(e=>`<p>${e}</p>`).join("")}
          </div>

          <div class="closing">
            Sincerely,
          </div>

          <div class="signature">
            ${r.name}
          </div>
        </body>
      </html>
    `).join("");await n.setContent(d);let p=await n.pdf({format:"Letter",margin:{top:"1in",right:"1in",bottom:"1in",left:"1in"},printBackground:!0,preferCSSPageSize:!0});return await i.close(),new s.Z(p,{headers:{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="letters-to-legislators.pdf"'}})}catch(e){return console.error("Error generating PDF:",e),s.Z.json({error:"Failed to generate PDF"},{status:500})}}let c=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/generate-pdf/route",pathname:"/api/generate-pdf",filename:"route",bundlePath:"app/api/generate-pdf/route"},resolvedPagePath:"/Users/jrs/Library/CloudStorage/Dropbox/ryan/Projects/@inprogress_proj/retired-teachers/legislative-action-page/app/api/generate-pdf/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:m,serverHooks:u,headerHooks:f,staticGenerationBailout:v}=c,h="/api/generate-pdf/route";function b(){return(0,o.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:m})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,206],()=>r(9647));module.exports=a})();