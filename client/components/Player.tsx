import React, { useEffect } from "react";

import styles from "../styles/Player.module.scss";

import TrackProgress from "./TrackProgress";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { useActions } from "../hooks/useActions";
import { Grid, IconButton } from "@mui/material";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { setCurrentTime, setVolume } from "../store/action-creators/player";

let audio;
const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds - (minutes * 60);
 
  return (minutes + secs/100).toFixed(2);
};
const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypeSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  };

//   const play = () => {
//     const playPromise = audio.play();

//     if (pause) {
//       playTrack();
//       audio.play();
//     }
//     if (playPromise !== undefined) {
//       playPromise.then((_) => {
//         if (!pause) {
//           pauseTrack();
//           audio.pause();
//         }
//       });
//     }
//   };
const play = () => {
    if (pause) {
        playTrack()
        audio.play()
    } else {
        pauseTrack()
        audio.pause()
    }
}
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.title}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={formatSeconds(currentTime)}
        right={formatSeconds(duration)}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
