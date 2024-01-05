import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/common/Spinner";

interface Config {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  required?: boolean;
  link?: boolean;
}

interface Props {
  config: Config[];
  isLoading: boolean;
  btnTxt: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  LoginWith: () => JSX.Element;
}

export default function Form({
  config,
  onChange,
  onSubmit,
  isLoading,
  btnTxt,
  LoginWith,
}: Props) {
  return (
    <form className="flex flex-col space-y-2" onSubmit={onSubmit}>
      <LoginWith />
      <div className="flex justify-center flex-col gap-2 items-center">
        {config.map((input, key) => (
          <>
          <Input
            className="bg-white text-gray-600 dark:bg-document_bg dark:text-gray-200 border-gray-600"
            key={key}
            name={input.labelId}
            placeholder={input.labelText}
            type={input.type}
            onChange={onChange}
            value={input.value}
            required={input.required}
          />
          </>
        ))}
        <div className="flex justify-center">
          <Button variant={"default"} type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={"default"} /> : `${btnTxt}`}
          </Button>
        </div>
      </div>
      {/* <Email /> */}
    </form>
  );
}
