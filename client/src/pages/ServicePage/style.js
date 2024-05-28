import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 70%;
  padding-bottom: 100px;
  height: 100%;
`;

export const Header = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  color: #e74c3c;
  text-align: center; /* Centers the header text */
  position: relative;
  padding-left: 25px;
  padding-top: 40px;
  &:before {
    content: "⭐";
    position: absolute;
    left: calc(20%); /* Adjust the position of the star */
    transform: translateX(-34%);
    font-size: 24px;
    bottom: -0.5px;
  }
`;

export const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
`;

export const Question = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &:before {
    content: "🤔";
    margin-right: 10px;
  }
`;

export const Highlight = styled.span`
  font-weight: bold;
  color: #e74c3c;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding-left: 0;
  color: #555;
  font-size: 18px;
  line-height: 1.8;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  position: relative;
  padding-left: 25px;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #e74c3c;
    font-size: 24px;
    line-height: 18px;
  }
`;

export const ImageGallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap; /* Allows wrapping if there are many images */
`;

export const Image = styled.img`
  width: 70%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
