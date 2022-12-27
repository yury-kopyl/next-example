import Link from "next/link";
import {AppBar, Box, Button, Link as MuiLink, Toolbar} from "@mui/material";
import {Dispatch} from "redux";
import {PropsWithChildren} from "react";
import {connect} from "react-redux";
import Protected from "#components/Protected/Protected";
import {UserResponse} from "#app/entities/userEntities";
import {authActions} from "#store/actions/authActions";


const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function Layout({user, children, actions}: PropsWithChildren<{ user: UserResponse, actions: Record<string, any> }>) {
  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
      >
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Box sx={{flex: 1}}/>

          <MuiLink
            color="inherit"
            component={Link}
            href="/"
            sx={{fontSize: 24}}
            underline="none"
            variant="h6"
          >
            React-example
          </MuiLink>

          <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end'
          }}>
            <Protected user={user}>
              <MuiLink
                color="inherit"
                component={Link}
                href="/coins"
                sx={rightLink}
                underline="none"
                variant="h6"
              >
                Coins
              </MuiLink>

              <MuiLink
                onClick={() => actions.signOut()}
                href="javascript:void(0)"
                sx={{
                  ...rightLink,
                  color: 'secondary.main'
                }}
                underline="none"
                variant="h6"
              >
                Sign out
              </MuiLink>
            </Protected>

            <Protected
              hide
              user={user}
            >
              <MuiLink
                color="inherit"
                component={Link}
                href="/signin"
                sx={rightLink}
                underline="none"
                variant="h6"
              >
                Sign In
              </MuiLink>

              <MuiLink
                component={Link}
                href="/signup"
                sx={{
                  ...rightLink,
                  color: 'secondary.main'
                }}
                underline="none"
                variant="h6"
              >
                Sign Up
              </MuiLink>
            </Protected>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar/>

      {children}
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    signOut: () => dispatch(authActions.signOut()),
  }
});

export const PublicLayout = connect(null, mapDispatchToProps)(Layout);
