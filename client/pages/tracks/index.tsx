
import { Card, Grid, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useActions } from "../../hooks/useActions";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks } from "../../store/action-creators/tracks";

const Index = () => {
    const router = useRouter()
    const {} = useTypeSelector(state =>state.player)
    const {} = useActions()
   const {tracks, error} = useTypeSelector(state=>state.track)
if(error){
  return <MainLayout>
    <h1>{error}</h1>
  </MainLayout>
}
    return (
        <MainLayout>
        <Grid container justifyContent="center">
          <Card style={{ width: 900 }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h1>Список треков</h1>
                <Button onClick={()=>router.push('/tracks/create')}>Загрузить</Button>
              </Grid>
            </Box>
            <TrackList tracks={tracks}/>
          </Card>
        </Grid>
      </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
      async ({ req }) => {
          try {
            const dispatch =store.dispatch as NextThunkDispatch
              await dispatch(await fetchTracks())
              return { props: {} }
          } catch (e) {
              return { props: {} }
          }
          
      }
)