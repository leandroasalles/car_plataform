import { Container } from "../../Components/Container";
import Logo from "../../assets/logo.svg";

export function Error() {
  return (
    <Container>
      <div className="flex justify-center items-center h-svh">
        <img src={Logo} alt="" />
      </div>
    </Container>
  );
}
