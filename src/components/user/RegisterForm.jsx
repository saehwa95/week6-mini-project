import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wrapper from "../../elements/Wrapper";
import LgPrimaryBtn from "../../elements/LgPrimaryBtn";
import SmSecondaryBtn from "../../elements/SmSecondaryBtn";
import useValidation from "../../hooks/useValidation";
import { useDispatch, useSelector } from "react-redux";
import { __postDupEmail, __postRegister } from "../../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, emailCheck, setEmail] = useValidation("email");
  const [nickname, nicknameCheck, setNickname] = useValidation("nickname");
  const [password, passwordCheck, setPassword] = useValidation("password");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignup = useSelector((state) => state.userSlice.isSignup);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__postRegister({ email, nickname, password, confirmPassword }));
  };

  const dupEmail = () => {
    dispatch(__postDupEmail({ email }));
  };

  useEffect(() => {
    if (!isSignup) return;
    if (isSignup) {
      alert("회원가입 완료");
      navigate("/login");
    }
  }, [isSignup]);

  return (
    <Wrapper>
      <form onSubmit={registerSubmitHandler}>
        <div>
          <label>
            <span>이메일</span>
            <div>
              <StInput
                type="text"
                placeholder="이메일을 입력해주세요."
                name="email"
                value={email}
                onChange={setEmail}
                required
              />
              <SmSecondaryBtn onClick={dupEmail}>중복확인</SmSecondaryBtn>
            </div>
          </label>
        </div>
        <div>
          <label>
            <span>닉네임</span>
            <div>
              <StInput
                type="text"
                placeholder="닉네임은 영문과 숫자를 혼합하여 작성해주세요."
                name="nickname "
                value={nickname}
                onChange={setNickname}
              />
            </div>
          </label>
        </div>
        <div>
          <label>
            <span>패스워드</span>
            <div>
              <StInput
                type="password"
                placeholder="비밀번호는 4글자 이상으로 작성해주세요."
                name="password"
                value={password}
                onChange={setPassword}
              />
            </div>
          </label>
        </div>
        <div>
          <label>
            <span>패스워드 확인</span>
            <div>
              <StInput
                type="password"
                placeholder="위에서 작성한 비밀번호를 한 번 더 작성해주세요."
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
        <LgPrimaryBtn
          disabled={
            !emailCheck ||
            !nicknameCheck ||
            !passwordCheck ||
            password !== confirmPassword
          }
        >
          회원가입 완료!
        </LgPrimaryBtn>
      </form>
    </Wrapper>
  );
};

export default RegisterForm;

const StInput = styled.input`
  width: 294px;
  height: 55px;
  border-radius: 5px;
  border: 1px solid #cecece;
  margin: 10px 10px 20px 0;
`;
