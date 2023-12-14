import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 50vw;
  height: 80vh;
  transform: translate(0%, 0%);
  z-index: 100;
  background-color: #fff;
  border-radius: 10px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 40px 20px;
  margin-bottom: 40px;

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

  select {
    padding: 10px;
    background-color: transparent;
    border: 1px solid #aaa;
    border-radius: 10px;
    font-size: 1.05rem;
    outline: transparent;
    cursor: pointer;
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
  background-color: #000;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;
