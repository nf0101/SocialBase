import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ActivitiesStats({ activities: propActivities = [] }) {
    /* se arrivano attività via prop, NON bisogna refetchare tutto */
    const [activities, setActivities] = useState(propActivities);
    const [loading,    setLoading]    = useState(propActivities.length === 0);
    const [error,      setError]      = useState("");
    const [selectedType, setSelectedType] = useState("Tutti");

    /* fetch globale solo se il genitore NON ha passato attività */
    useEffect(() => {
        if (propActivities.length) return;   //  ↩ evita fetch
        axios.get("/api/activities/all")
            .then(res => { setActivities(res.data); setLoading(false); })
            .catch(()  => { setError("Errore fetch attività"); setLoading(false); });
    }, [propActivities]);


    if (loading) return <p style={{ textAlign:"center" }}>Caricamento statistiche…</p>;
    if (error)   return <p style={{ textAlign:"center", color:"red" }}>{error}</p>;
    if (!activities.length)
        return <p style={{ textAlign:"center" }}>Nessuna attività nel database.</p>;

    /* ---------- filtro content_type ---------- */
    const allTypes = Array.from(new Set(
        activities.map(a => a.content_type).filter(Boolean)
    ));
    const filtered = selectedType === "Tutti"
        ? activities
        : activities.filter(a => a.content_type === selectedType);

    if (!filtered.length)
        return <p style={{ textAlign:"center" }}>Nessuna attività per la categoria selezionata.</p>;

    /* ---------- Pie distribuzione content_type ---------- */
    const typeCounts = {};
    filtered.forEach(a => {
        const key = a.content_type || "unknown";
        typeCounts[key] = (typeCounts[key] || 0) + 1;
    });
    const typeData = Object.entries(typeCounts).map(([name,value])=>({name,value}));

    /* ---------- Weekend vs Weekday ---------- */
    const weData = [
        {
            tipo:"Legittime",
            WeekEnd: filtered.filter(a=>a.is_fake==="False"&&a.is_weekend===1).length,
            WeekDay: filtered.filter(a=>a.is_fake==="False"&&a.is_weekend===0).length,
        },
        {
            tipo:"False",
            WeekEnd: filtered.filter(a=>a.is_fake==="True"&&a.is_weekend===1).length,
            WeekDay: filtered.filter(a=>a.is_fake==="True"&&a.is_weekend===0).length,
        },
    ];

    /* ---------- medie likes/comments/shares ---------- */
    const avgVal = (field) => {
        let totF=0, totL=0, cF=0, cL=0;
        filtered.forEach(a=>{
            const val = parseInt(a[field]?.$numberInt || a[field] || 0,10);
            if(a.is_fake==="True"){ totF+=val; cF++; } else { totL+=val; cL++; }
        });
        return { Legittime: cL ? +(totL/cL).toFixed(1) : 0,
            False:     cF ? +(totF/cF).toFixed(1) : 0 };
    };
    const charData = [{ metrica: "CharCount", ...avgVal("character_count") }];
    const likeData  = [{metrica:"Likes",    ...avgVal("likes")}];
    const commData  = [{metrica:"Comments", ...avgVal("comments")}];
    const shareData = [{metrica:"Shares",   ...avgVal("shares")}];

    /* ---------- frequenza per ora ---------- */
    const hourBins = Array.from({length:24},(_,h)=>({ora:`${h}`, legit:0, fake:0}));
    filtered.forEach(a=>{
        const h=parseInt(a.hour_of_day?.$numberInt||a.hour_of_day||0,10);
        if(a.is_fake==="True") hourBins[h].fake++; else hourBins[h].legit++;
    });

    /* ---------- presenza media / URL ---------- */
    const mediaUrlData = [
        {
            tipo:"Legittime",
            HasMedia:    filtered.filter(a=>a.is_fake==="False"&&a.has_media==="True").length,
            ContainsURL: filtered.filter(a=>a.is_fake==="False"&&a.contains_url===1).length,
        },
        {
            tipo:"False",
            HasMedia:    filtered.filter(a=>a.is_fake==="True"&&a.has_media==="True").length,
            ContainsURL: filtered.filter(a=>a.is_fake==="True"&&a.contains_url===1).length,
        },
    ];

    return (
        <div style={{ maxWidth:"100%", padding:"0 10px" }}>
            {/* ------------ Filtro categoria ------------ */}
            <div style={{ textAlign:"center", marginBottom:20 }}>
                <label><strong>Filtra per content_type: </strong></label>
                <select
                    value={selectedType}
                    onChange={e=>setSelectedType(e.target.value)}
                >
                    <option value="Tutti">Tutti</option>
                    {allTypes.map(t=>(
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {/* ------------ PieChart content_type ------------ */}
            <h3 style={{ textAlign:"center"}}>Distribuzione contenuto</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie data={typeData} dataKey="value" nameKey="name" outerRadius={110} label>
                        {typeData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            {/* ------------ Weekend vs Weekday ------------ */}
            <h3 style={{ textAlign:"center", marginTop:30 }}>Weekend vs Giorni feriali</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="WeekDay" fill="#00C49F" />
                    <Bar dataKey="WeekEnd" fill="#FF8042" />
                </BarChart>
            </ResponsiveContainer>



            {/* ------------ Ore del giorno ------------ */}
            <h3 style={{ marginTop:30 }}>Frequenza per ora del giorno</h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={hourBins}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ora" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="legit" name="Legittime" stroke="#00C49F" />
                    <Line type="monotone" dataKey="fake"  name="False"     stroke="#FF8042" />
                </LineChart>
            </ResponsiveContainer>

            {/* ------------ Presenza media / URL ------------ */}
            <h3 style={{ marginTop:30 }}>Presenza Media e URL</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mediaUrlData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="HasMedia"    fill="#8884d8" />
                    <Bar dataKey="ContainsURL" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>


            <h3 style={{ marginTop: 30 }}>
                Medie Likes / Comments / Shares / CharCount
            </h3>

            {/* griglia 2×2 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 20,
                }}
            >
                {[likeData, commData, shareData, charData].map((data, idx) => (
                    <ResponsiveContainer key={idx} width="100%" height={260}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metrica" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Legittime" fill="#00C49F" />
                            <Bar dataKey="False"     fill="#FF8042" />
                        </BarChart>
                    </ResponsiveContainer>
                ))}
            </div>

        </div>


    );
}
