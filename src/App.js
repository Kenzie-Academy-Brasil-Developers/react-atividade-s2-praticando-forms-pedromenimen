import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches("^[A-Za-z\\s]+$", "Nome inválido"),
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Email inválido")
      .matches(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
        "Email inválido"
      ),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$",
        "Senha inválida"
      ),
    age: yup
      .string()
      .required("Idade obrigatória")
      .matches("^[0-9]+$", "Idade inválida"),
    phoneNumber: yup
      .string()
      .required("Número obrigatório")
      .matches(
        "(\\(?[0]?[1-9][0-9]\\)?)(\\.|\\-|\\s)?([9]{1})?[6-9][0-9]{3}(\\.|\\-|\\s)?[0-9]{4}",
        "Número inválido"
      ),
    confirmPassword: yup
      .string()
      .required("Senha obrigatória")
      .matches("", "As senhas são diferentes"),
    CPF: yup
      .string()
      .required("CPF obrigatório")
      .matches(
        "[0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\-]?[0-9]{2}",
        "CPF inválido"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const handleSubmitButton = (data) => console.log(data);

  const handleConfirmPassword = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  console.log(password);
  console.log(confirmPassword);

  return (
    <div className="App">
      <header className="App-header">
        <form
          className="formulario"
          onSubmit={handleSubmit(handleSubmitButton)}
        >
          <input placeholder="Nome" {...register("name")} />
          {errors.name?.message}
          <input placeholder="Email" {...register("email")} />
          {errors.email?.message}
          <input placeholder="CPF" maxLength="11" {...register("CPF")} />
          {errors.CPF?.message}
          <input placeholder="Idade" {...register("age")} />
          {errors.age?.message}
          <input
            placeholder="Telefone"
            maxLength="11"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber?.message}
          <div className="password">
            <div>
              <input
                {...register("password")}
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                id="pass"
                placeholder="Senha"
              />
              <div className="erro">{errors.password?.message}</div>
            </div>
            <div>
              <input
                type="password"
                onChange={(evt) => handleConfirmPassword(evt)}
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />
              <div className="erro">{errors.confirmPassword?.message}</div>
            </div>
          </div>
          <button type="submit">Enviar dados</button>
        </form>
      </header>
    </div>
  );
}

export default App;
