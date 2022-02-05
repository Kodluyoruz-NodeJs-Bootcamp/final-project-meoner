import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormInput {
  email: string;
  firstName: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

const useStyles = makeStyles((theme: any) => ({
  heading: {
    textAlign: "center",
    margin: '300px',
    color: 'red'
  },
  submitButton: {
  },
}));

const  RegisterContainer = () =>  {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // @ts-ignore
  const { heading, submitButton } = useStyles();

  const [json, setJson] = useState<string>();

  // @ts-ignore
  const onSubmit = async (data: IFormInput) => {
    //await setJson(JSON.stringify(data));
    console.log(data);
  };

  // @ts-ignore
  return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Sign Up Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
              {...register("email")}
              variant="outlined"
              margin="normal"
              label="Email"
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              fullWidth
              required
          />
          <TextField
              {...register("firstName")}
              variant="outlined"
              margin="normal"
              label="First Name"
              helperText={errors.firstName?.message}
              error={!!errors.firstName?.message}
              fullWidth
              required
          />
          <TextField
              {...register("password")}
              variant="outlined"
              margin="normal"
              label="Password"
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              type="password"
              fullWidth
              required
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButton}
          >
            Sign Up
          </Button>
          {json && (
              <>
                <Typography variant="body1">
                  Below is the JSON that would normally get passed to the server
                  when a form gets submitted
                </Typography>
                <Typography variant="body2">{json}</Typography>
              </>
          )}
        </form>
      </Container>
  );
}

export default RegisterContainer;
