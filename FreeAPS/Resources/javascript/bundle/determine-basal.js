var freeaps_determineBasal;(()=>{var e={5546:(e,t,a)=>{var r=a(6880);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,m,u,d,c,g,h,p,f,b){var v=i.min_bg,B=0,M="",_="",y="",x="",D="",w=0,S=(f=0,0),T=0,C=0,U=0;const G=b.weightedAverage,R=i.weightPercentage,O=b.average_total_data;function A(e,t){var a=e.getTime();return new Date(a+36e5*t)}function I(e){var t=i.bolus_increment;.05!=t&&(t=.1);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function j(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function F(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}function P(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=j(r),m=p[0].rate;for(let e=0;e<p.length;e++){var u=p[e].start;if(l==u){if(e+1<p.length){o>=(s=F(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;o>=(s=24-F(p[e].start,t))?n=s:o<s&&(n=o)}a+=I((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+I(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=A(r,n)}else if(l>u)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=F(d,l))?n=s:o<s&&(n=o),a+=I((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+I(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=A(r,n))}else if(e==p.length-1){o>=(s=F("23:59:59",l))?n=s:o<s&&(n=o),a+=I((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+I(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=A(r,n)}}}}while(o>0&&o<i);return a}if(g.length){let e=g.length-1;var q=new Date(g[e].timestamp),W=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(W=new Date),(B=(W-q)/36e5)<23.9&&B>21)C=P(q,(k=24-B,E=q.getTime(),new Date(E-36e5*k))),x="24 hours of data is required for an accurate tdd calculation. Currently only "+B.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+C.toPrecision(5)+" U. ";else B<21?(V=!1,enableDynamicCR=!1):x=""}else console.log("Pumphistory is empty!"),V=!1,enableDynamicCR=!1;var k,E;for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(T+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){w=e,U=g[e].rate;var L=g[e-1]["duration (min)"]/60,z=L,N=new Date(g[e-1].timestamp),Z=N;do{if(e--,0==e){Z=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){Z=new Date(g[e].timestamp);break}}while(e>0);var H=(Z-N)/36e5;H<z&&(L=H),S+=I(U*L),e=w}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(C+=P(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var $=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){$=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&($=new Date,t=g[e]["duration (min)"]/60),($-a)/36e5-t>0){C+=P($,A(a,t))}}var J,K={TDD:o(f=T+S+C,5),bolus:o(T,5),temp_basal:o(S,5),scheduled_basal:o(C,5)};B>21?(_=". Bolus insulin: "+T.toPrecision(5)+" U",y=". Temporary basal insulin: "+S.toPrecision(5)+" U",M=". Insulin with scheduled basal rate: "+C.toPrecision(5)+" U",D=x+(" TDD past 24h is: "+f.toPrecision(5)+" U")+_+y+M,tddReason=", Total insulin: "+o(f,2)+" U, "+o(T/f*100,0)+"% Bolus. "+o((S+C)/f*100,0)+"% Basal"):tddReason=", TDD: Not enough pumpData (< 21h)";const Q=e.glucose;var V=h.useNewFormula;const X=h.enableDynamicCR,Y=Math.min(i.autosens_min,i.autosens_max),ee=Math.max(i.autosens_min,i.autosens_max),te=h.adjustmentFactor,ae=i.min_bg;var re=!1,oe="",ne=1,ie="";O>0&&(ne=G/O),ie=ne>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(ne=o(ne=Math.min(ne,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":ne<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(ne=o(ne=Math.max(ne,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+ne,ie=", Basal ratio: "+ne,(i.high_temptarget_raises_sensitivity||i.exercise_mode)&&(re=!0),ae>=118&&re&&(V=!1,oe="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+ae);var se=", Dynamic ratios log: ",le=", AF: "+te,me="BG: "+Q+" mg/dl ("+(.0555*Q).toPrecision(2)+" mmol/l)",ue="",de="";const ce=h.curve,ge=h.insulinPeakTime,he=h.useCustomPeakTime;var pe=55,fe=65;switch(ce){case"rapid-acting":fe=65;break;case"ultra-rapid":fe=50}he?(pe=120-ge,console.log("Custom insulinpeakTime set to :"+ge+", insulinFactor: "+pe)):(pe=120-fe,console.log("insulinFactor set to : "+pe)),J=f,R<1&&G>0&&(f=G,console.log("Using weighted TDD average: "+o(f,2)+" U, instead of past 24 h ("+o(J,2)+" U), weight: "+R),de=", Weighted TDD: "+o(f,2)+" U");const be=h.sigmoid;var ve="";if(V){var Be=i.sens*te*f*Math.log(Q/pe+1)/1800;ue=", Logarithmic formula"}var Me="";if(V&&be){const e=Y,t=ee-e,a=.0555*(Q-i.min_bg);var _e=ne;Me=", tdd_factor: "+o(_e,1);const r=ee-1,n=Math.log10(1/r-e/r)/Math.log10(Math.E),s=a*te*_e+n;Be=t/(1+Math.exp(-s))+e,ue=", Sigmoid function"}var ye=i.carb_ratio;const xe=o(i.carb_ratio,1);var De="",we="";if(V&&f>0){if(De=", Dynamic ISF/CR: On/",Be>ee?(oe=", Dynamic ISF limited by autosens_max setting: "+ee+" ("+o(Be,2)+"), ",we=", Autosens/Dynamic Limit: "+ee+" ("+o(Be,2)+")",Be=ee):Be<Y&&(oe=", Dynamic ISF limjted by autosens_min setting: "+Y+" ("+o(Be,2)+"). ",we=", Autosens/Dynamic Limit: "+Y+" ("+o(Be,2)+")",Be=Y),X){De+="On";var Se=Be;Be>1&&(Se=(Be-1)/2+1);var Te=" CR: "+(ye=o(ye/Se,2))+" g/U";i.carb_ratio=ye}else Te=" CR: "+ye+" g/U",De+="Off";const e=i.sens/Be;ve=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(ye,2)+" to "+o(i.carb_ratio,2)+" ("+o(.0555*i.carb_ratio,2)+" mmol/l).",oe+=be?ve:", Dynamic autosens.ratio set to "+o(Be,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)",s.ratio=Be,D+=se+me+le+ue+oe+De+Te+de}else D+=se+"Dynamic Settings disabled";console.log(D),V||X?V&&i.tddAdjBasal?tddReason+=De+ue+we+le+ie:V&&!i.tddAdjBasal&&(tddReason+=De+ue+we+le):tddReason+="";var Ce={},Ue=new Date;if(c&&(Ue=c),void 0===i||void 0===i.current_basal)return Ce.error="Error: could not get current basal rate",Ce;var Ge=r(i.current_basal,i),Re=Ge,Oe=new Date;c&&(Oe=c);var Ae,Ie=new Date(e.date),je=o((Oe-Ie)/60/1e3,1),Fe=e.glucose,Pe=e.noise;Ae=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var qe=Math.min(e.delta,e.short_avgdelta),We=Math.min(e.short_avgdelta,e.long_avgdelta),ke=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Fe<=10||38===Fe||Pe>=3)&&(Ce.reason="CGM is calibrating, in ??? state, or noise is high");if(Fe>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(Fe,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),je>12||je<-5?Ce.reason="If current system time "+Oe+" is correct, then BG data is too old. The last BG data was read "+je+"m ago at "+Ie:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Ce.reason="CGM was just calibrated":Ce.reason="CGM data is unchanged ("+n(Fe,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),Fe<=10||38===Fe||Pe>=3||je>12||je<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return t.rate>=Re?(Ce.reason+=". Canceling high temp basal of "+t.rate,Ce.deliverAt=Ue,Ce.temp="absolute",Ce.duration=0,Ce.rate=0,Ce):0===t.rate&&t.duration>30?(Ce.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",Ce.deliverAt=Ue,Ce.temp="absolute",Ce.duration=30,Ce.rate=0,Ce):(Ce.reason+=". Temp "+t.rate+" <= current basal "+Re+"U/hr; doing nothing. ",Ce);var Ee,Le,ze,Ne,Ze=i.max_iob;if(void 0!==i.min_bg&&(Le=i.min_bg),void 0!==i.max_bg&&(ze=i.max_bg),void 0!==i.enableSMB_high_bg_target&&(Ne=i.enableSMB_high_bg_target),void 0===i.min_bg||void 0===i.max_bg)return Ce.error="Error: could not determine target_bg. ",Ce;Ee=(i.min_bg+i.max_bg)/2;var He=i.exercise_mode||i.high_temptarget_raises_sensitivity,$e=100,Je=160;if(i.half_basal_exercise_target&&(Je=i.half_basal_exercise_target),He&&i.temptargetSet&&Ee>$e||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&Ee<$e){var Ke=Je-$e;sensitivityRatio=Ke*(Ke+Ee-$e)<=0?i.autosens_max:Ke/(Ke+Ee-$e),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+Ee+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&Ee<$e&&V&&Q>=Ee&&sensitivityRatio<Be&&(s.ratio=Be*($e/Ee),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(Be,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+Ee+").")),sensitivityRatio&&!V?(Re=i.current_basal*sensitivityRatio,Re=r(Re,i)):V&&i.tddAdjBasal&&(Re=i.current_basal*ne,Re=r(Re,i),process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(ne,2)+", TDD 24h = "+o(J,2)+"U, Weighted average TDD = "+o(G,2)+"U, (Weight percentage = "+R+"), Total data of TDDs (up to 14 days) average = "+o(O,2)+"U. "),Re!==Ge?process.stderr.write("Adjusting basal from "+Ge+" U/h to "+Re+" U/h; "):process.stderr.write("Basal unchanged: "+Re+" U/h; ")),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){Le=o((Le-60)/s.ratio)+60,ze=o((ze-60)/s.ratio)+60;var Qe=o((Ee-60)/s.ratio)+60;Ee===(Qe=Math.max(80,Qe))?process.stderr.write("target_bg unchanged: "+Qe+"; "):process.stderr.write("target_bg from "+Ee+" to "+Qe+"; "),Ee=Qe}var Ve=200,Xe=200,Ye=200;if(e.noise>=2){var et=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);Ve=o(Math.min(200,Le*et)),Xe=o(Math.min(200,Ee*et)),Ye=o(Math.min(200,ze*et)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+Ee+" to "+Xe+"; "),Le=Ve,Ee=Xe,ze=Ye}var tt=Le-.5*(Le-40),at=i.threshold_setting;at>tt&&at<=120&&at>=65?(console.error("Threshold changed in settings from "+n(tt,i)+" to "+n(at,i)+". "),tt=at):console.error("Current threshold: "+n(tt,i));var rt="",ot=o(i.sens,1),nt=i.sens;if(void 0!==s&&s&&((nt=o(nt=i.sens/sensitivityRatio,1))!==ot?process.stderr.write("ISF from "+n(ot,i)+" to "+n(nt,i)):process.stderr.write("ISF unchanged: "+n(nt,i)),rt+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(ot,i)+"→"+n(nt,i)),console.error("CR:"+i.carb_ratio),void 0===a)return Ce.error="Error: iob_data undefined. ",Ce;var it,st=a;if(a.length,a.length>1&&J>0&&(a=st[0]),void 0===a.activity||void 0===a.iob)return Ce.error="Error: iob_data missing some property. ",Ce;var lt=((it=void 0!==a.lastTemp?o((new Date(Oe).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+it+"m, tempModulus:"+lt+"m"),Ce.temp="absolute",Ce.deliverAt=Ue,u&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&it>10&&t.duration)return Ce.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",m.setTempBasal(0,0,i,Ce,t);if(t&&a.lastTemp&&t.duration>0){var mt=it-a.lastTemp.duration;if(mt>5&&it>10)return Ce.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+mt+"m ago; canceling temp",m.setTempBasal(0,0,i,Ce,t)}var ut=o(-a.activity*nt*5,2),dt=o(6*(qe-ut));dt<0&&(dt=o(6*(We-ut)))<0&&(dt=o(6*(e.long_avgdelta-ut)));var ct=Fe,gt=(ct=a.iob>0?o(Fe-a.iob*nt):o(Fe-a.iob*Math.min(nt,i.sens)))+dt;if(void 0===gt||isNaN(gt))return Ce.error="Error: could not calculate eventualBG. Sensitivity: "+nt+" Deviation: "+dt,Ce;var ht=function(e,t,a){return o(a+(e-t)/24,1)}(Ee,gt,ut);Ce={temp:"absolute",bg:Fe,tick:Ae,eventualBG:gt,insulinReq:0,reservoir:d,deliverAt:Ue,sensitivityRatio,TDD:J,insulin:K};var pt=[],ft=[],bt=[],vt=[];pt.push(Fe),ft.push(Fe),vt.push(Fe),bt.push(Fe);var Bt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,u,l,Fe,Ee,Ne),Mt=i.enableUAM,_t=0,yt=0;_t=o(qe-ut,1);var xt=o(qe-ut,1);csf=nt/i.carb_ratio,console.error("profile.sens:"+n(i.sens,i)+", sens:"+n(nt,i)+", CSF:"+o(csf,1));var Dt=o(30*csf*5/60,1);_t>Dt&&(console.error("Limiting carb impact from "+_t+" to "+Dt+"mg/dL/5m (30g/h)"),_t=Dt);var wt=3;sensitivityRatio&&(wt/=sensitivityRatio);var St=wt;if(l.carbs){wt=Math.max(wt,l.mealCOB/20);var Tt=o((new Date(Oe).getTime()-l.lastCarbTime)/6e4),Ct=(l.carbs-l.mealCOB)/l.carbs;St=o(St=wt+1.5*Tt/60,1),console.error("Last carbs "+Tt+" minutes ago; remainingCATime:"+St+"hours; "+o(100*Ct,1)+"% carbs absorbed")}var Ut=Math.max(0,_t/5*60*St/2)/csf,Gt=90,Rt=1;i.remainingCarbsCap&&(Gt=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(Rt=Math.min(1,i.remainingCarbsFraction));var Ot=1-Rt,At=Math.max(0,l.mealCOB-Ut-l.carbs*Ot),It=(At=Math.min(Gt,At))*csf*5/60/(St/2),jt=o(l.slopeFromMaxDeviation,2),Ft=o(l.slopeFromMinDeviation,2),Pt=Math.min(jt,-Ft/3);yt=0===_t?0:Math.min(60*St/5/2,Math.max(0,l.mealCOB*csf/_t)),console.error("Carb Impact:"+_t+"mg/dL per 5m; CI Duration:"+o(5*yt/60*2,1)+"hours; remaining CI ("+St/2+"h peak):"+o(It,1)+"mg/dL per 5m");var qt,Wt,kt,Et,Lt,zt=999,Nt=999,Zt=999,Ht=Fe,$t=999,Jt=999,Kt=999,Qt=999,Vt=gt,Xt=Fe,Yt=Fe,ea=0,ta=[],aa=[];try{st.forEach((function(e){var t=o(-e.activity*nt*5,2),a=o(-e.iobWithZeroTemp.activity*nt*5,2),r=ct,n=_t*(1-Math.min(1,ft.length/12));if(!0===(V&&!be))Vt=ft[ft.length-1]+o(-e.activity*(1800/(f*te*Math.log(Math.max(ft[ft.length-1],39)/pe+1)))*5,2)+n,r=vt[vt.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(f*te*Math.log(Math.max(vt[vt.length-1],39)/pe+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(Vt,2)+" , ZTpredBG: "+o(r,2));else Vt=ft[ft.length-1]+t+n,r=vt[vt.length-1]+a;var i=Math.max(0,Math.max(0,_t)*(1-pt.length/Math.max(2*yt,1))),s=Math.min(pt.length,12*St-pt.length),l=Math.max(0,s/(St/2*12)*It);i+l,ta.push(o(l,0)),aa.push(o(i,0)),COBpredBG=pt[pt.length-1]+t+Math.min(0,n)+i+l;var m=Math.max(0,xt+bt.length*Pt),u=Math.max(0,xt*(1-bt.length/Math.max(36,1))),d=Math.min(m,u);if(d>0&&(ea=o(5*(bt.length+1)/60,1)),!0===(V&&!be))UAMpredBG=bt[bt.length-1]+o(-e.activity*(1800/(f*te*Math.log(Math.max(bt[bt.length-1],39)/pe+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=bt[bt.length-1]+t+Math.min(0,n)+d;ft.length<48&&ft.push(Vt),pt.length<48&&pt.push(COBpredBG),bt.length<48&&bt.push(UAMpredBG),vt.length<48&&vt.push(r),COBpredBG<$t&&($t=o(COBpredBG)),UAMpredBG<Jt&&(Jt=o(UAMpredBG)),Vt<Kt&&(Kt=o(Vt)),r<Qt&&(Qt=o(r));ft.length>18&&Vt<zt&&(zt=o(Vt)),Vt>Xt&&(Xt=Vt),(yt||It>0)&&pt.length>18&&COBpredBG<Nt&&(Nt=o(COBpredBG)),(yt||It>0)&&COBpredBG>Xt&&(Yt=COBpredBG),Mt&&bt.length>12&&UAMpredBG<Zt&&(Zt=o(UAMpredBG)),Mt&&UAMpredBG>Xt&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+aa.join(" ")),console.error("remainingCIs:      "+ta.join(" "))),Ce.predBGs={},ft.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var ra=ft.length-1;ra>12&&ft[ra-1]===ft[ra];ra--)ft.pop();for(Ce.predBGs.IOB=ft,kt=o(ft[ft.length-1]),vt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ra=vt.length-1;ra>6&&!(vt[ra-1]>=vt[ra]||vt[ra]<=Ee);ra--)vt.pop();if(Ce.predBGs.ZT=vt,o(vt[vt.length-1]),l.mealCOB>0&&(_t>0||It>0)){for(pt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ra=pt.length-1;ra>12&&pt[ra-1]===pt[ra];ra--)pt.pop();Ce.predBGs.COB=pt,Et=o(pt[pt.length-1]),gt=Math.max(gt,o(pt[pt.length-1]))}if(_t>0||It>0){if(Mt){for(bt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ra=bt.length-1;ra>12&&bt[ra-1]===bt[ra];ra--)bt.pop();Ce.predBGs.UAM=bt,Lt=o(bt[bt.length-1]),bt[bt.length-1]&&(gt=Math.max(gt,o(bt[bt.length-1])))}Ce.eventualBG=gt}console.error("UAM Impact:"+xt+"mg/dL per 5m; UAM Duration:"+ea+"hours"),zt=Math.max(39,zt),Nt=Math.max(39,Nt),Zt=Math.max(39,Zt),qt=o(zt);var oa=l.mealCOB/l.carbs;Wt=o(Zt<999&&Nt<999?(1-oa)*UAMpredBG+oa*COBpredBG:Nt<999?(Vt+COBpredBG)/2:Zt<999?(Vt+UAMpredBG)/2:Vt),Qt>Wt&&(Wt=Qt),Ht=o(Ht=yt||It>0?Mt?oa*$t+(1-oa)*Jt:$t:Mt?Jt:Kt);var na=Zt;if(Qt<tt)na=(Zt+Qt)/2;else if(Qt<Ee){var ia=(Qt-tt)/(Ee-tt);na=(Zt+(Zt*ia+Qt*(1-ia)))/2}else Qt>Zt&&(na=(Zt+Qt)/2);if(na=o(na),l.carbs)if(!Mt&&Nt<999)qt=o(Math.max(zt,Nt));else if(Nt<999){var sa=oa*Nt+(1-oa)*na;qt=o(Math.max(zt,Nt,sa))}else qt=Mt?na:Ht;else Mt&&(qt=o(Math.max(zt,na)));qt=Math.min(qt,Wt),process.stderr.write("minPredBG: "+qt+" minIOBPredBG: "+zt+" minZTGuardBG: "+Qt),Nt<999&&process.stderr.write(" minCOBPredBG: "+Nt),Zt<999&&process.stderr.write(" minUAMPredBG: "+Zt),console.error(" avgPredBG:"+Wt+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),Yt>Fe&&(qt=Math.min(qt,Yt)),Ce.COB=l.mealCOB,Ce.IOB=a.iob,Ce.BGI=n(ut,i),Ce.deviation=n(dt,i),Ce.ISF=n(nt,i),Ce.CR=o(i.carb_ratio,1),Ce.target_bg=n(Ee,i),Ce.TDD=o(J,2);var la=Ce.CR;xe!=Ce.CR&&(la=xe+"→"+Ce.CR);var ma=Ce.target_bg;Ee!=v&&(ma=n(v,i)+"→"+Ce.target_bg),Ce.reason=rt+", COB: "+Ce.COB+", Dev: "+Ce.deviation+", BGI: "+Ce.BGI+", CR: "+la+", Target: "+ma+", minPredBG "+n(qt,i)+", minGuardBG "+n(Ht,i)+", IOBpredBG "+n(kt,i),Et>0&&(Ce.reason+=", COBpredBG "+n(Et,i)),Lt>0&&(Ce.reason+=", UAMpredBG "+n(Lt,i)),Ce.reason+=tddReason+Me,Ce.reason+="; ";var ua=ct;ua<40&&(ua=Math.min(Ht,ua));var da,ca=tt-ua,ga=240,ha=240;if(l.mealCOB>0&&(_t>0||It>0)){for(ra=0;ra<pt.length;ra++)if(pt[ra]<Le){ga=5*ra;break}for(ra=0;ra<pt.length;ra++)if(pt[ra]<tt){ha=5*ra;break}}else{for(ra=0;ra<ft.length;ra++)if(ft[ra]<Le){ga=5*ra;break}for(ra=0;ra<ft.length;ra++)if(ft[ra]<tt){ha=5*ra;break}}Bt&&Ht<tt&&(console.error("minGuardBG "+n(Ht,i)+" projected below "+n(tt,i)+" - disabling SMB"),Bt=!1),void 0===i.maxDelta_bg_threshold&&(da=.2),void 0!==i.maxDelta_bg_threshold&&(da=Math.min(i.maxDelta_bg_threshold,.4)),ke>da*Fe&&(console.error("maxDelta "+n(ke,i)+" > "+100*da+"% of BG "+n(Fe,i)+" - disabling SMB"),Ce.reason+="maxDelta "+n(ke,i)+" > "+100*da+"% of BG "+n(Fe,i)+" - SMB disabled!, ",Bt=!1),console.error("BG projected to remain above "+n(Le,i)+" for "+ga+"minutes"),(ha<240||ga<60)&&console.error("BG projected to remain above "+n(tt,i)+" for "+ha+"minutes");var pa=ha,fa=i.current_basal*nt*pa/60,ba=Math.max(0,l.mealCOB-.25*l.carbs),va=(ca-fa)/csf-ba;fa=o(fa),va=o(va),console.error("naive_eventualBG:",ct,"bgUndershoot:",ca,"zeroTempDuration:",pa,"zeroTempEffect:",fa,"carbsReq:",va),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):va>=i.carbsReqThreshold&&ha<=45&&(Ce.carbsReq=va,Ce.reason+=va+" add'l carbs req w/in "+ha+"m; ");var Ba=0;if(Fe<tt&&a.iob<20*-i.current_basal/60&&qe>0&&qe>ht)Ce.reason+="IOB "+a.iob+" < "+o(20*-i.current_basal/60,2),Ce.reason+=" and minDelta "+n(qe,i)+" > expectedDelta "+n(ht,i)+"; ";else if(Fe<tt||Ht<tt)return Ce.reason+="minGuardBG "+n(Ht,i)+"<"+n(tt,i),Ba=o(60*((ca=Ee-Ht)/nt)/i.current_basal),Ba=30*o(Ba/30),Ba=Math.min(120,Math.max(30,Ba)),m.setTempBasal(0,Ba,i,Ce,t);if(i.skip_neutral_temps&&Ce.deliverAt.getMinutes()>=55)return Ce.reason+="; Canceling temp at "+Ce.deliverAt.getMinutes()+"m past the hour. ",m.setTempBasal(0,0,i,Ce,t);var Ma=0,_a=Re;if(gt<Le){if(Ce.reason+="Eventual BG "+n(gt,i)+" < "+n(Le,i),qe>ht&&qe>0&&!va)return ct<40?(Ce.reason+=", naive_eventualBG < 40. ",m.setTempBasal(0,30,i,Ce,t)):(e.delta>qe?Ce.reason+=", but Delta "+n(Ae,i)+" > expectedDelta "+n(ht,i):Ce.reason+=", but Min. Delta "+qe.toFixed(2)+" > Exp. Delta "+n(ht,i),t.duration>15&&r(Re,i)===r(t.rate,i)?(Ce.reason+=", temp "+t.rate+" ~ req "+Re+"U/hr. ",Ce):(Ce.reason+="; setting current basal of "+Re+" as temp. ",m.setTempBasal(Re,30,i,Ce,t)));Ma=o(Ma=2*Math.min(0,(gt-Ee)/nt),2);var ya=Math.min(0,(ct-Ee)/nt);if(ya=o(ya,2),qe<0&&qe>ht)Ma=o(Ma*(qe/ht),2);if(_a=r(_a=Re+2*Ma,i),t.duration*(t.rate-Re)/60<Math.min(Ma,ya)-.3*Re)return Ce.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",m.setTempBasal(_a,30,i,Ce,t);if(void 0!==t.rate&&t.duration>5&&_a>=.8*t.rate)return Ce.reason+=", temp "+t.rate+" ~< req "+_a+"U/hr. ",Ce;if(_a<=0){if((Ba=o(60*((ca=Ee-ct)/nt)/i.current_basal))<0?Ba=0:(Ba=30*o(Ba/30),Ba=Math.min(120,Math.max(0,Ba))),Ba>0)return Ce.reason+=", setting "+Ba+"m zero temp. ",m.setTempBasal(_a,Ba,i,Ce,t)}else Ce.reason+=", setting "+_a+"U/hr. ";return m.setTempBasal(_a,30,i,Ce,t)}if(qe<ht&&(!u||!Bt))return e.delta<qe?Ce.reason+="Eventual BG "+n(gt,i)+" > "+n(Le,i)+" but Delta "+n(Ae,i)+" < Exp. Delta "+n(ht,i):Ce.reason+="Eventual BG "+n(gt,i)+" > "+n(Le,i)+" but Min. Delta "+qe.toFixed(2)+" < Exp. Delta "+n(ht,i),t.duration>15&&r(Re,i)===r(t.rate,i)?(Ce.reason+=", temp "+t.rate+" ~ req "+Re+"U/hr. ",Ce):(Ce.reason+="; setting current basal of "+Re+" as temp. ",m.setTempBasal(Re,30,i,Ce,t));if(Math.min(gt,qt)<ze&&(!u||!Bt))return Ce.reason+=n(gt,i)+"-"+n(qt,i)+" in range: no temp required",t.duration>15&&r(Re,i)===r(t.rate,i)?(Ce.reason+=", temp "+t.rate+" ~ req "+Re+"U/hr. ",Ce):(Ce.reason+="; setting current basal of "+Re+" as temp. ",m.setTempBasal(Re,30,i,Ce,t));if(gt>=ze&&(Ce.reason+="Eventual BG "+n(gt,i)+" >= "+n(ze,i)+", "),a.iob>Ze)return Ce.reason+="IOB "+o(a.iob,2)+" > max_iob "+Ze,t.duration>15&&r(Re,i)===r(t.rate,i)?(Ce.reason+=", temp "+t.rate+" ~ req "+Re+"U/hr. ",Ce):(Ce.reason+="; setting current basal of "+Re+" as temp. ",m.setTempBasal(Re,30,i,Ce,t));(Ma=o((Math.min(qt,gt)-Ee)/nt,2))>Ze-a.iob?(console.error("SMB limited by maxIOB: "+Ze-a.iob+" (. insulinReq: "+Ma+" U)"),Ce.reason+="max_iob "+Ze+", ",Ma=Ze-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Ma+" U)."),_a=r(_a=Re+2*Ma,i),Ma=o(Ma,3),Ce.insulinReq=Ma;var xa=o((new Date(Oe).getTime()-a.lastBolusTime)/6e4,1);if(u&&Bt&&Fe>tt){var Da=o(l.mealCOB/i.carb_ratio,3),wa=0;void 0===i.maxSMBBasalMinutes?(wa=o(30*i.current_basal/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m"),Ma>wa&&console.error("SMB limited by maxBolus: "+wa+" ( "+Ma+" U)")):a.iob>Da&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+Da),i.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes: "+i.maxUAMSMBBasalMinutes+", profile.current_basal: "+i.current_basal),wa=o(i.current_basal*i.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),wa=o(30*i.current_basal/60,1)),Ma>wa?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+i.maxUAMSMBBasalMinutes+"m ]: "+wa+"U ( "+Ma+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+Ma+"U )")):(console.error("profile.maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+", profile.current_basal: "+i.current_basal),Ma>(wa=o(i.current_basal*i.maxSMBBasalMinutes/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+"m ]: "+wa+"U ( insulinReq: "+Ma+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+Ma+"U )"));var Sa=i.bolus_increment,Ta=1/Sa,Ca=i.smb_delivery_ratio;Ca>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Ca,2));var Ua=Math.min(Ma*Ca,wa);Ua=Math.floor(Ua*Ta)/Ta,Ba=o(60*((Ee-(ct+zt)/2)/nt)/i.current_basal),Ma>0&&Ua<Sa&&(Ba=0);var Ga=0;Ba<=0?Ba=0:Ba>=30?(Ba=30*o(Ba/30),Ba=Math.min(60,Math.max(0,Ba))):(Ga=o(Re*Ba/30,2),Ba=30),Ce.reason+=" insulinReq "+Ma,Ua>=wa&&(Ce.reason+="; maxBolus "+wa),Ba>0&&(Ce.reason+="; setting "+Ba+"m low temp of "+Ga+"U/h"),Ce.reason+=". ";var Ra=3;i.SMBInterval&&(Ra=Math.min(10,Math.max(1,i.SMBInterval)));var Oa=o(Ra-xa,0),Aa=o(60*(Ra-xa),0)%60;if(console.error("naive_eventualBG "+ct+","+Ba+"m "+Ga+"U/h temp needed; last bolus "+xa+"m ago; maxBolus: "+wa),xa>Ra?Ua>0&&(Ce.units=Ua,Ce.reason+="Microbolusing "+Ua+"U. "):Ce.reason+="Waiting "+Oa+"m "+Aa+"s to microbolus again. ",Ba>0)return Ce.rate=Ga,Ce.duration=Ba,Ce}var Ia=m.getMaxSafeBasal(i);return _a>Ia&&(Ce.reason+="adj. req. rate: "+_a+" to maxSafeBasal: "+o(Ia,2)+", ",_a=r(Ia,i)),t.duration*(t.rate-Re)/60>=2*Ma?(Ce.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+_a+"U/hr. ",m.setTempBasal(_a,30,i,Ce,t)):void 0===t.duration||0===t.duration?(Ce.reason+="no temp, setting "+_a+"U/hr. ",m.setTempBasal(_a,30,i,Ce,t)):t.duration>5&&r(_a,i)<=r(t.rate,i)?(Ce.reason+="temp "+t.rate+" >~ req "+_a+"U/hr. ",Ce):(Ce.reason+="temp "+t.rate+"<"+_a+"U/hr. ",m.setTempBasal(_a,30,i,Ce,t))}},6880:(e,t,a)=>{var r=a(6654);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,t,a)=>{var r=a(5639).Symbol;e.exports=r},9932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},9750:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},4239:(e,t,a)=>{var r=a(2705),o=a(9607),n=a(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,t,a)=>{var r=a(2705),o=a(9932),n=a(1469),i=a(3448),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},7561:(e,t,a)=>{var r=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},1957:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},9607:(e,t,a)=>{var r=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,a)=>{var r=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},7990:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},6654:(e,t,a)=>{var r=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},1469:e=>{var t=Array.isArray;e.exports=t},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,t,a)=>{var r=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},8601:(e,t,a)=>{var r=a(4841),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,t,a)=>{var r=a(8601);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},4841:(e,t,a)=>{var r=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?m(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,t,a)=>{var r=a(531);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(5546);freeaps_determineBasal=r})();