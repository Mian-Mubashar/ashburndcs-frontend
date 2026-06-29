import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts";
import logo from "images/logo.svg";
import { useNavigate } from "react-router-dom";

export const AuthContainer = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;

export const AuthContent = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;

export const AuthMain = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;

export const AuthHeading = tw.h1`text-2xl xl:text-3xl font-extrabold text-center`;

export const AuthForm = tw.form`mx-auto max-w-xs mt-8`;

export const AuthInput = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500 focus:bg-white mt-5 first:mt-0`;

export const AuthButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  background: linear-gradient(90deg, #6415ff 0%, #430ce5 100%);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(100, 21, 255, 0.35);
  }

  &:disabled {
    ${tw`opacity-50 cursor-not-allowed`}
  }
`;

export const AuthLink = tw.button`text-primary-500 border-b border-primary-300 border-dotted hover:text-primary-700`;

export const AuthMessage = styled.div`
  ${tw`mt-6 p-4 rounded-lg text-sm text-center border`}
  ${(props) =>
    props.type === "success"
      ? `background: #f0fdf4; color: #166534; border-color: #bbf7d0;`
      : `background: #eff6ff; color: #1e40af; border-color: #bfdbfe;`}
`;

export const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;

export const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export function AuthPageLayout({
  illustrationSrc,
  logoWidth,
  heading,
  children,
  footer,
}) {
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <AuthContent>
        <AuthMain>
          <div tw="cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="ADCS"
              style={{ height: "3rem", width: logoWidth || "auto", margin: "0 auto" }}
            />
          </div>
          <div tw="mt-12 flex flex-col items-center">
            <AuthHeading>{heading}</AuthHeading>
            {children}
            {footer}
          </div>
        </AuthMain>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationSrc} />
        </IllustrationContainer>
      </AuthContent>
    </AuthContainer>
  );
}
