import * as yup from "yup";

const rules = {
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    confirm: (refKey: string) => yup.string().oneOf([yup.ref(refKey), null], 'Passwords must match').required(),
}

export const signUpSchema = yup.object().shape({
    name: rules.name,
    lastName: rules.name,
    email: rules.email,
    password: rules.password,
    confirm: rules.confirm('password'),
});

export const signInSchema = yup.object().shape({
    email: rules.email,
    password: rules.password,
});
