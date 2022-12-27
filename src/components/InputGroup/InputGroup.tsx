import {Box} from "@mui/material";
import {PropsWithChildren} from "react";


export default function InputGroup({children, perRow = 1}: PropsWithChildren<{ perRow?: 1 | 2 | 3 }>) {
  return (
    <Box
      display="flex"
      sx={{
        flexWrap: {
          md: 'nowrap',
          xs: 'wrap',
        },
        '& > :not(style)': {
          m: 1,
          flexBasis: {
            md: 100 / perRow + '%',
            xs: '100%',
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
