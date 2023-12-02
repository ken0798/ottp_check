import React from "react";
import { styled } from "styled-components";

function Chips({ data = [] }) {
  return (
    <div>
      <h3 style={{ marginBlock: "16px" }}>Genres</h3>
      <Wrapper>
        {data.map((e) => {
          return <span key={e?.id}>{e?.name}</span>;
        })}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  span {
    padding: 4px 8px;
    background-color: transparent;
    border: 1px solid orangered;
    border-radius: 8px;
  }
`;

export default Chips;
