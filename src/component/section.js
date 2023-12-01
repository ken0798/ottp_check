import React from 'react'
import {styled} from 'styled-components'

function Features() {
  return (
    <Container>
      <div className='title'>
        <h1>Trending</h1>
        <div className='tab'>
          <span>All</span>
          <span>Week</span>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.section`
    padding: 0 calc(3.5vw + 5px);
    .title{
      display: flex;
      justify-content:space-between;
      align-items: center;
    }
    .tab{
      background-color: white;
      min-width: 400px;
      min-height: 70px;
      border-radius: 40px;
      color: black;
      display: flex;
      justify-content: space-between;
      padding: 4px;
       & > span{
          flex-basis: 50%;
          align-self: stretch;
          text-align: center;
          padding-block:20px ;
          &:first-of-type{
            color: white;
            border-radius: 40px;
            background-color: orangered;
          }
       }
    }
`

export default Features