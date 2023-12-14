import styled from "styled-components";

export const Container = styled.div`
  background-color: #eee;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 30px;
  width: 15vw;
  height: 120px;
  border: 1px solid #ddd;
  transition: 0.2s all;

  h3 {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #222;
    font-weight: 400;
    text-align: center;
  }

  &:hover {
    transform: scale(1.02);
    border: 1px solid #aaa;
    cursor: pointer;
  }

  @media (max-width: 599px) {
    width: 70vw;
    margin-bottom: 30px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    width: 50vw;
    margin-bottom: 30px;
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    width: 30vw;
    margin-bottom: 30px;
  }
`;

export const BackButton = styled.div`
  display: flex;
  width: 30vw;
  margin: 20px 0px;
  justify-content: flex-start;
  align-items: flex-start;

  .icon__back {
    transform: translateX(-15px);
  }

  @media (max-width: 599px) {
    width: 80vw;
    margin-bottom: 30px;
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    width: 50vw;
    margin-bottom: 30px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 40px 20px;

  @media (max-width: 599px) {
    width: 80vw;
    margin-bottom: 30px;
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    width: 50vw;
    margin-bottom: 30px;
  }
`;

export const FormTitle = styled.div`
  margin-bottom: 15px;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  span {
    font-size: 1.15rem;
    font-weight: 500;
    margin-bottom: 5px;
  }

  input {
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.05rem;
    outline: transparent;
  }
`;

export const ButtonSubmit = styled.div`
  color: #fff;
  width: 100px;
  display: flex;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;
