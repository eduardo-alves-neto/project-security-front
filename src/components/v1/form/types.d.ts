import { PropsWithChildren } from "react";

type onSubmitType<T> = ({
  values,
}: {
  values: T;
}) => SubmitHandler<FieldValues>;

export interface IForm<T> extends PropsWithChildren {
  onHandleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: onSubmitType<T>;
  values: T;
  oldValues?: T;
  isLoading?: boolean;
}
