
const STORE_KEY = "gymAssistantData_v1";

const defaultData = {
  profile: {
    goal: "Build muscle and strength, stay athletic, improve physique, prioritize arms",
    proteinTarget: "130–150 g",
    latestWeight: 78.0
  },
  schedule: [
    {day:"Saturday", session:"Push"},
    {day:"Sunday", session:"Pull"},
    {day:"Monday", session:"Legs + Core"},
    {day:"Tuesday", session:"Cardio / Sport"},
    {day:"Wednesday", session:"Upper + Arms"},
    {day:"Thursday", session:"Rest / Lifestyle"},
    {day:"Friday", session:"Rest / Sport"}
  ],
  baselines: {
    measurements: {
      "Shoulders":125,"Chest":95,"Neck":39,"Hips":99,
      "L Biceps relaxed":30,"R Biceps relaxed":30,
      "L Biceps flexed":34,"R Biceps flexed":34,
      "L Forearm":28,"R Forearm":28,
      "L Thigh":48,"R Thigh":48,"L Calf":36,"R Calf":34
    },
    strength: {
      "Bench Press":"50 kg × 9",
      "Incline DB Press":"18 kg × 10",
      "Lat Pulldown":"39 kg × 10",
      "Leg Press":"45 kg × 12",
      "Prone Leg Curl":"27 kg × 12",
      "Preacher Curl":"18 kg × 15",
      "Hammer Curl":"10 kg × 16"
    }
  },
  weights: [{date:"2026-08-04",value:78.0},{date:"2026-08-05",value:78.0}],
  measurements: [],
  sessions: [],
  readiness: {energy:7,soreness:2,pain:0,sleep:7,sport:false,travel:false},
  theme:"dark"
};

const programs = {
  "Push":{
    note:"Strength-focused chest/triceps day with shoulder-friendly substitutions.",
    warmup:[
      "5 min easy cardio",
      "Band pull-aparts — 2×15",
      "External rotations — 2×12/side",
      "Light face pulls — 2×15",
      "Scapular push-ups — 1×12",
      "Bench ramp-up: bar ×15, 30 kg ×10, 40 kg ×5"
    ],
    exercises:[
      ["Bench Press",4,"6–8","52.5 kg","Progress when all 4 sets reach 8 clean reps."],
      ["Incline DB Press",3,"8–12","16 kg","Use 18 kg only when shoulder is fully comfortable."],
      ["Machine Chest Press",3,"8–12","32–39 kg","Preferred stable chest volume."],
      ["Cable Lateral Raise",3,"12–15","2.3 kg","Strict, controlled; prioritize stability."],
      ["Rope Triceps Pushdown",3,"10–15","11.3 kg","No shoulder compensation."],
      ["Single-Arm Cable Pushdown",2,"12–15","4–7.9 kg","Right first, left matches."]
    ]
  },
  "Pull":{
    note:"Complete back session plus arm-priority biceps work.",
    warmup:[
      "5 min easy cardio",
      "Band pull-aparts — 2×15",
      "External rotations — 2×12/side",
      "Light face pulls — 2×15",
      "Light pulldown + row ramp-up sets"
    ],
    exercises:[
      ["Wide-Grip Lat Pulldown",3,"8–12","39 kg","Increase after 12×3 clean."],
      ["Seated Cable Row — Neutral",3,"8–12","32 kg","Stable horizontal pull."],
      ["Chest-Supported Row",3,"8–12","32 kg","Stay below shoulder-irritating load."],
      ["Face Pull",3,"12–15","13.5 kg","Permanent shoulder-health movement."],
      ["Rear Delt Fly",3,"10–15","18 kg","Control over load."],
      ["Back Extension",3,"12–15","BW","Posterior chain / spinal erectors."],
      ["BTB Cable Curl",3,"10–12","7.9 kg","Long-head emphasis."],
      ["Preacher Curl",3,"10–15","18 kg","Own 15×3 before increasing."],
      ["Hammer Curl",3,"8–12","10–12 kg","Brachialis + brachioradialis."]
    ]
  },
  "Legs + Core":{
    note:"Knee-aware lower-body strength and core day. Football can shift this by 24–48h.",
    warmup:[
      "5–7 min bike",
      "Leg swings — 15 each direction",
      "Glute bridges — 2×12",
      "Leg press warm-up sets"
    ],
    exercises:[
      ["Leg Press",4,"8–12","45 kg+","Increase only when knee is comfortable."],
      ["Prone Leg Curl",3,"10–15","27 kg","Controlled eccentric."],
      ["Bulgarian Split Squat",2,"8–12","BW","Load only when knee feels fully stable."],
      ["Leg Extension",3,"10–15","25 kg","Controlled; stop if knee pain increases."],
      ["Single-Leg Calf Raise — Left",3,"12–20","BW","Full ROM."],
      ["Single-Leg Calf Raise — Right",4,"12–20","BW","One extra set to address calf gap."],
      ["Machine Crunch",3,"12–15","36 kg","Progress reps first."],
      ["Hanging Leg Raise",3,"10–15","BW","Slow lowering."]
    ]
  },
  "Cardio / Sport":{
    note:"Football/padel replaces cardio. If fatigued, choose walking + mobility.",
    warmup:["5 min easy movement","Joint-specific mobility"],
    exercises:[
      ["Zone 2 Cardio",1,"30–45 min","Easy-moderate","Skip if doing football/padel."],
      ["Mobility",1,"10 min","Easy","Hips, calves, thoracic spine, shoulders."]
    ]
  },
  "Upper + Arms":{
    note:"Second upper stimulus with arm specialization. Keep 1–3 RIR.",
    warmup:[
      "5 min easy cardio",
      "Band pull-aparts — 2×15",
      "External rotations — 2×12/side",
      "Light face pulls — 2×15"
    ],
    exercises:[
      ["Machine Chest Press",3,"10–12","32 kg","Stable pressing."],
      ["Lat Pulldown",3,"10–12","39 kg","Controlled."],
      ["Seated Cable Row",3,"10–12","32 kg","Neutral grip."],
      ["Cable Lateral Raise",2,"12–15","2.3 kg","Strict and pain-free."],
      ["Face Pull",2,"15","13.5 kg","Shoulder support."],
      ["Preacher Curl",3,"10–15","18 kg","Arm priority."],
      ["Hammer Curl",2,"10–12","10–12 kg","Arm thickness."],
      ["Rope Pushdown",3,"10–15","11.3 kg","Primary triceps work."],
      ["Single-Arm Pushdown",2,"12–15","4–7.9 kg","Right first, left matches."]
    ]
  },
  "Rest / Lifestyle":{
    note:"Recovery day. Walking and normal lifestyle activity are enough.",
    warmup:[],
    exercises:[]
  },
  "Rest / Sport":{
    note:"Rest unless you choose sport. Intense football counts as a hard conditioning session.",
    warmup:[],
    exercises:[]
  }
};

let data = loadData();
let currentSessionName = null;
let currentAdjustment = "green";

function loadData(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return structuredClone(defaultData);
    return Object.assign(structuredClone(defaultData), JSON.parse(raw));
  }catch(e){ return structuredClone(defaultData); }
}
function saveData(){ localStorage.setItem(STORE_KEY, JSON.stringify(data)); }

function todayName(){
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}
function sessionForToday(){
  const d=todayName();
  return (data.schedule.find(x=>x.day===d)||{}).session || "Rest / Lifestyle";
}
function readinessLevel(){
  const r=data.readiness;
  if(r.pain>=5 || (r.sport && r.soreness>=5) || r.energy<=3) return "red";
  if(r.pain>=3 || r.soreness>=5 || r.sleep<=4 || r.travel || r.sport) return "yellow";
  return "green";
}
function adjustedSession(base){
  const lvl=readinessLevel();
  if(lvl==="red"){
    if(base==="Legs + Core" || base==="Cardio / Sport") return "Rest / Lifestyle";
    return base;
  }
  if(lvl==="yellow" && data.readiness.sport && base==="Legs + Core") return "Upper + Arms";
  return base;
}
function adjustmentText(base, actual){
  const lvl=readinessLevel();
  if(lvl==="green") return "Full planned session.";
  if(lvl==="yellow"){
    if(base!==actual) return "Plan shifted to protect recovery after sport / fatigue.";
    return "Yellow day: keep the session but reduce optional volume by ~20–30%.";
  }
  return actual==="Rest / Lifestyle" ? "Red day: recovery takes priority." : "Red day: train only if the affected area is not involved.";
}

function renderDashboard(){
  const base=sessionForToday(), actual=adjustedSession(base);
  currentSessionName=actual;
  document.getElementById("todayTitle").textContent=actual;
  document.getElementById("todayReason").textContent=adjustmentText(base,actual);
  const ws=data.weights.at(-1);
  document.getElementById("latestWeight").textContent=ws?`${ws.value.toFixed(1)} kg`:"—";
  if(data.weights.length>=2){
    const last=data.weights.slice(-7);
    const avg=last.reduce((a,b)=>a+b.value,0)/last.length;
    document.getElementById("weightTrend").textContent=`Recent avg ${avg.toFixed(1)} kg`;
  }
  const startOfWeek=new Date(); startOfWeek.setDate(startOfWeek.getDate()-6);
  const done=data.sessions.filter(s=>new Date(s.date)>=startOfWeek).length;
  document.getElementById("sessionsDone").textContent=`${done} / 5`;

  const badge=document.getElementById("readinessBadge");
  const lvl=readinessLevel();
  badge.textContent=lvl[0].toUpperCase()+lvl.slice(1);
  badge.style.background=lvl==="green"?"var(--good)":lvl==="yellow"?"var(--warn)":"var(--bad)";

  const wp=document.getElementById("weekPlan"); wp.innerHTML="";
  data.schedule.forEach(x=>{
    const el=document.createElement("div");
    el.className="week-day"+(x.day===todayName()?" today":"");
    el.innerHTML=`<strong>${x.day}</strong><span>${x.session}</span>`;
    wp.appendChild(el);
  });
}

function renderWorkout(sessionName){
  currentSessionName=sessionName || adjustedSession(sessionForToday());
  const p=programs[currentSessionName] || programs["Rest / Lifestyle"];
  document.getElementById("workoutTitle").textContent=currentSessionName;
  document.getElementById("workoutNote").textContent=p.note;
  const wl=document.getElementById("warmupList"); wl.innerHTML="";
  (p.warmup||[]).forEach(w=>{const li=document.createElement("li");li.textContent=w;wl.appendChild(li)});
  const list=document.getElementById("exerciseList"); list.innerHTML="";
  p.exercises.forEach((ex,idx)=>{
    const [name,sets,reps,target,note]=ex;
    const card=document.createElement("div"); card.className="exercise"; card.dataset.exercise=name;
    card.innerHTML=`<div class="exercise-head"><div><h3>${idx+1}. ${name}</h3><div class="target">${sets} sets · ${reps} · target ${target}</div><div class="small">${note||""}</div></div></div>
    <div class="small" style="margin-top:10px">Set &nbsp;&nbsp;&nbsp; Reps &nbsp;&nbsp;&nbsp; Weight &nbsp;&nbsp;&nbsp; RIR</div>`;
    for(let i=1;i<=sets;i++){
      const row=document.createElement("div");row.className="set-row";
      row.innerHTML=`<span class="set-label">${i}</span>
      <input type="number" inputmode="numeric" placeholder="reps" data-k="reps">
      <input type="number" inputmode="decimal" placeholder="kg" step="0.1" data-k="weight">
      <input type="number" inputmode="numeric" placeholder="RIR" min="0" max="5" data-k="rir">`;
      card.appendChild(row);
    }
    list.appendChild(card);
  });
}

function finishWorkout(){
  const cards=[...document.querySelectorAll(".exercise")];
  const exercises=cards.map(card=>{
    const rows=[...card.querySelectorAll(".set-row")];
    return {
      name:card.dataset.exercise,
      sets:rows.map(r=>{
        const ins=r.querySelectorAll("input");
        return {reps:+ins[0].value||null,weight:+ins[1].value||null,rir:+ins[2].value||null};
      }).filter(x=>x.reps||x.weight)
    };
  }).filter(e=>e.sets.length);
  data.sessions.push({
    date:new Date().toISOString(),
    name:currentSessionName,
    exercises,
    notes:document.getElementById("sessionNotes").value
  });
  saveData();
  document.getElementById("sessionNotes").value="";
  renderAll();
  switchView("history");
}

function renderProgress(){
  const wh=document.getElementById("weightHistory"); wh.innerHTML="";
  data.weights.slice(-10).reverse().forEach(w=>{
    const el=document.createElement("div");el.className="history-item";el.textContent=`${w.date}: ${w.value.toFixed(1)} kg`;wh.appendChild(el)
  });

  const mf=document.getElementById("measurementFields"); mf.innerHTML="";
  Object.entries(data.baselines.measurements).forEach(([k,v])=>{
    const label=document.createElement("label");
    label.textContent=k;
    label.innerHTML+=`<input type="number" step="0.1" data-measure="${k}" placeholder="${v} cm">`;
    mf.appendChild(label);
  });
  const ms=document.getElementById("measurementSummary"); ms.innerHTML="";
  if(data.measurements.length){
    const m=data.measurements.at(-1);
    const el=document.createElement("div");el.className="history-item";
    el.innerHTML=`<strong>${m.date}</strong><br>${Object.entries(m.values).map(([k,v])=>`${k}: ${v} cm`).join(" · ")}`;
    ms.appendChild(el);
  } else {
    const el=document.createElement("div");el.className="history-item";el.textContent="Baseline loaded. Add your next 4-week check-in here.";ms.appendChild(el);
  }

  const sm=document.getElementById("strengthMarkers"); sm.innerHTML="";
  Object.entries(data.baselines.strength).forEach(([k,v])=>{
    const el=document.createElement("div");el.className="history-item";el.innerHTML=`<strong>${k}</strong><span style="float:right">${v}</span>`;sm.appendChild(el);
  });
}

function renderHistory(){
  const sh=document.getElementById("sessionHistory"); sh.innerHTML="";
  if(!data.sessions.length){ sh.innerHTML='<div class="card muted">No workouts logged yet.</div>'; return; }
  data.sessions.slice().reverse().forEach(s=>{
    const el=document.createElement("div");el.className="session-card";
    const d=new Date(s.date).toLocaleDateString();
    el.innerHTML=`<div class="row between"><strong>${s.name}</strong><span class="small">${d}</span></div>
      <div class="small">${s.exercises.map(e=>`${e.name} (${e.sets.length} sets)`).join(" · ")}</div>
      ${s.notes?`<p class="muted">${s.notes}</p>`:""}`;
    sh.appendChild(el);
  });
}

function renderSettings(){
  const se=document.getElementById("scheduleEditor"); se.innerHTML="";
  data.schedule.forEach((x,i)=>{
    const row=document.createElement("div");row.className="week-day";
    row.innerHTML=`<strong>${x.day}</strong><select data-sched="${i}">
      ${Object.keys(programs).map(p=>`<option ${p===x.session?"selected":""}>${p}</option>`).join("")}
    </select>`;
    se.appendChild(row);
  });
  se.querySelectorAll("select").forEach(sel=>sel.addEventListener("change",e=>{
    data.schedule[+e.target.dataset.sched].session=e.target.value;saveData();renderAll();
  }));
}

function renderAll(){renderDashboard();renderWorkout(currentSessionName||adjustedSession(sessionForToday()));renderProgress();renderHistory();renderSettings();}

function switchView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  if(id==="workout") renderWorkout(currentSessionName||adjustedSession(sessionForToday()));
}

document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
document.getElementById("startTodayBtn").addEventListener("click",()=>switchView("workout"));
document.getElementById("finishWorkoutBtn").addEventListener("click",finishWorkout);

["energy","soreness","pain","sleep"].forEach(k=>{
  const el=document.getElementById(k+"Range"), out=document.getElementById(k+"Val");
  el.value=data.readiness[k]; out.textContent=el.value;
  el.addEventListener("input",()=>out.textContent=el.value);
});
document.getElementById("sportToggle").checked=data.readiness.sport;
document.getElementById("travelToggle").checked=data.readiness.travel;
document.getElementById("applyReadiness").addEventListener("click",()=>{
  ["energy","soreness","pain","sleep"].forEach(k=>data.readiness[k]=+document.getElementById(k+"Range").value);
  data.readiness.sport=document.getElementById("sportToggle").checked;
  data.readiness.travel=document.getElementById("travelToggle").checked;
  saveData(); currentSessionName=null; renderAll();
});

document.getElementById("saveWeightBtn").addEventListener("click",()=>{
  const v=+document.getElementById("weightInput").value;if(!v)return;
  data.weights.push({date:new Date().toISOString().slice(0,10),value:v});
  data.profile.latestWeight=v;saveData();document.getElementById("weightInput").value="";renderAll();
});

document.getElementById("saveMeasurementsBtn").addEventListener("click",()=>{
  const vals={};document.querySelectorAll("[data-measure]").forEach(i=>{if(i.value)vals[i.dataset.measure]=+i.value});
  if(!Object.keys(vals).length)return;
  data.measurements.push({date:new Date().toISOString().slice(0,10),values:vals});saveData();renderProgress();
});

document.getElementById("themeBtn").addEventListener("click",()=>{
  data.theme=data.theme==="dark"?"light":"dark";saveData();
  document.documentElement.classList.toggle("light",data.theme==="light");
});
document.documentElement.classList.toggle("light",data.theme==="light");

document.getElementById("exportBtn").addEventListener("click",()=>{
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="gym-assistant-backup.json";a.click();
});
document.getElementById("importInput").addEventListener("change",async e=>{
  const file=e.target.files[0];if(!file)return;
  try{data=JSON.parse(await file.text());saveData();renderAll();alert("Backup imported.");}catch{alert("Invalid backup file.");}
});
document.getElementById("resetBtn").addEventListener("click",()=>{
  if(confirm("Reset all local data?")){localStorage.removeItem(STORE_KEY);data=structuredClone(defaultData);renderAll();}
});

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
renderAll();
