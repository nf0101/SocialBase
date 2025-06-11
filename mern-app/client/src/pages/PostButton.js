import React, { useState } from 'react';
import axios from 'axios';

/* =====================================================================
 *  CreateDashboard (profili + attività)
 *  - Sezione collassabile "Crea entità" con header pill‑style.
 *  - Campi disposti 2‑colonne, textarea full‑row.
 *  - account_type e content_type resi <select> con categorie predefinite.
 *  - Form si resetta a template dopo creazione riuscita.
 * =====================================================================*/

const booleanProfile  = ['is_private','is_verified','profile_picture','profile_banner','has_bio','has_website','has_location','is_fake'];
const booleanActivity = ['is_weekend','has_media','contains_url','is_fake'];

const accountTypeOptions = [
  'active_user',
  'business',
  'casual_user',
  'news_updates',
  'influencer',
  'bot',
  'crypto_scam',
  'porn_scam',
  'impersonation',
  'phishing'
];


const templateProfile = {
  user_id:'', username:'', email:'', full_name:'', first_name:'', last_name:'',
  creation_date:'', account_age_days:'', profile_completeness:'',
  home_country:'', home_region:'', home_city:'',
  followers_count:'', following_count:'', posts_count:'',
  account_type:'', language_preference:'',
  is_private:'False', is_verified:'False', profile_picture:'False', profile_banner:'False',
  has_bio:'False', has_website:'False', has_location:'False', is_fake:'False'
};
const templateActivity = {
  activity_id:'', user_id:'', timestamp:'', content:'',
  post_country:'', post_region:'', post_city:'',
  device:'', platform:'', likes:'', comments:'', shares:'',
  hour_of_day:'', day_of_week:'', media_type:'', character_count:'', hashtag_count:'', mention_count:'',
  content_type:'', language:'',
  is_weekend:'False', has_media:'False', contains_url:'False', is_fake:'False'
};

const box   = { border:'1px solid #ddd', borderRadius:12, padding:20, width:380, background:'#fff', display:'flex', flexDirection:'column', height:520 };
const label = { fontWeight:600, display:'block', marginBottom:4, fontSize:13 };
const input = { padding:8, borderRadius:8, border:'1px solid #ccc', width:'100%', boxSizing:'border-box' };
const btn   = { marginTop:14, background:'linear-gradient(135deg,#4e8cff 0%,#6c63ff 100%)', color:'#fff', border:'none', borderRadius:8, padding:10, fontWeight:600 };

function CreatePanel({ tipo }){
  const isProfile = tipo==='profili';
  const endpoint  = isProfile ? '/api/profiles' : '/api/activities';
  const boolList  = isProfile ? booleanProfile : booleanActivity;
  const template  = isProfile ? templateProfile : templateActivity;

  const [formData,setFormData] = useState(template);

  const isBoolean = (k)=> boolList.includes(k);
  const isLong    = (k,v)=> k==='content' || String(v).length>60;
  const change    = (k,v)=> setFormData(p=>({...p,[k]:v}));

  const handleCreate = async(e)=>{
    e.preventDefault();
    await axios.post(`${endpoint}/create`,formData);
    alert('✅ creato');
    setFormData(template);          // reset form
  };

  return(
      <form onSubmit={handleCreate} style={box}>
        <h4 style={{textAlign:'center',marginBottom:12}}>{`Crea ${tipo}`}</h4>

        <div style={{flex:1,overflowY:'auto',display:'flex',flexWrap:'wrap',gap:12}}>
          {Object.entries(formData).map(([k,v])=>{
            const full = isLong(k,v);
            return(
                <div key={k} style={{flex:full?'1 1 100%':'1 1 47%'}}>
                  <label style={label}>{k}</label>

                  {/* BOOLEANI */}
                  {isBoolean(k) ? (
                          <input type="checkbox" checked={v==='True'} onChange={e=>change(k,e.target.checked?'True':'False')} />
                      ) : /* SELECT account_type / content_type */
                      (isProfile && k==='account_type') ? (
                          <select value={v} onChange={e=>change(k,e.target.value)} style={input}>
                            <option value="">— scegli categoria —</option>
                            {accountTypeOptions.map(opt=> <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                      ) : (!isProfile && k==='content_type') ? (
                              <select value={v} onChange={e=>change(k,e.target.value)} style={input}>
                                <option value="">— scegli categoria —</option>
                                {accountTypeOptions.map(opt=> <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                          ) : /* TEXTAREA lunga */
                          full ? (
                              <textarea value={v} onChange={e=>change(k,e.target.value)} style={{...input,height:60}} />
                          ) : /* INPUT testo normale */(
                              <input value={v} onChange={e=>change(k,e.target.value)} style={input} />
                          )}
                </div>
            );
          })}
        </div>

        <button type="submit" style={btn}>✅ Crea</button>
      </form>
  );
}

export default function CreateDashboard(){
  const [open,setOpen]=useState(false);
  return(
      <div style={{marginTop:40}}>
        <div
            onClick={()=>setOpen(p=>!p)}
            style={{
              cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,
              fontSize:18,fontWeight:700,
              background:'linear-gradient(135deg, #6c63ff 0%, #4e8cff 100%)',
              color:'#fff', padding:'12px 24px',borderRadius:9999, border:'2px solid #4e8cff',
              maxWidth:260,margin:'0 auto',boxShadow:'0 3px 8px rgba(0,0,0,.15)'
            }}
        >
          <span>Crea entità</span>
          <span>{open?'▲':'▼'}</span>
        </div>

        {open && (
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:40,padding:'30px 20px',background:'#f9f9f9'}}>
              <CreatePanel tipo="profili" />
              <CreatePanel tipo="attività" />
            </div>
        )}
      </div>
  );
}
