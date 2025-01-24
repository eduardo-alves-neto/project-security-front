import { PropsWithChildren } from "react";

interface IForm extends PropsWithChildren {}

export const Form = ({ children }: IForm) => {
  return <form></form>;
};
