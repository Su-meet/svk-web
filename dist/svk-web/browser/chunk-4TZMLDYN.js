import{h as v,k as d,ma as l,t as $,ya as h}from"./chunk-CDYJACJ3.js";var f=class m{platformId=d($);storageService=d(h);businessNumber="918920803434";businessName="SVK Experts";generateBookingMessage(e,t,s,a,c,o){let i=e.discountedPrice??e.price,n=`\u{1F3E0} *New Booking Request - ${this.businessName}*

`;return n+=`\u{1F4CB} *Service Details:*
`,n+=`\u2022 Service: ${e.name}
`,n+=`\u2022 Price: \u20B9${i}
`,n+=`\u2022 Duration: ${e.duration}

`,n+=`\u{1F464} *Customer Details:*
`,n+=`\u2022 Name: ${t}
`,n+=`\u2022 Address: ${c}

`,n+=`\u{1F4C5} *Schedule:*
`,n+=`\u2022 Date: ${s}
`,n+=`\u2022 Time: ${a}
`,o&&(n+=`
\u{1F4DD} *Notes:* ${o}`),n}generateCartBookingMessage(e,t,s,a,c,o,i){let n=e.reduce((g,p)=>{let u=p.service.discountedPrice??p.service.price;return g+u*p.quantity},0),r=`\u{1F3E0} *New Booking Request - ${this.businessName}*

`;return r+=`\u{1F4CB} *Services:*
`,e.forEach((g,p)=>{let u=g.service.discountedPrice??g.service.price;r+=`${p+1}. ${g.service.name}
`,r+=`   Qty: ${g.quantity} \xD7 \u20B9${u} = \u20B9${u*g.quantity}
`}),r+=`
\u{1F4B0} *Total Amount: \u20B9${n}*

`,r+=`\u{1F464} *Customer Details:*
`,r+=`\u2022 Name: ${t}
`,r+=`\u2022 Phone: ${s}
`,r+=`\u2022 Address: ${o}

`,r+=`\u{1F4C5} *Schedule:*
`,r+=`\u2022 Date: ${a}
`,r+=`\u2022 Time: ${c}
`,i&&(r+=`
\u{1F4DD} *Notes:* ${i}`),r}generateInquiryMessage(e){return`Hi! I'm interested in booking the "${e.name}" service. Can you please provide more details about pricing and availability?`}openWhatsApp(e){if(!l(this.platformId))return;let t=encodeURIComponent(e),s=`https://wa.me/${this.businessNumber}?text=${t}`;window.open(s,"_blank")}bookService(e,t,s,a,c,o){let i=this.generateBookingMessage(e,t,s,a,c,o);this.openWhatsApp(i)}bookFromCart(e,t,s,a,c,o){let i=this.storageService.cart();if(i.length===0)return;let n=this.generateCartBookingMessage(i,e,t,s,a,c,o);this.openWhatsApp(n)}inquireAboutService(e){let t=this.generateInquiryMessage(e);this.openWhatsApp(t)}static \u0275fac=function(t){return new(t||m)};static \u0275prov=v({token:m,factory:m.\u0275fac,providedIn:"root"})};export{f as a};
