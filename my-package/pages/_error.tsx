import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import LoginButton from '@/components/buttons/login'

const styles = {
  paperContainer: {
    backgroundImage: `url(/img/city-skyline.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    backgroundSize: 'contain',
    
  }
};


const Error: NextPage = ({ statusCode, mensage }) => {
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
        <img src='/img/error.svg' width="100%" />
      </Grid>
      <Grid item xs={12} lg={5} xl={4} sx={{ display: 'flex', justifyContent: 'center',alignContent: 'center'}} >

        <Box
          component="form"
          sx={{
            '& > :not(style)': {},
            height: 50,
            width: '100%'
          }}
          noValidate
          autoComplete="off"
        >
          <Paper
            elevation={6}
            sx={{
              p: {
                xs: 2,
                sm:3,
                md:5
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              gap: 2
            }}
          >
            <Typography variant="h1" component="div" align='center' gutterBottom>{statusCode}</Typography>
            <Typography variant="h4" component="div" align='center' gutterBottom>{mensage}</Typography>
          </Paper>
        </Box>

      </Grid>

    </Grid>
  </Container>

}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const mensage = (statusCode == 404)? 'Não encontrado': 'Um erro ocorreu'
  return { statusCode, mensage }
}

export default Error
