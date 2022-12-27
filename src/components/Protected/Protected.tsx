import {PropsWithChildren} from "react";
import {UserResponse} from "#app/entities/userEntities";


export default function Protected({
                                    user,
                                    children,
                                    hide = false
                                  }: PropsWithChildren<{ user: UserResponse, hide?: boolean }>) {
  if ((!user?.email && !hide) || user && hide) {
    return null
  }

  return (
    <>
      {children}
    </>
  );
}
