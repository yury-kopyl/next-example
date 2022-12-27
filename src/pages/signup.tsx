import Head from "next/head";
import Link from "next/link";
import React, {ReactElement} from "react";
import {Dispatch} from "redux";
import {Typography, Link as MuiLink, Box, FormGroup, Switch, FormControlLabel, Button} from "@mui/material";
import {connect} from "react-redux";
import {useFormik} from 'formik';
import InputGroup from "#components/InputGroup";
import State, {selectors} from "#store/selectors";
import useToggle from "#lib/hooks/useToggle";
import {Form} from "#components/Form";
import {InputFormik} from "#components/InputFormik";
import {NextPageWithLayout} from "#app/pages/_app";
import {PublicLayout} from "#app/layouts/publicLayout";
import {SignUp} from "#app/entities/auth";
import {authActions} from "#store/actions/authActions";
import {serverSideProtected} from "#lib/serverSideProtected";
import {signUpSchema} from "#lib/yupSchemas";


const SignUp: NextPageWithLayout = ({actions}: any) => {
  const [isPassword, setIsPassword] = useToggle(true);
  const formik = useFormik({
    initialValues: {
      confirm: '',
      email: '',
      lastName: '',
      name: '',
      password: '',
    },
    onSubmit: (values) => actions.signUp(values),
    validationSchema: signUpSchema,
  });

  return (
    <Form title="Sign Up">
      <Head>
        <title>Sign Up</title>

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
            href="/signin"
            underline="always"
          >
            Already have an account?
          </MuiLink>
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <InputGroup perRow={2}>
            <InputFormik
              formik={formik}
              label="First name"
              name="name"
            />
            <InputFormik
              formik={formik}
              label="Last name"
              name="lastName"
            />
          </InputGroup>

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
            <InputFormik
              formik={formik}
              label="Confirm"
              name="confirm"
              type={isPassword ? 'password' : 'text'}
            />
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
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
          </InputGroup>
        </Box>
      </React.Fragment>
    </Form>
  );
}

const mapStateToProps = (state: State) => {
  return {
    user: selectors.user(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    signUp: (data: SignUp) => dispatch(authActions.signUp(data)),
  }
});

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout user={page.props.user}>
      {page}
    </PublicLayout>
  );
}

export const getServerSideProps = serverSideProtected('/coins', true);
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
