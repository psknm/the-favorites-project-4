import axios from 'axios';
import { useEffect, useState } from 'react'

const Tracks = () => {
    const [trackInfo, setTrackInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tracks')
            .then((res) => {
                console.log('Response data:', res.data);
                setTrackInfo(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching tracks:', err);
            });
    }, []);

    return (
        <>
            <h2>Hello</h2>
            {trackInfo.length > 0 ? (
                trackInfo.map((track) => (
                    <div key={track._id}>
                        <h3>Track Name: {track.track_name}</h3>
                        <p>Track Country: {track.track_country}</p>
                        <p>Lap Count: {track.lap_count_2024}</p>
                        <p>Turn Count: {track.turn_count_2024}</p>
                        <p>Winner: {track.winner_first_name} {track.winner_last_name} </p>
                    </div>
                ))
            ) : (
                <p>No track data available</p>
            )}
        </>
    );
};

export default Tracks;