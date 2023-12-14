import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

export const Sidebar = styled.div`
  background-color: #eee;
  width: 20vw;
  height: 100vh;
  padding: 20px;
`;

export const HeaderSidebar = styled.div`
  height: 20vh;

  h2 {
    color: #333;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

export const SidebarMenu = styled.div`
  height: 65vh;

  ul {
    list-style: none;

    li {
      border-bottom: 1px solid #aaa;
      line-height: 3.5;
      font-size: 1.1rem;
      cursor: pointer;

      &:hover {
        border-bottom: 1px solid #222;
      }
    }
  }
`;

export const FooterSidebar = styled.div`
  height: 15vh;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  width: 80vw;
  background-color: #fff;
  min-height: 100vh;
  overflow-y: auto;
`;
