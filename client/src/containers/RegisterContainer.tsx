import {
  Container,
  Typography,
  TextField,
  Button, Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import * as yup from "yup";
import {FC, useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  fullName: string;
  password: string;
}

interface IProps {
  linkProp: string
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email(),
  fullName: yup.string().required('FullName is required').min(2).max(25),
  password: yup.string().required().min(8).max(60),
});

const useStyles = makeStyles((theme: any) => ({
  heading: {
    textAlign: "center",
    padding: '20px',
  },
  alreadyMemberContainer:{
    textAlign: "center",
    padding: '20px'
  }
}));

const  RegisterContainer: FC = (props:any) =>  {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // @ts-ignore
  const { heading, alreadyMemberContainer } = useStyles();

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
              {...register("fullName")}
              variant="outlined"
              margin="normal"
              label="First Name"
              helperText={errors.fullName?.message}
              error={!!errors.fullName?.message}
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
              sx={{mt: '24px'}}
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
        <Container className={alreadyMemberContainer}>
          <Typography fontSize={20}>
            Do you have a account ?
          </Typography>
          <Link {...props} to="/login"> Login </Link>
        </Container>
      </Container>
  );
}

export {RegisterContainer};
