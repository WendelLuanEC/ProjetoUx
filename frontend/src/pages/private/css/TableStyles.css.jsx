import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 10px;
  margin: 0 20px 40px;

  tbody {
    overflow-x: auto;
  }

  .info {
    padding: 0 10px;
    margin-bottom: 20px;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      font-size: 1.05rem;
    }
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

export const TableTitle = styled.div`
  margin-bottom: 15px;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  min-width: 150px;
  text-align: center;

  button {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  min-width: 150px;
`;

export const Container = styled.div``;
