import { TextFieldProps } from "@mui/material/TextField";
import {Input} from "../Input";
import * as Formik from "formik";
import {useCallback} from "react";

interface formikProps {
    handleChange: Formik.FormikHandlers["handleChange"],
    handleBlur: Formik.FormikHandlers["handleBlur"],
    errors: Formik.FormikErrors<Record<string, string>>,
    values: Formik.FormikValues,
}

export default function InputFormik(props: TextFieldProps & { name: string } & { formik: formikProps }) {
    const { formik, name, ...other } = props;

    return (
        <Input
            name={name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors[name]}
            value={formik.values[name]}
            {...other}
        />
    );
}
