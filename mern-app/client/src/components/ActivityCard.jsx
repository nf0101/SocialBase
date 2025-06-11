import React, { useState } from "react";
import axios               from "axios";

export default function ActivityCard({ activity }) {
    const [expanded, setExpanded] = useState(false);
    const [edit, setEdit]         = useState(false);
    const [field, setField]       = useState("");
    const [value, setValue]       = useState("");

    /* valori numerici normalizzati */
    const likes          = activity.likes?.$numberInt        || activity.likes;
    const comments       = activity.comments?.$numberInt     || activity.comments;
    const shares         = activity.shares?.$numberInt       || activity.shares;
    const characterCount = activity.character_count?.$numberInt || activity.character_count;
    const hashtagCount   = activity.hashtag_count?.$numberInt   || activity.hashtag_count;
    const mentionCount   = activity.mention_count?.$numberInt   || activity.mention_count;
    const containsUrl    = activity.contains_url?.$numberInt    || activity.contains_url;
    const isWeekend      = activity.is_weekend?.$numberInt      || activity.is_weekend;
    const hourOfDay      = activity.hour_of_day?.$numberInt     || activity.hour_of_day;
    const dayOfWeek      = activity.day_of_week?.$numberInt     || activity.day_of_week;

    const toggle = () => setExpanded((p) => !p);

    return (
        <div
            style={{
                ...styles.card,
                width: expanded ? "650px" : "320px",
                overflow: expanded ? "visible" : "hidden",
                transition: "width 0.25s ease",
            }}
        >
            {/* ───── HEADER (sempre visibile) ───── */}
            <div style={styles.header}>
                <h4 style={{ margin: 0, fontWeight: 700 }}>
                    👤 {activity.username || "N/D"}
                </h4>
                <button onClick={toggle} style={styles.toggleBtn}>
                    {expanded ? "🔼" : "🔽"}
                </button>
            </div>

            {/* ───── CONTENUTO (solo se expanded) ───── */}
            {expanded && (
                <>
                    <p>
                        <strong>📝 ID:</strong> {activity.activity_id}
                    </p>
                    <p>
                        <strong>✏️ Contenuto:</strong> {activity.content}
                    </p>

                    <div style={styles.metricsRow}>
                        <div style={styles.column}>
                            <p>📍 <strong>Città del post:</strong> {activity.post_city}</p>
                            <p>🖥️ <strong>Dispositivo:</strong> {activity.device} ({activity.platform})</p>
                            <p>👍 <strong>Like:</strong> {likes}</p>
                            <p>💬 <strong>Commenti:</strong> {comments}</p>
                            <p>🔁 <strong>Condivisioni:</strong> {shares}</p>
                            <p>📅 <strong>Giorno settimana:</strong> {dayOfWeek}</p>
                        </div>
                        <div style={styles.column}>
                            <p>🗺️ <strong>Regione post:</strong> {activity.post_region}</p>
                            <p>🧠 <strong>Lingua:</strong> {activity.language}</p>
                            <p>⏰ <strong>Ora del giorno:</strong> {hourOfDay}</p>
                            <p>🎉 <strong>Weekend:</strong> {isWeekend === 1 ? "Sì" : "No"}</p>
                            <p>🔠 <strong>Caratteri:</strong> {characterCount}</p>
                            <p>🏷️ <strong>Hashtag:</strong> {hashtagCount}</p>
                        </div>
                        <div style={styles.column}>
                            <p>🌍 <strong>Paese post:</strong> {activity.post_country}</p>
                            <p>👾 <strong>Tipo contenuto:</strong> {activity.content_type}</p>
                            <p>👥 <strong>Menzioni:</strong> {mentionCount}</p>
                            <p>🔗 <strong>URL incluso:</strong> {containsUrl === 1 ? "Sì" : "No"}</p>
                            <p>🖼️ <strong>Media presente:</strong> {activity.has_media === "True" ? "Sì" : "No"}</p>
                            <p>📷 <strong>Tipo media:</strong> {activity.media_type}</p>
                        </div>
                    </div>

                    <p>
                        <strong>🤖 Attività falsa:</strong>{" "}
                        {activity.is_fake === "True" ? "Sì" : "No"}
                    </p>

                    {/* AZIONI delete / update */}
                    <div style={{ marginTop: 10 }}>
                        <button
                            onClick={async () => {
                                if (!window.confirm("Eliminare questa attività?")) return;
                                await axios.delete(`/api/activities/delete/${activity._id}`);
                                alert("🗑️ Attività eliminata");
                            }}
                            style={{ background: "crimson", color: "#fff", marginRight: 8 }}
                        >
                            🗑️
                        </button>

                        <button onClick={() => setEdit(!edit)}>✏️</button>
                    </div>

                    {edit && (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await axios.put(`/api/activities/update/${activity._id}`, {
                                    [field]: value,
                                });
                                alert("✏️ Attività aggiornata");
                                setEdit(false);
                            }}
                            style={{ marginTop: 10 }}
                        >
                            <select
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                                style={{ marginRight: 6 }}
                                required
                            >
                                <option value="">— seleziona campo —</option>
                                {/* ⇣ tutti i campi ⇣ */}
                                {Object.keys(activity).map((k) => (
                                    <option key={k} value={k}>
                                        {k}
                                    </option>
                                ))}
                            </select>

                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Nuovo valore"
                                required
                            />

                            <button
                                type="submit"
                                style={{ marginLeft: 6, background: "blue", color: "#fff" }}
                            >
                                Salva
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        background: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,.1)",
        transition: "width 0.25s ease",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 14,
        minHeight: 36,
        padding: "2px 0",
    },
    toggleBtn: {
        background: "none",
        border: "none",
        fontSize: 18,
        cursor: "pointer",
    },
    metricsRow: {
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        marginTop: 10,
    },
    column: {
        flex: 1,
        minWidth: 180,
    },
};
