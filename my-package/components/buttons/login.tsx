import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function LoginButton() {
    return <ButtonGroup disableElevation size="large" variant="contained">
    <Button disabled color="neutral">Login</Button>
    <Button disabled color="highlight"><img src="/icons/login.svg"/></Button>
  </ButtonGroup>
}