import styled from 'styled-components';
import 'normalize.css';

export const SharedCont = styled.div`
    margin-left: 450px;
    margin-top: 120px;
`;

export const AddContInput = styled.div`
    display: flex;
    align-items: center;
`;

export const AddInput = styled.input`
    width: 450px;
`;

export const TaskCont = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
`;

export const ButtonFilterCont = styled.div`
    display: flex;
    gap: 15px;
`;

export const ButtonFilter = styled.button`
    border-radius: 8px;
    &:hover {
        background-color: rgba(60, 185, 50, 1);
    }
`;

export const ListStyle = styled.ul`
    list-style: none;
    display: grid;
    gap 10px;
    padding-left: 0px;
`;

export const LiStyle = styled.li`
    width: 600px;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: rgba(239, 192, 246, 1);
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 20px;
`;

export const SpanStyle = styled.span`
    padding-left: 10px;
`;

export const InputSpanStyle = styled.input`
    width: 100%;
    max-width: 440px;
    margin-right: 5px;
`;

export const ButtonAdd = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 8px;
    margin-left: 5px;
    &:hover {
        background-color: rgba(60, 185, 50, 1);
    }
`;

export const ButtonEdit = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 8px;
    margin-right: 5px;
    margin-left: auto;
    &:hover {
        background-color: rgba(60, 185, 50, 1);
    }
`;

export const ButtonDelete = styled.button`
    width: 70px;
    height: 25px;
    border-radius: 8px;
    margin-right: 5px;
    &:hover {
        background-color: rgba(247, 25, 25, 1);
    }
`;

export const ButtonSave = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 8px;
    margin-right: 5px;
    margin-left: auto;
    &:hover {
        background-color: rgba(60, 185, 50, 1);
    }
`;

export const ButtonCancel = styled.button`
    width: 70px;
    height: 25px;
    border-radius: 8px;
    margin-right: 5px;
    &:hover {
        background-color: rgba(247, 25, 25, 1);
    }
`;

export const Error = styled.div`
    margin-left: 40px;
    color: rgba(247, 25, 25, 1);
`;
