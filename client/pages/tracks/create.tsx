import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";


const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)
  const router = useRouter()
const title = useInput('')
const artist = useInput('')
  const lyrics = useInput('')
   const next = () => {
    if(activeStep !== 2){
    setActiveStep(prev=>prev+1)}
  else{
    const formData = new FormData()
  formData.append('title', title.value)  
  formData.append('title', artist.value)  
formData.append('title', lyrics.value)
formData.append('picture', lyrics.value)
formData.append('audio', lyrics.value)
axios.post('http://localhost:5000/tracks', formData)
.then(response=>router.push('/tracks'))
.catch(e=>console.log(e))
  }
   }

   const back = () => {
     
    setActiveStep(prev=>prev-1)
  }
  return (
    <MainLayout>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 &&
          <Grid container direction='column'>
            <TextField {...title} style={{marginTop:10}} label={'Название трека'}/>
            <TextField {...artist} style={{marginTop:10}} label={'Имя исполнителя'}/>
            <TextField {...lyrics} style={{marginTop:10}} label={'Слова к треку'}
            multiline rows={3}
            />
          </Grid>
          }
          {activeStep === 1 &&
          <FileUpload setFile={()=>{setPicture}} accept='image/*'>
            <Button>Загрузить изображение</Button>
            </FileUpload>}

          {activeStep === 2 &&
          <FileUpload setFile={()=>{setAudio}} accept='audio/*'>
            <Button>Загрузить аудио</Button>
            </FileUpload>}
        </StepWrapper>
        <Grid container justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
          <Button onClick={next}>Далее</Button>
        </Grid>
    </MainLayout>
  );
};

export default Create;
