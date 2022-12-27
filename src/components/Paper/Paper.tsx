import {styled} from "@mui/material/styles";
import MuiPaper, { PaperProps } from "@mui/material/Paper";

interface ExtraPaperProps {
    background?: 'light' | 'main' | 'dark';
    padding?: boolean;
}

const PaperRoot = styled(MuiPaper, {
    shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding'
})<ExtraPaperProps>(({ theme, background = "light", padding }) => ({
    backgroundColor: theme.palette.secondary[background],
    ...(padding && {
        padding: theme.spacing(4),
    })
}));

export default function Paper(props: PaperProps & ExtraPaperProps) {
    const { background = "light", classes, className, padding = false, ...other } = props;

    return (
        <PaperRoot
            background={background}
            className={className}
            elevation={0}
            padding={padding}
            square
            {...other}
        />
    );
}
