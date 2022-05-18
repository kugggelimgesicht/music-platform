import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";

const TrackPage = () => {
    const track = {_id:"1", title:"trooper", artist:"Iron Maiden", lyrics:'lalala', picture:"https://i.pinimg.com/originals/ef/bc/95/efbc953498abd8425835bc53c9ced2cb.jpg", audio:"trooper.mp3", comments:[]}
  const router = useRouter();
  return (
    <MainLayout>
      <Button variant={"outlined"} onClick={() => router.push("/tracks")}>
        к списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img src="" alt="" width={200} height={200} />
        <div style={{ margin: "20px 0" }}>
          <h1>track name - trak</h1>
          <h2>Artist - art</h2>
          <h2>listens - listens</h2>
        </div>
      </Grid>
      <h2>Lyrics</h2>
      <p>lalla</p>
      <h2>Комментарии</h2>
      <Grid container>
        <TextField label="Ваше имя" fullWidth />
        <TextField label="Комментарий" fullWidth multiline rows={4} />
        <Button>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map(comment => 
          <div key={comment._id}>
              <div>автор {comment.username}</div>
            <div>комментарий {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;
