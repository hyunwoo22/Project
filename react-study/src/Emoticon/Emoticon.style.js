import styled, { css } from "styled-components";

export const InputDiv = styled.div`
  display: block;
  content: attrs(placeholder);
  color: #111;
  border: 1px solid #111;
  padding: 5px 10px;
  ::placeholder {
    color: #111;
  }
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #aaa;
  }
`;
export const Imgimg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const Wrap = styled.div`
  display: block;

  div {
    border: 1px solid #111;
    padding: 5px;

    :empty:before {
      content: attr(data-placeholder);
      color: #888;
      font-style: italic;
      cursor: text;
    }
    img {
      width: 24px;
      height: 24px;
      margin: 0 2px;
    }
  }
`;

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #111;
  margin-top: 10px;
`;

export const TopWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid #999;
`;

export const BottomWrap = styled.div`
  padding: 20px;
`;

export const BottomInnerWrap = styled.div``;

export const CategotyImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  :last-child {
    margin-right: 0px;
  }
`;

export const BigImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
  cursor: pointer;
  :last-child {
    margin-right: 0px;
  }
`;

export const Button = styled.button``;
