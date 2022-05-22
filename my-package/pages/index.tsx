import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import LoginButton from '@/components/buttons/login'
import { useRouter } from 'next/router';
import { useState } from 'react';

const styles = {
  paperContainer: {
    backgroundImage: `url(/img/city-skyline.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    backgroundSize: 'contain',
  }
};

const CORREIOS = /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/

const Home: NextPage = () => {
  const router = useRouter()
  const [codRastreio, setCodRastreio] = useState('')

  console.log(codRastreio, CORREIOS.test(codRastreio))

  function redirect () {
    if (CORREIOS.test(codRastreio)) router.push(`/correios/${codRastreio}`)
  }
  const invalidInput = !CORREIOS.test(codRastreio) && codRastreio.length > 1

  return <Container maxWidth="xl">
    <Grid container spacing={2} sx={{ pt: 2 }}>
      <Grid item xs={8}>
        <img src="/icons/logo.svg" height="50px" />
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: "end" }}>
        <LoginButton />
      </Grid>
    </Grid>
    <Grid container spacing={10} sx={{ pt: 20, minHeight: { xs: 'max(100vh, 100%)', lg: '0' }, backgroundPositionX: { sm: 'bottom'} }} style={styles.paperContainer}>
      <Grid item xs sx={{ display: { xs: 'none', lg: 'block' } }}>
        <img src='/img/delivery_truck.svg' width="100%" />
      </Grid>
      <Grid item xs={12} lg={5} xl={4} sx={{ display: 'flex', justifyContent: 'center',alignContent: 'center'}} >

        <Box
          sx={{
            '& > :not(style)': {},
            height: 50
          }}
          noValidate
          autoComplete="off"
        >
          <Paper
            elevation={6}
            sx={{
              p: {
                xs: 2,
                sm:5,
                md:5
              },
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography variant="h1" component="div" gutterBottom>Encontre a sua encomenda</Typography>
            <TextField fullWidth id="outlined-basic" label="Código de rastreio" variant="outlined" error={invalidInput}  helperText={invalidInput? "Codigo de rastreio invalido": ''}  value={codRastreio} onChange={e =>  setCodRastreio(e.target.value.toUpperCase())} />
            <Button variant="contained" fullWidth sx={{ py: 2 }} onClick={redirect} disabled={!CORREIOS.test(codRastreio)} size="large">Rastrear</Button>
            <Box>
              <Button disabled >
                <img src='/icons/briefcase.svg' />
                <Typography variant="subtitle2" sx={{ mx: 2, color: "common.black" }}>Soluções para empresas</Typography>
              </Button>
            </Box>

          </Paper>
        </Box>

      </Grid>

    </Grid>

  </Container>

}

export default Home
