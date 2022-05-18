import React from 'react';
import {ITrack} from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import { Card, Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeUp, Delete } from '@mui/icons-material';
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import { useTypeSelector } from '../hooks/useTypeSelector';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const { pause } = useTypeSelector(
        (state) => state.player
      );
    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        
        playTrack()
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
               Слушать 
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.title}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;