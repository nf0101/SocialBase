import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const ProfileStats = ({ profiles }) => {
    if (!profiles || profiles.length === 0) return <p style={{ textAlign: 'center' }}>Nessun profilo per generare statistiche.</p>;

    const accountTypes = {};
    const isPrivateCount = { Privati: 0, Pubblici: 0 };

    profiles.forEach(p => {
        const type = p.account_type || 'unknown';
        accountTypes[type] = (accountTypes[type] || 0) + 1;

        if (p.is_private === 'True') {
            isPrivateCount.Privati += 1;
        } else if (p.is_private === 'False') {
            isPrivateCount.Pubblici += 1;
        }
    });

    const generateCompletenessDistribution = (profiles, step = 10) => {
        const bins = Array.from({ length: 100 / step}, (_, i) => i * step);

        const distribution = bins.map(bin => ({
            range: `${bin}-${bin + step}`,
            fake: 0,
            legit: 0
        }));

        profiles.forEach(profile => {
            const value = parseFloat(profile.profile_completeness?.$numberDouble || profile.profile_completeness) * 100;
            const binIndex = Math.min(Math.floor(value / step), distribution.length - 1);
            if (profile.is_fake === 'True') {
                distribution[binIndex].fake += 1;
            } else {
                distribution[binIndex].legit += 1;
            }
        });

        return distribution;
    };


    const computeAvg = (profiles, field) => {
        let fakeTotal = 0, legitTotal = 0, fakeCount = 0, legitCount = 0;

        profiles.forEach(p => {
            const value = parseInt(p[field]?.$numberInt || p[field] || 0);
            const isFake = p.is_fake === 'True';
            if (isFake) {
                fakeTotal += value;
                fakeCount++;
            } else {
                legitTotal += value;
                legitCount++;
            }
        });

        return {
            Legittimi: legitCount > 0 ? parseFloat(legitTotal / legitCount).toFixed(2) : 0,
            Falsi: fakeCount > 0 ? parseFloat(fakeTotal / fakeCount).toFixed(2) : 0
        };
    };

    const avgPostData = [
        { gruppo: "Post", ...computeAvg(profiles, "posts_count") }
    ];
    const avgFollowerData = [
        { gruppo: "Follower", ...computeAvg(profiles, "followers_count") }
    ];
    const avgFollowingData = [
        { gruppo: "Following", ...computeAvg(profiles, "following_count") }
    ];



    const accountTypeData = Object.entries(accountTypes).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    const privacyDataGrouped = [
        {
            tipo: 'Legittimi',
            Pubblici: profiles.filter(p => p.is_fake === 'False' && p.is_private === 'False').length,
            Privati: profiles.filter(p => p.is_fake === 'False' && p.is_private === 'True').length
        },
        {
            tipo: 'Falsi',
            Pubblici: profiles.filter(p => p.is_fake === 'True' && p.is_private === 'False').length,
            Privati: profiles.filter(p => p.is_fake === 'True' && p.is_private === 'True').length
        }
    ];


    const getBinnedData = (profiles, binSize = 100) => {
        const bins = {};

        profiles.forEach(p => {
            const age = parseInt(p.account_age_days?.$numberInt || p.account_age_days || 0, 10);
            const isFake = p.is_fake === 'True';

            const bin = Math.floor(age / binSize) * binSize;
            if (!bins[bin]) {
                bins[bin] = { bin: `${bin}-${bin + binSize - 1}`, fake: 0, legit: 0 };
            }

            if (isFake) bins[bin].fake += 1;
            else bins[bin].legit += 1;
        });

        return Object.values(bins).sort((a, b) => {
            const aStart = parseInt(a.bin.split('-')[0], 10);
            const bStart = parseInt(b.bin.split('-')[0], 10);
            return aStart - bStart;
        });
    };

    const binnedAgeData = getBinnedData(profiles);



    const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

    return (
        <div style={{ maxWidth: '100%', padding: '0 10px' }}>
            <h3 style={{ textAlign: 'center' }}>Distribuzione tipi di account</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={accountTypeData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {accountTypeData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Profili pubblici e privati (falsi vs legittimi)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={privacyDataGrouped}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Pubblici" fill="#82ca9d" />
                    <Bar dataKey="Privati" fill="#ff6961" />
                </BarChart>
            </ResponsiveContainer>


            <div style={{ padding: '20px' }}>
                <h3>📈 Distribuzione età account (giorni)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={binnedAgeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bin" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="legit" name="Legittimi" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="fake" name="Falsi" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <h4 style={{ marginTop: '30px' }}>Distribuzione della completezza del profilo (%)</h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateCompletenessDistribution(profiles, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" label={{ value: "Intervallo %", position: "insideBottom", offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="legit" name="Legittimi" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="fake" name="Falsi" stroke="#ff6961" />
                </LineChart>
            </ResponsiveContainer>

            <h4 style={{ marginTop: '30px' }}>Confronto medio (falsi vs legittimi)</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <ResponsiveContainer width="32%" height={250}>
                    <BarChart data={avgPostData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="gruppo" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Legittimi" fill="#82ca9d" />
                        <Bar dataKey="Falsi" fill="#ff6961" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="32%" height={250}>
                    <BarChart data={avgFollowerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="gruppo" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Legittimi" fill="#82ca9d" />
                        <Bar dataKey="Falsi" fill="#ff6961" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="32%" height={250}>
                    <BarChart data={avgFollowingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="gruppo" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Legittimi" fill="#82ca9d" />
                        <Bar dataKey="Falsi" fill="#ff6961" />
                    </BarChart>
                </ResponsiveContainer>
            </div>





        </div>

    );
};

export default ProfileStats;
