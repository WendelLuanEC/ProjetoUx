import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Boxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

export const BoxItem = styled.div`
  width: 25vw;
  height: 200px;
  margin: 0 30px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 10px;

  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
    margin-top: 15px;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid #333;
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
