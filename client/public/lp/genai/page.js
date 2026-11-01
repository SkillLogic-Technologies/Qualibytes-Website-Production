(function(){
/* ---------- Settings ---------- */
const CONFIG = {
  sheetUrl: "https://script.google.com/macros/s/AKfycbz17v2JhDWCrmciLEbQD7328nm0fzQDtwZeryDK81-D4Z5_F8pYB86w-Be62AA2ZqRw/exec", // same Admission Apps Script as the inquiry form (forwards to the Hub)
  program: "Gen AI & Agentic AI Engineering",
  whatsapp: "918130520148",    // company WhatsApp, 91 + 10 digits
  callNumber: "918130520148",  // company call line, 91 + 10 digits
  email: "hi@qualibytes.com",
  brochure: "/lp/genai/assets/Qualibytes_GenAI_Agentic_AI_Engineering_Brochure.pdf",
  waText: "Hi Qualibytes, I want to know more about the Gen AI & Agentic AI Engineering course.",
  // Ad tracking: leave empty to switch off
  metaPixelId: "",             // = Hub setting meta_dataset
  ga4Id: "",                   // "G-XXXXXXX"
  gadsId: "",                  // "AW-XXXXXXXXX"
  gadsLeadLabel: "", gadsCallLabel: "", gadsWaLabel: "",
  popupDelayMs: 35000,         // timed pop-up after 35 s or 55% scroll
  popupScroll: .55
};
/* ------------------------------ */

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};
const sess = {
  get(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ sessionStorage.setItem(k, v); }catch(e){} }
};

// Where the visitor came from (same rules as the inquiry form)
function source(){
  let s = "";
  try{ const q = new URLSearchParams(location.search); s = q.get("utm_source") || q.get("source") || "";
       const camp = q.get("utm_campaign"); if(s && camp) s += " / " + camp; }catch(e){}
  if(!s){ const h = (location.hash||"").slice(1); if(/^[a-z0-9._~-]{2,40}$/i.test(h) && !["enquire","syllabus"].includes(h) && !/^phase-\d+$/.test(h)) s = h; }
  if(!s){ try{ const r = document.referrer && new URL(document.referrer).hostname; if(r) s = r.replace(/^www\./,""); }catch(e){} }
  return s || "Direct";
}

// Ad details from the link (Meta / Google URL parameters), kept for 30 days
const AD_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","campaign_id","adset_id","ad_id","ad_name","adset_name","campaign_name",
                 "placement","platform","site_source_name","keyword","gclid","gbraid","wbraid","fbclid","form_name"];
function adDetails(){
  let now = {};
  try{ const q = new URLSearchParams(location.search); AD_KEYS.forEach(k=>{ const v=q.get(k); if(v) now[k]=v.slice(0,200); }); }catch(e){}
  if(Object.keys(now).length){
    now.landing_page = location.origin + location.pathname;
    try{ if(document.referrer) now.referrer = new URL(document.referrer).hostname; }catch(e){}
    store.set("qb-ad", {at: Date.now(), d: now});
    return now;
  }
  const old = store.get("qb-ad");
  const d = old && old.d && Date.now() - old.at < 30*864e5 ? old.d : {};
  if(!d.landing_page) d.landing_page = location.origin + location.pathname;
  return d;
}
const AD = adDetails();
const SRC = source();

// ---------- Tracking (loads only the IDs filled in CONFIG) ----------
function loadScript(src){ const s=document.createElement("script"); s.async=true; s.src=src; document.head.appendChild(s); }
if(CONFIG.metaPixelId){
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", CONFIG.metaPixelId); fbq("track", "PageView");
}
if(CONFIG.ga4Id || CONFIG.gadsId){
  loadScript("https://www.googletagmanager.com/gtag/js?id=" + (CONFIG.gadsId || CONFIG.ga4Id));
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag("js", new Date());
  if(CONFIG.ga4Id) gtag("config", CONFIG.ga4Id);
  if(CONFIG.gadsId) gtag("config", CONFIG.gadsId, {allow_enhanced_conversions: true});
}
const fb = (...a) => { try{ window.fbq && fbq(...a); }catch(e){} };
const gt = (...a) => { try{ window.gtag && gtag(...a); }catch(e){} };
function adsConv(label, extra){ if(CONFIG.gadsId && label) gt("event", "conversion", Object.assign({send_to: CONFIG.gadsId + "/" + label}, extra||{})); }

// ---------- Call / WhatsApp / email links ----------
const pretty = n => "+91 " + n.slice(2,7) + " " + n.slice(7);
const waUrl = (text) => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text || CONFIG.waText);
$$(".js-wa").forEach(a=>{
  a.href = waUrl(); a.target = "_blank"; a.rel = "noopener";
  a.addEventListener("click", ()=>{
    fb("track", "Contact", {method: "whatsapp", content_name: CONFIG.program});
    gt("event", "contact", {method: "whatsapp", location: a.dataset.src || ""});
    adsConv(CONFIG.gadsWaLabel);
  });
});
$$(".js-call").forEach(a=>{
  a.href = "tel:+" + CONFIG.callNumber;
  a.addEventListener("click", ()=>{
    fb("track", "Contact", {method: "call", content_name: CONFIG.program});
    gt("event", "contact", {method: "call"});
    adsConv(CONFIG.gadsCallLabel);
  });
});
$$(".js-call-label").forEach(s=> s.textContent = pretty(CONFIG.callNumber));
$$(".js-mail").forEach(a=>{ a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
$$(".js-year").forEach(s=> s.textContent = new Intl.DateTimeFormat("en-GB", {timeZone:"Asia/Kolkata", year:"numeric"}).format(new Date()));

// ---------- Forms ----------
function setErr(el, msg){
  const f = el.closest(".field"); if(!f) return;
  f.classList.toggle("invalid", !!msg);
  if(msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  const e = f.querySelector(".err"); if(e) e.textContent = msg || "";
}
// link each error message to its field, and read it out when it changes
$$("form.js-lead .field").forEach((f, i)=>{
  const e = f.querySelector(".err"), el = f.querySelector("input, select"); if(!e || !el) return;
  e.id = "err-" + (el.id || i); e.setAttribute("aria-live", "polite"); el.setAttribute("aria-describedby", e.id);
});
$$(".consent-err").forEach(e=> e.setAttribute("aria-live", "polite"));
const rules = {
  name:  v => (v.trim().length<2 || !/^[a-zA-Z][a-zA-Z .'-]*$/.test(v.trim())) ? "Enter your full name." : "",
  phone: v => !/^[6-9]\d{9}$/.test(v) ? "Enter a 10-digit mobile number starting with 6–9." : "",
  email: v => (v.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) ? "Check your email, or leave it empty." : "",
  city:  v => v.trim().length<2 ? "Enter your city." : "",
  status:v => !v ? "Select what you're doing now." : ""
};
function check(form){
  let first = null;
  Object.keys(rules).forEach(k=>{
    const el = form.elements[k]; if(!el) return;
    const msg = rules[k](el.value); setErr(el, msg); if(msg && !first) first = el;
  });
  const c = form.elements.consent, ce = $(".consent-err", form);
  if(!c.checked){ ce.textContent = "Please allow us to contact you, so our counselor can call."; first = first || c; } else ce.textContent = "";
  if(first) first.focus();
  return !first;
}

function send(d){
  if(!CONFIG.sheetUrl) return;
  const ad = Object.assign({}, AD, {form_name: d.entry, consent: "yes", consent_at: d.consentAt});
  try{
    fetch(CONFIG.sheetUrl, {method:"POST", mode:"no-cors", keepalive:true,
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body: JSON.stringify({type:"inquiry", fields:{
        "Inquiry ID": d.id, "Name": d.name, "Phone": "+91 " + d.phone, "Email": d.email,
        "City": d.city, "State": "", "Program": CONFIG.program, "Current Status": d.status,
        "Qualification": "", "Graduation Year": "", "Best Time to Call": d.calltime,
        "Question": "", "Source": d.source, "Ad Details": new URLSearchParams(ad).toString()
      }})}).catch(()=>{});
  }catch(e){}
}

function track(d){
  if(sess.get("qb-lp-fired-" + d.id)) return;      // one Lead per Inquiry ID
  sess.set("qb-lp-fired-" + d.id, "1");
  fb("track", "Lead", {content_name: CONFIG.program, content_category: d.entry}, {eventID: d.id});
  gt("set", "user_data", Object.assign({phone_number: "+91" + d.phone}, d.email ? {email: d.email} : {}));
  gt("event", "generate_lead", {form_name: d.entry, program: CONFIG.program});
  adsConv(CONFIG.gadsLeadLabel, {transaction_id: d.id});
}

// "28/10/2026, 4:30 PM" in IST
function istNow(){ return new Intl.DateTimeFormat("en-GB", {timeZone:"Asia/Kolkata", day:"2-digit", month:"2-digit", year:"numeric", hour:"numeric", minute:"2-digit", hour12:true}).format(new Date()).replace(/am|pm/, m=>m.toUpperCase()); }
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function showDone(form, d){
  $(".view-form", form).hidden = true;
  const box = $(".view-done", form); box.hidden = false;
  const when = d.calltime && d.calltime !== "Anytime" ? "in the " + d.calltime.split(" (")[0].toLowerCase() + " (" + d.calltime.split("(")[1].replace(")","") + ")" : "soon";
  box.innerHTML = `
    <div class="tick" aria-hidden="true">✓</div>
    <span class="eyebrow">Request received</span>
    <h2>Thank you, ${esc(d.name.split(" ")[0])}</h2>
    <p class="lede">A Qualibytes career counselor will call you on +91 ${d.phone.slice(0,5)} ${d.phone.slice(5)} about the Gen AI &amp; Agentic AI Engineering course.</p>
    <ol class="next">
      <li><strong>We call you ${esc(when)}</strong><span class="note">Keep your phone close. The call is free.</span></li>
      <li><strong>Talk through your goals</strong><span class="note">Syllabus, sample projects, fee, scholarships and batch timings.</span></li>
      <li><strong>Pick your batch</strong><span class="note">Only when you are ready. No pressure.</span></li>
    </ol>
    <div class="btns">
      <a class="btn wa block" href="${waUrl("Hi Qualibytes, I just requested a call about the Gen AI & Agentic AI Engineering course. My name is " + d.name + ".")}" target="_blank" rel="noopener">Chat on WhatsApp now</a>
      <a class="btn line block" href="${CONFIG.brochure}" target="_blank" rel="noopener" download>Download the syllabus PDF</a>
    </div>`;
  $(".btn.wa", box).addEventListener("click", ()=>{ fb("track","Contact",{method:"whatsapp"}); gt("event","contact",{method:"whatsapp",location:"success"}); adsConv(CONFIG.gadsWaLabel); });
}

$$("input[name=phone]").forEach(i=> i.addEventListener("input", e=>{ let d = e.target.value.replace(/\D/g,""); if(d.length === 12 && d.startsWith("91")) d = d.slice(2); else if(d.length === 11 && d.startsWith("0")) d = d.slice(1); e.target.value = d.slice(0,10); }));
$$("form.js-lead").forEach(form=>{
  // Validate a field when the visitor leaves it, and clear its error as they fix it
  form.addEventListener("focusout", e=>{ const k=e.target.name; if(rules[k] && e.target.value) setErr(e.target, rules[k](e.target.value)); });
  form.addEventListener("input", e=>{ const f=e.target.closest(".field"); if(f && f.classList.contains("invalid") && rules[e.target.name]) setErr(e.target, rules[e.target.name](e.target.value)); });
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const btn = $(".js-submit", form);
    if(btn.disabled) return;
    if(form.elements.website.value) return;           // spam bot filled the hidden field
    if(!check(form)) return;
    if(navigator.onLine === false){ $(".consent-err", form).textContent = "You seem to be offline. Please check your internet and try again, or chat with us on WhatsApp."; return; }
    btn.disabled = true; btn.textContent = "Sending…";
    const el = form.elements, t = form.querySelector("input[name=calltime]:checked");
    const d = {
      entry: form.dataset.entry, name: el.name.value.trim().replace(/\s+/g," "), phone: el.phone.value,
      email: el.email ? el.email.value.trim() : "", city: el.city ? el.city.value.trim() : "",
      status: el.status.value, calltime: t ? t.value : "Anytime", source: SRC, at: Date.now(),
      consentAt: istNow(),
      id: "QI-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).slice(2,4).toUpperCase()
    };
    send(d); track(d);
    const inline = $("#enquire form"); if(inline !== form) showDone(inline, d);   // stop a second enquiry from the hero form
    store.set("qb-lp-genai", d);
    setTimeout(()=>{ showDone(form, d); if(form.closest("dialog")) $("#pop").scrollTop = 0; }, 400);
  });
});

// Someone who already enquired in the last 7 days sees the thank-you card, and no pop-ups
const prev = store.get("qb-lp-genai");
const done = prev && prev.at && Date.now() - prev.at < 7*864e5;
if(done) showDone($("#enquire form"), prev);

// ---------- Pop-up ----------
const pop = $("#pop");
const POP_COPY = {
  callback: ["Get a free career call", "Share your number and a counselor will call you."],
  syllabus: ["Get the full syllabus PDF", "Share your number to download the 15-page syllabus. A counselor will also call to answer your questions."],
  timed:    ["Talk to a career counselor", "Not sure if Agentic AI is right for you? Get a free call. No obligation."],
  exit:     ["Before you go: get the syllabus", "Download the full 4-month syllabus and get a free career call."]
};
function openPop(kind){
  if(!pop || pop.open) return;
  const f = $("form", pop);
  if(store.get("qb-lp-genai") && Date.now() - store.get("qb-lp-genai").at < 7*864e5){
    showDone(f, store.get("qb-lp-genai"));                // already enquired: show the thank-you with WhatsApp + PDF
  }else{
    const c = POP_COPY[kind] || POP_COPY.callback;
    $("#pop-title").textContent = c[0]; $("#pop-sub").textContent = c[1];
    f.dataset.entry = "lp-genai-popup-" + kind;
  }
  if(typeof pop.showModal === "function") pop.showModal(); else pop.setAttribute("open","");
  sess.set("qb-lp-pop", "1");
  gt("event", "popup_view", {type: kind});
}
function closePop(){ if(pop.close) pop.close(); else pop.removeAttribute("open"); }
$$(".js-pop").forEach(b=> b.addEventListener("click", ()=> openPop(b.dataset.pop)));
$(".pop-x", pop).addEventListener("click", closePop);
pop.addEventListener("click", e=>{ if(e.target === pop) closePop(); });  // click on the backdrop
pop.addEventListener("close", ()=> store.set("qb-lp-dismiss", Date.now()));

// Automatic pop-up (desktop only, per Google's mobile interstitial rules): at most once per session,
// never if already enquired or dismissed in the last 24 h. On mobile, pop-ups open only from buttons.
const dismissed = store.get("qb-lp-dismiss");
const autoOk = () => !done && !sess.get("qb-lp-pop") && !(dismissed && Date.now() - dismissed < 864e5) && !store.get("qb-lp-genai")
                     && !document.activeElement.closest?.("form");   // don't interrupt someone typing in the inline form
if(!done && matchMedia("(min-width: 900px)").matches){
  let fired = false;
  const auto = kind => { if(fired || !autoOk()) return; fired = true; openPop(kind); };
  setTimeout(()=> auto("timed"), CONFIG.popupDelayMs);
  addEventListener("scroll", function onS(){
    const h = document.documentElement;
    if((h.scrollTop + innerHeight) / h.scrollHeight > CONFIG.popupScroll){ removeEventListener("scroll", onS); auto("timed"); }
  }, {passive: true});
  if(matchMedia("(pointer: fine)").matches){              // exit-intent on desktop only
    document.addEventListener("mouseout", e=>{ if(!e.relatedTarget && e.clientY <= 0) auto("exit"); });
  }
}
})();

(function(){
  const b = document.querySelector(".js-expand"); if(!b) return;
  const all = () => Array.from(document.querySelectorAll("details.phase"));
  const sync = () => { const open = all().every(d=>d.open); b.textContent = open ? "Collapse all phases" : "Expand all phases"; b.setAttribute("aria-expanded", open); };
  b.addEventListener("click", ()=>{ const open = !all().every(d=>d.open); all().forEach(d=> d.open = open); sync(); });
  all().forEach(d=> d.addEventListener("toggle", sync));
  document.querySelectorAll(".roadmap a").forEach(a=> a.addEventListener("click", ()=>{ const d = document.getElementById("phase-" + a.dataset.phase); if(d) d.open = true; }));
})();
