import {PropsWithChildren} from "react";
import {Box, Container, Typography} from "@mui/material";
import {Paper} from "../Paper";

export default function From({title, children}: PropsWithChildren<{ title: string }>) {
  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{my: 2}}
      >
        <Paper padding>
          <Typography
            align="center"
            fontWeight={500}
            gutterBottom
            textTransform="uppercase"
            variant="h3"
          >
            {title}
          </Typography>

          {children}
        </Paper>
      </Container>
    </Box>
  );
}
