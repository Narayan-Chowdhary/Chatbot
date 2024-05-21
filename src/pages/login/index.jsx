import LoginImage from "../../assets/images/LoginImage.jpg";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login.service";
import AlertMessage from "../../components/alertmessage";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SigninImg from "../../assets/images/SigninImg.png"
import Logo from "../../assets/images/Logo-removebg.png"
import { blue } from "@mui/material/colors";

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const navigation = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .transform(value => value?.trim())
      .email("Invalid email")
      .required("Enter a valid email address"),
    password: Yup.string().required("Enter Valid password"),
  });

  const [showPass, setShowPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userDetails'))
    if (user && user?._id) {
      navigation('/projects')
    }
  }, [])

  const handleClickShowPassword = () => {
    setShowPassword((showPass) => !showPass);
    setShowPass(!showPass);
  };

  const handleLoginPage = async (values) => {
    try {
      const response = await login({ ...values })
      if (response && response.data) {
        localStorage.setItem("userDetails", JSON.stringify(response?.data));
        localStorage.setItem("collection_token", response?.data?.accessToken)
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '')
        userDetails?.isAdmin ? navigation("/projects") : navigation("/testimonials");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true)
    }
  };

  return (
    <>
      <div className="flex h-[100vh] ">
        <div className="hidden sm:block sm:w-[50vw] h-[100vh] bg-[#34d399] m " sx={{ boxShadow: "0 0 40px 0 rgba(0,0,0,.15)" }} m>
          <div className="flex justify-center items-center no-wrap  h-[100%]">
            <div className="flex flex-col justify-evenly ">
              <img src={Logo} className="m-auto h-[80px] " />
              <img src={SigninImg} className="w-[35vw]" />
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:w-[50vw] h-[100vh] items-center sm:h-full my-auto " >
          <div className="md:w-[80%] lg:w-[70%] xl:w-[50%] text-center   ">

            <h1 className="text-[40px] font-bold">
              Sign in
            </h1>
            <p className="font-medium text-[18px] lg:text-[20px] xl:text-[24px] text-[#3d3d3d] mb-6">
              Enter Your Username and password to access.
            </p>
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  validateOnChange={true}
                  validateOnBlur={false}
                  onSubmit={(values) => {
                    values = { ...values, email: values?.email?.trim() };
                    handleLoginPage(values);
                  }}
                >
                  {({
                    errors,
                    values,
                    touched,
                    handleChange,

                  }) => (
                    <Form>
                      <Box>
                        <CardContent
                          sx={{
                            pt: 5,
                          }}
                        >
                          <Grid container rowSpacing={5} sx={{ px: 0 }}>
                            <Grid item xs={12} sm={12} md={12}>
                              <div className="w-[300px] sm:w-full relative mx-auto custom_textfield">

                                <TextField
                                  variant="outlined"
                                  placeholder="Input Your User Id or Email"
                                  type="text"
                                  name="email"
                                  className="sm:w-full"
                                  value={values?.email}
                                  helperText={touched?.email ? errors?.email : ""}
                                  error={touched?.email ? errors?.email : ""}
                                  touched={touched?.email}
                                  InputProps={{
                                    sx: {
                                      paddingLeft: 8,
                                      borderRadius: "10px",
                                      paddingY: "6px",
                                      paddingRight: "8px",
                                      // marginLeft: '-10px',
                                    },
                                  }}
                                  onChange={handleChange("email")}
                                />
                                <Box className="px-4 py-2 my-2 mr-4 border-x border-[#2b91dc] absolute top-2 left-[17px] sm:left-[0px]">
                                  <LocalPostOfficeIcon sx={{ color: blue[700] }} />
                                </Box>
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <div className="w-[300px] sm:w-full relative mx-auto custom_textfield">
                                <TextField
                                  variant="outlined"
                                  placeholder="Input Your password"
                                  type={showPass ? "text" : "password"}
                                  name="password"
                                  className="sm:w-full"
                                  helperText={
                                    touched?.password ? errors?.password : ""
                                  }
                                  error={touched?.password ? errors?.password : ""}
                                  touched={touched?.password}
                                  value={values?.password}
                                  onChange={handleChange("password")}
                                  InputProps={{
                                    sx: {
                                      paddingLeft: 8,
                                      borderRadius: "10px",
                                      paddingY: "6px",
                                      // marginLeft: '-10px',
                                    },

                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          edge="end"
                                          className=" absolute right-6"
                                        >
                                          {showPassword ? (
                                            <Visibility />
                                          ) : (
                                            <VisibilityOff />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <Box className="px-4 py-2 my-2 mr-4 border-x border-[#2b91dc]  absolute top-2 left-[17px] sm:left-[0px]">
                                  <LockIcon sx={{ color: blue[700] }} />
                                </Box>

                              </div>
                              <div className="flex justify-between pt-6 mx-auto w-[300px]  sm:w-full">
                                <div className="text-[13px]">
                                  <label className="text-center">
                                    <input type="checkbox" />
                                    {" "}Remember me
                                  </label>
                                </div>
                                <Typography className="text-[13px]">Forgot Password?</Typography>
                              </div>
                            </Grid>


                            <Grid item xs={12} sm={12} md={12}  >
                              <Button
                                variant="contained"
                                className="bg-[#34d399] text-[24px]  rounded-xl"
                                type="submit"
                                sx={{
                                  p: 1,
                                  width: 300,
                                  fontSize: "16px",
                                  bgcolor: "blue",
                                  fontWeight: "bold",
                                  boxShadow: "0 0 40px 0 rgba(0,0,0,.15)"
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                  }}
                                >
                                  <Box>Log in</Box>
                                </Box>
                              </Button>
                            </Grid>

                          </Grid>
                        </CardContent>
                      </Box>
                    </Form>
                  )}
                </Formik>
                <AlertMessage
                  text="Invalid credentials"
                  status="error"
                  isActive={error}
                  setActive={setError}
                />
              </Box>
            </div>

          </div>
        </div>

      </div >
    </>
  );
}
