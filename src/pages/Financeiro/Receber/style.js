import styled from "styled-components";

export const Container = styled.div`
`;

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 250px;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
        border: none;
        background: transparent;
        font-weight: bold;
    }

`

export const MaterialForm = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;

export const ModalBotao = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;
`

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.finalizar ? 'green' : 'var(--primary-bg-color)'};
  margin: 10px;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonClose = styled.button`
  background-color: var(--home-color);
  margin: 10px;
  color: var(--gray-dark);
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const DeviderHorizontal = styled.div`
    height: 1px;
    width: 100%;
    background-color: var(--border-color);
`

// Tabela
export const StyledTable = styled.table`
  width: 100%;
  background-color: #FFF;
  border-radius: 8px;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.1);
  padding: 12px 4px;
  display: flex;
  flex-direction: column;
`;

export const FilterTable = styled.input`
  align-self: flex-end;
  margin-right: 16px;
  border-radius: 4px;
  height: 32px;
  width: 20dvw;
  border:1px solid rgba(0,0,0,0.4);
  padding: 0 10px;
`

export const FormGroup = styled.div`
  margin: 4px 0px;
  display: flex;
  flex-direction: column;
  & label {
    color: #666;
    font-size: 0.9rem;
  }
`

export const Expand = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ChartContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ChartWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
`;

export const SelectWrapper = styled.div`
    width: 20%;
`;

export const CheckboxGroup = styled.div`
    display: flex;
    gap: 8px;
`;