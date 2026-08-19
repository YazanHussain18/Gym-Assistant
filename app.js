
const STORE_KEY = "gymAssistantData_v2";

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
  activities: [],
  readiness: {energy:7,soreness:2,pain:0,sleep:7,sport:false,travel:false,sorenessLocations:[],painLocations:[],painNote:""},
  theme:"dark",
  auth: {profileName:"", pinHash:"", remembered:false},
  coach: {
    autoAdjust:true,
    deloadSensitivity:"medium",
    progressionStyle:"double"
  }
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
      {name:"Bench Press",sets:4,reps:[6,8],target:52.5,unit:"kg",note:"Progress after all 4 sets reach 8 clean reps.",muscles:["Chest","Front Delts","Triceps"],joint:"shoulder"},
      {name:"Incline DB Press",sets:3,reps:[8,12],target:16,unit:"kg",note:"Use 18 kg only when shoulder is fully comfortable.",muscles:["Upper Chest","Front Delts","Triceps"],joint:"shoulder"},
      {name:"Machine Chest Press",sets:3,reps:[8,12],target:32,unit:"kg",note:"Preferred stable chest volume.",muscles:["Chest","Triceps"],joint:"shoulder"},
      {name:"Cable Lateral Raise",sets:3,reps:[12,15],target:2.3,unit:"kg",note:"Strict, controlled; prioritize stability.",muscles:["Side Delts"],joint:"shoulder"},
      {name:"Rope Triceps Pushdown",sets:3,reps:[10,15],target:11.3,unit:"kg",note:"No shoulder compensation.",muscles:["Triceps"],joint:null},
      {name:"Single-Arm Cable Pushdown",sets:2,reps:[12,15],target:4,unit:"kg",note:"Right first, left matches.",muscles:["Triceps"],joint:null}
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
      {name:"Wide-Grip Lat Pulldown",sets:3,reps:[8,12],target:39,unit:"kg",note:"Increase after 12×3 clean.",muscles:["Lats","Biceps"],joint:"shoulder"},
      {name:"Seated Cable Row — Neutral",sets:3,reps:[8,12],target:32,unit:"kg",note:"Stable horizontal pull.",muscles:["Lats","Rhomboids","Mid Traps","Biceps"],joint:"shoulder"},
      {name:"Chest-Supported Row",sets:3,reps:[8,12],target:32,unit:"kg",note:"Stay below shoulder-irritating load.",muscles:["Rhomboids","Mid Traps","Rear Delts","Biceps"],joint:"shoulder"},
      {name:"Face Pull",sets:3,reps:[12,15],target:13.5,unit:"kg",note:"Permanent shoulder-health movement.",muscles:["Rear Delts","Rotator Cuff","Mid Traps"],joint:"shoulder"},
      {name:"Rear Delt Fly",sets:3,reps:[10,15],target:18,unit:"kg",note:"Control over load.",muscles:["Rear Delts"],joint:"shoulder"},
      {name:"Back Extension",sets:3,reps:[12,15],target:0,unit:"BW",note:"Posterior chain / spinal erectors.",muscles:["Spinal Erectors","Glutes","Hamstrings"],joint:"lowback"},
      {name:"BTB Cable Curl",sets:3,reps:[10,12],target:7.9,unit:"kg",note:"Long-head emphasis.",muscles:["Biceps Long Head"],joint:null},
      {name:"Preacher Curl",sets:3,reps:[10,15],target:18,unit:"kg",note:"Own 15×3 before increasing.",muscles:["Biceps Short Head","Brachialis"],joint:null},
      {name:"Hammer Curl",sets:3,reps:[8,12],target:10,unit:"kg",note:"Brachialis + brachioradialis.",muscles:["Brachialis","Brachioradialis"],joint:null}
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
      {name:"Leg Press",sets:4,reps:[8,12],target:45,unit:"kg",note:"Increase only when knee is comfortable.",muscles:["Quads","Glutes"],joint:"knee"},
      {name:"Prone Leg Curl",sets:3,reps:[10,15],target:27,unit:"kg",note:"Controlled eccentric.",muscles:["Hamstrings"],joint:"knee"},
      {name:"Bulgarian Split Squat",sets:2,reps:[8,12],target:0,unit:"BW",note:"Load only when knee feels fully stable.",muscles:["Quads","Glutes","Adductors"],joint:"knee"},
      {name:"Leg Extension",sets:3,reps:[10,15],target:25,unit:"kg",note:"Controlled; stop if knee pain increases.",muscles:["Quads"],joint:"knee"},
      {name:"Single-Leg Calf Raise — Left",sets:3,reps:[12,20],target:0,unit:"BW",note:"Full ROM.",muscles:["Left Calf"],joint:"ankle"},
      {name:"Single-Leg Calf Raise — Right",sets:4,reps:[12,20],target:0,unit:"BW",note:"One extra set to address calf gap.",muscles:["Right Calf"],joint:"ankle"},
      {name:"Machine Crunch",sets:3,reps:[12,15],target:36,unit:"kg",note:"Progress reps first.",muscles:["Abs"],joint:null},
      {name:"Hanging Leg Raise",sets:3,reps:[10,15],target:0,unit:"BW",note:"Slow lowering.",muscles:["Abs","Hip Flexors"],joint:null}
    ]
  },
  "Cardio / Sport":{
    note:"Football/padel replaces cardio. If fatigued, choose walking + mobility.",
    warmup:["5 min easy movement","Joint-specific mobility"],
    exercises:[
      {name:"Zone 2 Cardio",sets:1,reps:[30,45],target:0,unit:"min",note:"Skip if doing football/padel.",muscles:["Cardio"],joint:"ankle"},
      {name:"Mobility",sets:1,reps:[10,10],target:0,unit:"min",note:"Hips, calves, thoracic spine, shoulders.",muscles:["Mobility"],joint:null}
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
      {name:"Machine Chest Press",sets:3,reps:[10,12],target:32,unit:"kg",note:"Stable pressing.",muscles:["Chest","Triceps"],joint:"shoulder"},
      {name:"Lat Pulldown",sets:3,reps:[10,12],target:39,unit:"kg",note:"Controlled.",muscles:["Lats","Biceps"],joint:"shoulder"},
      {name:"Seated Cable Row",sets:3,reps:[10,12],target:32,unit:"kg",note:"Neutral grip.",muscles:["Lats","Rhomboids","Mid Traps","Biceps"],joint:"shoulder"},
      {name:"Cable Lateral Raise",sets:2,reps:[12,15],target:2.3,unit:"kg",note:"Strict and pain-free.",muscles:["Side Delts"],joint:"shoulder"},
      {name:"Face Pull",sets:2,reps:[15,15],target:13.5,unit:"kg",note:"Shoulder support.",muscles:["Rear Delts","Rotator Cuff"],joint:"shoulder"},
      {name:"Preacher Curl",sets:3,reps:[10,15],target:18,unit:"kg",note:"Arm priority.",muscles:["Biceps Short Head","Brachialis"],joint:null},
      {name:"Hammer Curl",sets:2,reps:[10,12],target:10,unit:"kg",note:"Arm thickness.",muscles:["Brachialis","Brachioradialis"],joint:null},
      {name:"Rope Pushdown",sets:3,reps:[10,15],target:11.3,unit:"kg",note:"Primary triceps work.",muscles:["Triceps"],joint:null},
      {name:"Single-Arm Pushdown",sets:2,reps:[12,15],target:4,unit:"kg",note:"Right first, left matches.",muscles:["Triceps"],joint:null}
    ]
  },
  "Rest / Lifestyle":{note:"Recovery day. Walking and normal lifestyle activity are enough.",warmup:[],exercises:[]},
  "Rest / Sport":{note:"Rest unless you choose sport. Intense football counts as a hard conditioning session.",warmup:[],exercises:[]}
};


const bodyLocations = [
  "Left Shoulder","Right Shoulder","Chest","Upper Back","Lower Back",
  "Left Biceps","Right Biceps","Left Triceps","Right Triceps",
  "Left Elbow","Right Elbow","Left Wrist","Right Wrist",
  "Left Hip","Right Hip","Left Quad","Right Quad","Left Hamstring","Right Hamstring",
  "Left Knee","Right Knee","Left Calf","Right Calf","Left Ankle","Right Ankle"
];

function locationTagsToJoints(locations=[]){
  const joints = new Set();
  locations.forEach(x=>{
    const t=x.toLowerCase();
    if(t.includes("shoulder")) joints.add("shoulder");
    if(t.includes("knee")) joints.add("knee");
    if(t.includes("ankle") || t.includes("calf")) joints.add("ankle");
    if(t.includes("lower back") || t.includes("upper back")) joints.add("lowback");
    if(t.includes("elbow")) joints.add("elbow");
    if(t.includes("wrist")) joints.add("wrist");
    if(t.includes("hip") || t.includes("quad") || t.includes("hamstring")) joints.add("lowerbody");
  });
  return [...joints];
}

function renderBodyLocationSelectors(){
  const make=(id,selected)=>{
    const box=document.getElementById(id);
    if(!box) return;
    box.innerHTML="";
    bodyLocations.forEach(loc=>{
      const lab=document.createElement("label");
      lab.className="body-chip";
      lab.innerHTML=`<input type="checkbox" value="${loc}" ${selected.includes(loc)?"checked":""}> ${loc}`;
      box.appendChild(lab);
    });
  };
  make("sorenessLocations", data.readiness.sorenessLocations||[]);
  make("painLocations", data.readiness.painLocations||[]);
  document.getElementById("painNote").value=data.readiness.painNote||"";
  updateLocationVisibility();
}

function updateLocationVisibility(){
  const s=+document.getElementById("sorenessRange").value;
  const p=+document.getElementById("painRange").value;
  document.getElementById("sorenessLocationBox").classList.toggle("hidden", s===0);
  document.getElementById("painLocationBox").classList.toggle("hidden", p===0);
}

function selectedBodyLocations(id){
  return [...document.querySelectorAll(`#${id} input[type=checkbox]:checked`)].map(x=>x.value);
}

let data = loadData();
let currentSessionName = null;
let currentPlan = null;

function loadData(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw){
      const old = localStorage.getItem("gymAssistantData_v1");
      if(old){
        const migrated = Object.assign(structuredClone(defaultData), JSON.parse(old));
        migrated.activities = migrated.activities || [];
        migrated.coach = structuredClone(defaultData.coach);
        return migrated;
      }
      return structuredClone(defaultData);
    }
    return Object.assign(structuredClone(defaultData), JSON.parse(raw));
  }catch(e){ return structuredClone(defaultData); }
}
function saveData(){ localStorage.setItem(STORE_KEY, JSON.stringify(data)); }


function simpleHash(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h,16777619);
  }
  return (h>>>0).toString(16);
}

function hasSavedProfile(){
  return !!(data.auth && data.auth.profileName);
}

function showLogin(){
  const screen=document.getElementById("loginScreen");
  if(!screen) return;

  if(hasSavedProfile()){
    document.getElementById("existingProfileBox").classList.remove("hidden");
    document.getElementById("newProfileFields").classList.add("hidden");
    document.getElementById("existingProfileName").textContent=data.auth.profileName;
    document.getElementById("profileAvatar").textContent=(data.auth.profileName[0]||"U").toUpperCase();

    if(data.auth.pinHash){
      document.getElementById("existingPinField").classList.remove("hidden");
    } else {
      document.getElementById("existingPinField").classList.add("hidden");
    }
    document.getElementById("useDifferentProfileBtn").classList.remove("hidden");
  } else {
    document.getElementById("existingProfileBox").classList.add("hidden");
    document.getElementById("newProfileFields").classList.remove("hidden");
    document.getElementById("existingPinField").classList.add("hidden");
    document.getElementById("useDifferentProfileBtn").classList.add("hidden");
  }

  // If remembered and no PIN is required, bypass the screen
  if(hasSavedProfile() && data.auth.remembered && !data.auth.pinHash){
    screen.classList.add("hidden");
  } else {
    screen.classList.remove("hidden");
  }
}

function completeLogin(){
  if(hasSavedProfile()){
    if(data.auth.pinHash){
      const pin=document.getElementById("existingPinInput").value.trim();
      if(simpleHash(pin)!==data.auth.pinHash){
        alert("Incorrect PIN.");
        return;
      }
    }
    data.auth.remembered=true;
    saveData();
    document.getElementById("loginScreen").classList.add("hidden");
    renderAll();
    return;
  }

  const name=document.getElementById("loginName").value.trim();
  const pin=document.getElementById("loginPin").value.trim();
  if(!name){
    alert("Enter your name to create your profile.");
    return;
  }
  if(pin && !/^\d{4,6}$/.test(pin)){
    alert("PIN must be 4–6 digits.");
    return;
  }

  data.auth.profileName=name;
  data.auth.pinHash=pin ? simpleHash(pin) : "";
  data.auth.remembered=true;
  saveData();
  document.getElementById("loginScreen").classList.add("hidden");
  renderAll();
}

function useDifferentProfile(){
  if(!confirm("Create a new profile on this device? Your current saved training data will be reset.")) return;
  localStorage.removeItem(STORE_KEY);
  data=structuredClone(defaultData);
  document.getElementById("existingPinInput").value="";
  document.getElementById("loginName").value="";
  document.getElementById("loginPin").value="";
  showLogin();
  renderAll();
}

function logout(){
  data.auth.remembered=false;
  saveData();
  document.getElementById("existingPinInput").value="";
  showLogin();
}


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

function recentSessions(days=21){
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate()-days);
  return data.sessions.filter(s=>new Date(s.date)>=cutoff);
}
function recentActivities(days=3){
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate()-days);
  return (data.activities||[]).filter(a=>new Date(a.date)>=cutoff);
}
function getLastExerciseLogs(name, limit=3){
  const out=[];
  for(let i=data.sessions.length-1;i>=0 && out.length<limit;i--){
    const ex=(data.sessions[i].exercises||[]).find(e=>e.name===name);
    if(ex) out.push({session:data.sessions[i], exercise:ex});
  }
  return out;
}
function avg(vals){ return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null; }

function inferTrend(exDef){
  const logs=getLastExerciseLogs(exDef.name,3);
  if(!logs.length) return {state:"new",delta:0,reason:"No previous logged sets yet."};

  const scores=logs.map(l=>{
    const valid=l.exercise.sets.filter(s=>s.reps);
    const meanReps=avg(valid.map(s=>s.reps))||0;
    const meanRir=avg(valid.map(s=>s.rir).filter(x=>x!==null && x!==undefined));
    const meanWeight=avg(valid.map(s=>s.weight).filter(Boolean)) || exDef.target || 0;
    return {meanReps,meanRir,meanWeight,sets:valid};
  });

  const last=scores[0], min=exDef.reps[0], max=exDef.reps[1];

  if(last.meanRir!==null && last.meanRir<=0.5 && last.meanReps<min+1){
    return {state:"fatigued",delta:-1,reason:"Last session was near failure at the bottom of the rep range."};
  }

  const allTop = last.sets.length>=Math.min(2,exDef.sets) && last.sets.every(s=>s.reps>=max);
  if(allTop){
    return {state:"progress",delta:1,reason:`You reached the top of the ${min}–${max} rep range on every logged set.`};
  }

  if(scores.length>=2){
    const prev=scores[1];
    if(last.meanWeight>prev.meanWeight && last.meanReps>=min){
      return {state:"progress",delta:0,reason:"Load increased successfully last time; consolidate before another jump."};
    }
    if(last.meanWeight===prev.meanWeight && last.meanReps>prev.meanReps+0.5){
      return {state:"progress",delta:0,reason:"Reps are trending upward at the same load."};
    }
    if(last.meanReps<prev.meanReps-1.5 && (last.meanRir===null || last.meanRir<=1)){
      return {state:"down",delta:-1,reason:"Performance dropped meaningfully versus the previous exposure."};
    }
  }
  return {state:"hold",delta:0,reason:"Performance is stable; continue building reps with clean form."};
}

function weightStep(target){
  if(target===0) return 0;
  if(target<=5) return target<3 ? 0.5 : 1;
  if(target<=15) return 1.5;
  if(target<=30) return 2;
  return 2.5;
}

function jointModifier(ex){
  const painLevel=data.readiness.pain||0;
  const soreLevel=data.readiness.soreness||0;
  const painLocs=data.readiness.painLocations||[];
  const soreLocs=data.readiness.sorenessLocations||[];
  const painJoints=locationTagsToJoints(painLocs);
  const soreJoints=locationTagsToJoints(soreLocs);

  let risk = false;
  let reason = [];

  if(ex.joint && painJoints.includes(ex.joint)){ risk=true; reason.push(`pain reported in ${painLocs.join(", ")}`); }
  if(ex.joint==="knee" && painJoints.includes("lowerbody")){ risk=true; reason.push("lower-body pain reported"); }
  if(ex.joint==="ankle" && painJoints.includes("lowerbody")){ risk=true; reason.push("lower-body pain reported"); }

  let sets=0, targetDelta=0;

  if(risk && painLevel>=5){
    return {sets:-99,targetDelta:-99,skip:true,note:`Skipped by coach: ${reason.join("; ")}.`};
  }
  if(risk && painLevel>=3){
    sets=-1; targetDelta=-1;
  }

  if(ex.joint && soreJoints.includes(ex.joint) && soreLevel>=5){
    sets=Math.min(sets,-1);
    reason.push(`soreness reported in ${soreLocs.join(", ")}`);
  }

  return {
    sets,
    targetDelta,
    skip:false,
    note: reason.length ? `Adjusted because ${reason.join("; ")}.` : ""
  };
}

function workloadModifier(sessionName){
  const acts=recentActivities(2);
  const intense=acts.some(a=>a.intensity==="high" || (a.strain && a.strain>=17));
  if(intense && sessionName==="Legs + Core"){
    return {shift:"Upper + Arms",reason:"High-intensity sport was logged in the last 48 hours, so Legs is shifted to protect recovery."};
  }
  if(data.readiness.sport && sessionName==="Legs + Core"){
    return {shift:"Upper + Arms",reason:"Intense sport in the last 24h: Legs shifted to Upper + Arms."};
  }
  return {shift:null,reason:null};
}

function buildCoachPlan(baseSession){
  const lvl=readinessLevel();
  const wl=workloadModifier(baseSession);
  let sessionName=wl.shift || baseSession;

  if(lvl==="red" && (sessionName==="Legs + Core" || sessionName==="Cardio / Sport")){
    sessionName="Rest / Lifestyle";
  }

  const base=programs[sessionName] || programs["Rest / Lifestyle"];
  const reasons=[];
  if(wl.reason) reasons.push(wl.reason);
  if(lvl==="yellow") reasons.push("Readiness is Yellow: optional volume reduced ~20–30%.");
  if(lvl==="red") reasons.push("Readiness is Red: recovery takes priority and painful regions should not be loaded.");

  const exercises=(base.exercises||[]).map(ex=>{
    const trend=inferTrend(ex);
    const jm=jointModifier(ex);
    let sets=ex.sets;
    let target=ex.target;
    let note=ex.note;

    if(jm.skip){ return {...ex,skip:true,sets:0,target:ex.target,coachTrend:trend,note:(ex.note+" "+jm.note).trim()}; }

    if(lvl==="yellow" && sets>=3) sets-=1;
    if(lvl==="red" && sets>=3) sets=Math.max(1,sets-1);
    sets=Math.max(1,sets+jm.sets);

    const step=weightStep(target);
    if(trend.delta>0 && target>0) target = +(target+step).toFixed(1);
    if(trend.delta<0 && target>0) target = Math.max(step, +(target-step).toFixed(1));
    if(jm.targetDelta<0 && target>0) target = Math.max(step, +(target-step).toFixed(1));

    if(jm.note) note += " " + jm.note;

    return {...ex,sets,target,coachTrend:trend};
  });

  return {sessionName,level:lvl,reasons,base,exercises};
}

function adjustmentText(plan){
  if(plan.reasons.length) return plan.reasons.join(" ");
  return "Coach sees a Green day: full planned session with trend-based progression.";
}

function renderDashboard(){
  const base=sessionForToday();
  const plan=buildCoachPlan(base);
  currentSessionName=plan.sessionName;
  currentPlan=plan;

  document.getElementById("todayTitle").textContent=plan.sessionName;
  document.getElementById("todayReason").textContent=adjustmentText(plan);

  const ws=data.weights.at(-1);
  document.getElementById("latestWeight").textContent=ws?`${ws.value.toFixed(1)} kg`:"—";
  if(data.weights.length>=2){
    const last=data.weights.slice(-7);
    const av=last.reduce((a,b)=>a+b.value,0)/last.length;
    document.getElementById("weightTrend").textContent=`Recent avg ${av.toFixed(1)} kg`;
  }
  const startOfWeek=new Date(); startOfWeek.setDate(startOfWeek.getDate()-6);
  const done=data.sessions.filter(s=>new Date(s.date)>=startOfWeek).length;
  document.getElementById("sessionsDone").textContent=`${done} / 5`;

  const badge=document.getElementById("readinessBadge");
  badge.textContent=plan.level[0].toUpperCase()+plan.level.slice(1);
  badge.style.background=plan.level==="green"?"var(--good)":plan.level==="yellow"?"var(--warn)":"var(--bad)";

  const wp=document.getElementById("weekPlan"); wp.innerHTML="";
  data.schedule.forEach(x=>{
    const el=document.createElement("div");
    el.className="week-day"+(x.day===todayName()?" today":"");
    el.innerHTML=`<strong>${x.day}</strong><span>${x.session}</span>`;
    wp.appendChild(el);
  });

  renderCoachCard(plan);
}

function renderCoachCard(plan){
  let card=document.getElementById("coachCard");
  if(!card){
    card=document.createElement("div");
    card.id="coachCard";
    card.className="card";
    const dash=document.getElementById("dashboard");
    dash.insertBefore(card, dash.children[2]);
  }
  const insights=[];
  plan.exercises.slice(0,4).forEach(ex=>{
    const t=ex.coachTrend;
    let icon=t.state==="progress"?"↗":t.state==="down"||t.state==="fatigued"?"↘":"→";
    insights.push(`<div class="history-item"><strong>${icon} ${ex.name}</strong><br><span class="small">${t.reason}</span><br><span class="target">Coach target: ${ex.sets} sets · ${ex.reps[0]}–${ex.reps[1]} reps · ${ex.unit==="BW"?"BW":ex.target+" "+ex.unit}</span></div>`);
  });

  const muscle=muscleAnalytics();
  const flags=Object.entries(muscle).filter(([m,v])=>v.frequency<2 && !["Cardio","Mobility","Abs","Hip Flexors","Spinal Erectors","Left Calf","Right Calf"].includes(m)).slice(0,5);
  card.innerHTML=`<div class="row between"><h3>Smart Coach</h3><span class="badge" style="background:var(--accent);color:white">${plan.level.toUpperCase()}</span></div>
  <p class="muted">${adjustmentText(plan)}</p>
  <div class="history">${insights.join("")}</div>
  ${flags.length?`<p class="small" style="margin-top:12px"><strong>Coverage watch:</strong> ${flags.map(([m,v])=>`${m} ${v.frequency}×`).join(" · ")}</p>`:""}`;
}

function muscleAnalytics(days=7){
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-days);
  const sessions=data.sessions.filter(s=>new Date(s.date)>=cutoff);
  const map={};
  sessions.forEach(s=>{
    const seen=new Set();
    (s.exercises||[]).forEach(e=>{
      const def=Object.values(programs).flatMap(p=>p.exercises||[]).find(x=>x.name===e.name);
      if(!def) return;
      (def.muscles||[]).forEach(m=>{
        map[m]=map[m]||{sets:0,frequency:0};
        map[m].sets += (e.sets||[]).length;
        seen.add(m);
      });
    });
    seen.forEach(m=>map[m].frequency++);
  });
  return map;
}

function renderWorkout(sessionName){
  currentPlan = buildCoachPlan(sessionName || sessionForToday());
  currentSessionName=currentPlan.sessionName;
  const p=currentPlan;
  document.getElementById("workoutTitle").textContent=p.sessionName;
  document.getElementById("workoutNote").textContent=(p.base.note||"")+" "+adjustmentText(p);

  const wl=document.getElementById("warmupList"); wl.innerHTML="";
  (p.base.warmup||[]).forEach(w=>{const li=document.createElement("li");li.textContent=w;wl.appendChild(li)});

  const list=document.getElementById("exerciseList"); list.innerHTML="";
  p.exercises.forEach((ex,idx)=>{
    if(ex.skip){
      const card=document.createElement("div"); card.className="exercise"; card.dataset.exercise=ex.name;
      card.innerHTML=`<div class="exercise-head"><div><h3>${idx+1}. ${ex.name}</h3>
      <div class="small" style="color:var(--bad)"><strong>Coach skipped this exercise.</strong></div>
      <div class="small">${ex.note||""}</div></div></div>`;
      list.appendChild(card);
      return;
    }
    const targetText=ex.unit==="BW"?"BW":ex.target?`${ex.target} ${ex.unit}`:ex.unit;
    const card=document.createElement("div"); card.className="exercise"; card.dataset.exercise=ex.name;
    const state=ex.coachTrend.state;
    const coachColor=state==="progress"?"var(--good)":(state==="down"||state==="fatigued")?"var(--warn)":"var(--accent)";
    card.innerHTML=`<div class="exercise-head"><div><h3>${idx+1}. ${ex.name}</h3>
      <div class="target">${ex.sets} sets · ${ex.reps[0]}–${ex.reps[1]} · target ${targetText}</div>
      <div class="small">${ex.note||""}</div>
      <div class="small" style="color:${coachColor};margin-top:5px"><strong>Coach:</strong> ${ex.coachTrend.reason}</div>
      </div></div>
    <div class="small" style="margin-top:10px">Set &nbsp;&nbsp;&nbsp; Reps &nbsp;&nbsp;&nbsp; Weight &nbsp;&nbsp;&nbsp; RIR</div>`;
    for(let i=1;i<=ex.sets;i++){
      const row=document.createElement("div");row.className="set-row";
      row.innerHTML=`<span class="set-label">${i}</span>
      <input type="number" inputmode="numeric" placeholder="reps" data-k="reps">
      <input type="number" inputmode="decimal" placeholder="${ex.unit==="BW"?"BW":"kg"}" step="0.1" data-k="weight">
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
        return {reps:+ins[0].value||null,weight:+ins[1].value||null,rir:ins[2].value===""?null:+ins[2].value};
      }).filter(x=>x.reps||x.weight)
    };
  }).filter(e=>e.sets.length);
  data.sessions.push({
    date:new Date().toISOString(),
    name:currentSessionName,
    exercises,
    notes:document.getElementById("sessionNotes").value,
    coachLevel:currentPlan?.level || readinessLevel()
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

  renderMuscleAnalytics();
}
function renderMuscleAnalytics(){
  let box=document.getElementById("muscleAnalytics");
  if(!box){
    box=document.createElement("div");
    box.id="muscleAnalytics";
    box.className="card";
    document.getElementById("progress").appendChild(box);
  }
  const m=muscleAnalytics();
  const rows=Object.entries(m).sort((a,b)=>b[1].sets-a[1].sets)
    .map(([name,v])=>`<div class="history-item"><strong>${name}</strong><span style="float:right">${v.sets} sets · ${v.frequency}×</span></div>`).join("");
  box.innerHTML=`<h3>7-day muscle analytics</h3><p class="muted">Direct + mapped working sets from your logged exercises.</p>${rows||'<div class="history-item">Log workouts to populate muscle coverage.</div>'}`;
}

function renderHistory(){
  const sh=document.getElementById("sessionHistory"); sh.innerHTML="";
  if(!data.sessions.length){ sh.innerHTML='<div class="card muted">No workouts logged yet.</div>'; return; }
  data.sessions.slice().reverse().forEach(s=>{
    const el=document.createElement("div");el.className="session-card";
    const d=new Date(s.date).toLocaleDateString();
    el.innerHTML=`<div class="row between"><strong>${s.name}</strong><span class="small">${d}</span></div>
      <div class="small">${s.exercises.map(e=>`${e.name} (${e.sets.length} sets)`).join(" · ")}</div>
      ${s.coachLevel?`<div class="small">Coach day: ${s.coachLevel}</div>`:""}
      ${s.notes?`<p class="muted">${s.notes}</p>`:""}`;
    sh.appendChild(el);
  });
}

function renderSettings(){
  const profileEl=document.getElementById("settingsProfileName"); if(profileEl) profileEl.textContent=(data.auth&&data.auth.profileName)||"Guest";
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

  let act=document.getElementById("activityLogger");
  if(!act){
    act=document.createElement("div");act.id="activityLogger";act.className="card";
    act.innerHTML=`<h3>Log sport / activity</h3>
    <div class="measurement-grid">
      <label>Type<input id="activityType" placeholder="Football / Padel / Hiking"></label>
      <label>Duration (min)<input id="activityDuration" type="number" placeholder="90"></label>
      <label>Intensity<select id="activityIntensity"><option>low</option><option selected>moderate</option><option>high</option></select></label>
      <label>Strain (optional)<input id="activityStrain" type="number" step="0.1" placeholder="18.9"></label>
    </div>
    <button id="saveActivityBtn" class="secondary">Save activity</button>`;
    document.getElementById("settings").insertBefore(act, document.getElementById("settings").children[2]);
    document.getElementById("saveActivityBtn").addEventListener("click",()=>{
      const type=document.getElementById("activityType").value.trim();
      if(!type) return;
      data.activities.push({
        date:new Date().toISOString(),
        type,
        duration:+document.getElementById("activityDuration").value||null,
        intensity:document.getElementById("activityIntensity").value,
        strain:+document.getElementById("activityStrain").value||null
      });
      saveData();
      document.getElementById("activityType").value="";
      document.getElementById("activityDuration").value="";
      document.getElementById("activityStrain").value="";
      renderAll();
      alert("Activity logged. Coach recommendations updated.");
    });
  }
}

function renderAll(){renderDashboard();renderWorkout(sessionForToday());renderProgress();renderHistory();renderSettings();renderBodyLocationSelectors();}

function switchView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  if(id==="workout") renderWorkout(sessionForToday());
}

document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
document.getElementById("startTodayBtn").addEventListener("click",()=>switchView("workout"));
document.getElementById("finishWorkoutBtn").addEventListener("click",finishWorkout);

["energy","soreness","pain","sleep"].forEach(k=>{
  const el=document.getElementById(k+"Range"), out=document.getElementById(k+"Val");
  el.value=data.readiness[k]; out.textContent=el.value;
  el.addEventListener("input",()=>{out.textContent=el.value; if(k==="soreness"||k==="pain") updateLocationVisibility();});
});
document.getElementById("sportToggle").checked=data.readiness.sport;
document.getElementById("travelToggle").checked=data.readiness.travel;
document.getElementById("applyReadiness").addEventListener("click",()=>{
  ["energy","soreness","pain","sleep"].forEach(k=>data.readiness[k]=+document.getElementById(k+"Range").value);
  data.readiness.sport=document.getElementById("sportToggle").checked;
  data.readiness.travel=document.getElementById("travelToggle").checked;
  data.readiness.sorenessLocations = data.readiness.soreness>0 ? selectedBodyLocations("sorenessLocations") : [];
  data.readiness.painLocations = data.readiness.pain>0 ? selectedBodyLocations("painLocations") : [];
  data.readiness.painNote = document.getElementById("painNote").value.trim();

  if(data.readiness.soreness>0 && !data.readiness.sorenessLocations.length){
    alert("Select where you are sore so the coach can adjust accurately.");
    return;
  }
  if(data.readiness.pain>0 && !data.readiness.painLocations.length){
    alert("Select where you feel pain so the coach can adjust accurately.");
    return;
  }

  saveData(); currentSessionName=null; currentPlan=null; renderAll();
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
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="gym-assistant-backup-v2.json";a.click();
});
document.getElementById("importInput").addEventListener("change",async e=>{
  const file=e.target.files[0];if(!file)return;
  try{data=JSON.parse(await file.text());saveData();renderAll();alert("Backup imported.");}catch{alert("Invalid backup file.");}
});
document.getElementById("resetBtn").addEventListener("click",()=>{
  if(confirm("Reset all local data?")){localStorage.removeItem(STORE_KEY);data=structuredClone(defaultData);renderAll();}
});


document.getElementById("loginBtn")?.addEventListener("click",completeLogin);
document.getElementById("useDifferentProfileBtn")?.addEventListener("click",useDifferentProfile);
document.getElementById("logoutBtn")?.addEventListener("click",logout);

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
renderAll();
renderBodyLocationSelectors();
showLogin();
