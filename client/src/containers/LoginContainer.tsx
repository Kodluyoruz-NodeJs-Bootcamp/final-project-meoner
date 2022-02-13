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
import {Link} from "react-router-dom";
import React from "react";
import API from "../api/api";

interface IFormInput {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required().min(8).max(60),
});

const useStyles = makeStyles((theme: any) => ({
    heading: {
        textAlign: 'center',
        padding: '20px',
    },
    newAccountLink: {
        textAlign: 'center',
        padding: '20px',
    }
}));

const  LoginContainer = (props:any) =>  {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    // @ts-ignore
    const { heading,newAccountLink  } = useStyles();

    const [json, setJson] = useState<string>();

    // @ts-ignore
    const onSubmit = async (data: IFormInput) => {
        //await setJson(JSON.stringify(data));
        console.log(data);
        await API.post(`users/login`, data).then(res => {
            console.log(res);
            console.log(res.data);
        })
    };

    // @ts-ignore
    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Login Form
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
                    Login
                </Button>

            </form>
            <Container className={newAccountLink}>
                <Link  to="/register"> Create a new account </Link>
            </Container>
        </Container>
    );
}

export  {LoginContainer};
