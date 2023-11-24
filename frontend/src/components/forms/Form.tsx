import { FormEvent } from "react";

interface Props {
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  LoginWith: () => JSX.Element;
}

export default function Form({
  onSubmit,
  LoginWith,
}: Props) {

  return (
    <form action="#" className="flex flex-col space-y-2" onSubmit={onSubmit}>
            <LoginWith/>
    </form>
  );
}
