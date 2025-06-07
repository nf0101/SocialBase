
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const ProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [foundCount, setFoundCount] = useState(0);
    const limit = 50;
    const [searchValue, setSearchValue] = useState('');
    const [searchField, setSearchField] = useState('username');
    const [filterPrivate, setFilterPrivate] = useState('');
    const [filterVerified, setFilterVerified] = useState('');
    const [filterFake, setFilterFake] = useState('');
    const [filterHasBio, setFilterHasBio] = useState('');
    const [filterHasWebsite, setFilterHasWebsite] = useState('');
    const [filterPicture, setFilterPicture] = useState('');
    const [filterBanner, setFilterBanner] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const navigate = useNavigate();

    const fetchProfiles = async (
        pageNumber = 1,
        value = searchValue,
        field = searchField,
        privateFlag = filterPrivate,
        verifiedFlag = filterVerified,
        fakeFlag = filterFake,
        bioFlag = filterHasBio,
        websiteFlag = filterHasWebsite,
        pictureFlag = filterPicture,
        bannerFlag = filterBanner,
        locationFlag = filterLocation
    ) => {
        try {
            const res = await axios.get('/api/profiles/paginated', {
                params: {
                    page: pageNumber,
                    limit,
                    ...(value ? { [field]: value } : {}),
                    ...(privateFlag !== '' ? { is_private: privateFlag } : {}),
                    ...(verifiedFlag !== '' ? { is_verified: verifiedFlag } : {}),
                    ...(fakeFlag !== '' ? { is_fake: fakeFlag } : {}),
                    ...(bioFlag !== '' ? { has_bio: bioFlag } : {}),
                    ...(websiteFlag !== '' ? { has_website: websiteFlag } : {}),
                    ...(pictureFlag !== '' ? { profile_picture: pictureFlag } : {}),
                    ...(bannerFlag !== '' ? { profile_banner: bannerFlag } : {}),
                    ...(locationFlag !== '' ? { has_location: locationFlag } : {}),
                },
            });

            setProfiles(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
            setPage(res.data.page || 1);
            setFoundCount(res.data.data?.length * res.data.totalPages || 0);
        } catch (err) {
            console.error("Errore nel fetch dei profili:", err);
            setProfiles([]);
        }
    };

    useEffect(() => {
        fetchProfiles(page);
    }, []);

    useEffect(() => {
        fetchProfiles(1);
    }, [
        filterPrivate,
        filterVerified,
        filterFake,
        filterHasBio,
        filterHasWebsite,
        filterPicture,
        filterBanner,
        filterLocation
    ]);


    const handleNext = () => {
        if (page < totalPages) fetchProfiles(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) fetchProfiles(page - 1);
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <h2>Lista Profili (pagina {page} di {totalPages})</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchProfiles(1);
                }}
            >
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <div>
                    <label><input type="radio" name="searchField" value="username" checked={searchField === 'username'} onChange={(e) => setSearchField(e.target.value)} /> Username</label>
                    <label><input type="radio" name="searchField" value="first_name" checked={searchField === 'first_name'} onChange={(e) => setSearchField(e.target.value)} /> Nome</label>
                    <label><input type="radio" name="searchField" value="last_name" checked={searchField === 'last_name'} onChange={(e) => setSearchField(e.target.value)} /> Cognome</label>
                    <label><input type="radio" name="searchField" value="email" checked={searchField === 'email'} onChange={(e) => setSearchField(e.target.value)} /> Email</label>
                </div>

                <button type="submit">Cerca</button>
            </form>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '10px',
                marginTop: '20px'
            }}>
                {[
                    { label: 'Privacy', value: filterPrivate, set: setFilterPrivate, name: 'privacy' },
                    { label: 'Verificato', value: filterVerified, set: setFilterVerified, name: 'verified' },
                    { label: 'Falso', value: filterFake, set: setFilterFake, name: 'fake' },
                    { label: 'Bio', value: filterHasBio, set: setFilterHasBio, name: 'bio' },
                    { label: 'Sito', value: filterHasWebsite, set: setFilterHasWebsite, name: 'website' },
                    { label: 'Foto profilo', value: filterPicture, set: setFilterPicture, name: 'picture' },
                    { label: 'Banner', value: filterBanner, set: setFilterBanner, name: 'banner' },
                    { label: 'Posizione', value: filterLocation, set: setFilterLocation, name: 'location' },
                ].map(f => (
                    <div key={f.name}>
                        <strong>{f.label}:</strong><br />
                        <label>
                            <input type="radio" name={f.name} value="" checked={f.value === ''} onChange={(e) => { f.set(e.target.value); fetchProfiles(1); }} />
                            Tutti
                        </label>{' '}
                        <label>
                            <input type="radio" name={f.name} value="true" checked={f.value === 'true'} onChange={(e) => { f.set(e.target.value); fetchProfiles(1); }} />
                            Sì
                        </label>{' '}
                        <label>
                            <input type="radio" name={f.name} value="false" checked={f.value === 'false'} onChange={(e) => { f.set(e.target.value); fetchProfiles(1); }} />
                            No
                        </label>
                    </div>
                ))}
            </div>


            <div style={{ margin: '10px 0' }}>
                <button onClick={handlePrev} disabled={page === 1}>⬅️ Indietro</button>
                <span style={{ margin: '0 10px' }}>Pagina {page}</span>
                <button onClick={handleNext} disabled={page === totalPages}>Avanti ➡️</button>
            </div>

            <p style={{ fontStyle: 'italic', color: '#555' }}>
                Trovati {foundCount} profili con i criteri di ricerca attuali.
            </p>

            <div style={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                marginLeft: '0',
                paddingLeft: '20px',  // opzionale, per non far toccare il bordo
                width: 'fit-content'  }}>

            {profiles && profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileCard key={profile.user_id} profile={profile} />
                    ))
                ) : (
                    <p>Nessun profilo trovato.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;
