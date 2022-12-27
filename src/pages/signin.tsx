import Head from "next/head";
import Link from "next/link";
import React, {ReactElement, useCallback} from "react";
import {Dispatch} from "redux";
import {Typography, Link as MuiLink, Box, FormGroup, Switch, FormControlLabel, Button} from "@mui/material";
import {connect} from "react-redux";
import {useFormik} from 'formik';
import InputFormik from "#components/InputFormik";
import InputGroup from "#components/InputGroup";
import useToggle from "#lib/hooks/useToggle";
import {Form} from "#components/Form";
import {NextPageWithLayout} from "#app/pages/_app";
import {PublicLayout} from "#app/layouts/publicLayout";
import {SignIn} from "#app/entities/auth";
import {authActions} from "#store/actions/authActions";
import {serverSideProtected} from "#lib/serverSideProtected";
import {signInSchema} from "#lib/yupSchemas";


const SignIn: NextPageWithLayout = ({actions}: any) => {
  const [isPassword, setIsPassword] = useToggle(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => actions.signIn(values),
    validationSchema: signInSchema,
  });

  const setAdminValues = useCallback(() => {
    formik.setValues({
      email: 'admin@localhost.com',
      password: 'admin',
    }).then(() => {
      formik.setTouched({
        email: true,
        password: true,
      });
    });
  }, []);

  return (
    <Form title="Sign In">
      <Head>
        <title>Sign In</title>
        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <React.Fragment>
        <Typography
          align="center"
          mb={1}
          variant="body2"
        >
          <MuiLink
            color="text.primary"
            component={Link}
            href="/signup"
            underline="always"
          >
            Create account
          </MuiLink>
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <InputGroup>
            <InputFormik
              formik={formik}
              label="E-mail"
              name="email"
              type="email"
            />
          </InputGroup>

          <InputGroup perRow={2}>
            <InputFormik
              formik={formik}
              label="Password"
              name="password"
              type={isPassword ? 'password' : 'text'}
            />

            <Button
              color="info"
              disableElevation
              onClick={setAdminValues}
              variant="contained"
            >
              Apply admin data
            </Button>
          </InputGroup>

          <InputGroup perRow={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch onChange={() => setIsPassword()}/>
                }
                label="Show password"
              />
            </FormGroup>

            <Button
              disableElevation
              disabled={formik.isSubmitting || !formik.isValid || Object.keys(formik.touched).length === 0}
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </InputGroup>
        </Box>
      </React.Fragment>
    </Form>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    signIn: (data: SignIn) => dispatch(authActions.signIn(data)),
  }
});

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout user={page.props.user}>
      {page}
    </PublicLayout>
  );
}

export const getServerSideProps = serverSideProtected('/coins', true);
export default connect(null, mapDispatchToProps)(SignIn);
