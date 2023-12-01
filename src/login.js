import styled from "styled-components";
import {useDispatch,useSelector} from 'react-redux'
import { setToken } from "./store/reducers/auth";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { SignInGoogle, LoginWithEmail, RegisterWithEmail } from "./services/auth";
import {useNavigate} from 'react-router-dom'
const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  align-self: center;
  color: hsla(0, 0%, 95.3%, 1);
  gap:8px;
  margin-block-end: 16px;
  button{
    font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 8.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0483ee;
  }
  }
  & > .google_btn{
    display: none;
  }
`
const Label = styled.label`
    font-size: 12px;
    color:${props => props.error ? 'red' : 'inherit'};
`

const Input = styled.input`
    height: 40px;
    border-radius: 8px;
    background-color: rgb(4 131 238 / 8%);
    color: #fff;
    padding: 16px;
    border: 1px solid #0483ee;
`

const GoogleButton = styled.div`
  background-color: #0063e5;
  display: flex;
  border-radius: 24px;
  align-items: center;
  max-width: 250px;
  width: 100% ;
  align-self: center;
  gap: 16px;
  cursor: pointer;
  & div{
    background-color: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    & svg{
      width: 50%;
      height: 50%;
      margin: auto;
    }
  }

`

const Login = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const nav= useNavigate()
  const dispatch = useDispatch()
  const viewLogin = useSelector(state => state.user?.viewLogin)
  async function dataSubmitLogin(data) {
    console.log(data);
    const { email, password } = data 
    try {
      const user = await LoginWithEmail({ email, password })
      console.log(user);
      setToken(user.accessToken)
      nav('/')
      
    } catch (error) {
      
    }
  }
  async function dataSubmitRegister(data) {
    console.log(data);
    const { email, password, cpassword } = data 
    if (cpassword !== password) {
      alert('Password must match')
      return
    }
    try {
      const user = await RegisterWithEmail({ email, password })
      console.log(user);
      setToken(user.accessToken)
      nav('/')
      
    } catch (error) {
      
    }
  }
  async function loginGoogle() {
    const { token } = await SignInGoogle()
    dispatch(setToken(token))
    console.log(token); 
  }
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
          {!viewLogin ? (
                        <Form onSubmit={handleSubmit(dataSubmitRegister)}>
                        <Label error={errors.email}>User Email</Label>
                        <Input
                          error={errors.email}
                          type="email"
                          {...register("email", {
                            required: { value: true, message: "email is required" },
                          })}
                        />
                        <Label error={errors.password}>Password</Label>
                        <Input
                          error={errors.password}
                          type="password"
                          {...register("password", {
                            required: { value: true, message: "password is required" },
                          })}
                        />
                        <Label error={errors.cpassword}>Confirm Password</Label>
                        <Input
                          error={errors.cpassword}
                          type="password"
                          {...register("cpassword", {
                            required: { value: true, message: "password is required" },
                          })}
                        />
                          <button type="submit">Register</button>
                          <span>OR</span>
                        <GoogleButton
                          onClick={loginGoogle}
                          >
                            <div>
                               <FcGoogle />
                            </div>
                            <span>Sign up with Google</span>
                        </GoogleButton>
                      </Form>
          ) : (
            <Form onSubmit={handleSubmit(dataSubmitLogin)}>
              <Label error={errors.email}>User Email</Label>
              <Input
                error={errors.email}
                type="email"
                {...register("email", {
                  required: { value: true, message: "email is required" },
                })}
              />
              <Label error={errors.password}>Password</Label>
              <Input
                error={errors.password}
                type="password"
                {...register("password", {
                  required: { value: true, message: "password is required" },
                })}
              />
                <button type="submit">Login</button>
                <span>OR</span>
              <GoogleButton
                onClick={loginGoogle}
                >
                  <div>
                     <FcGoogle />
                  </div>
                  <span>Sign in with Google</span>
              </GoogleButton>
            </Form>
          )}
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

export default Login;