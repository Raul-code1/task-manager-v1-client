import { Link } from "react-router-dom";
import styled from "styled-components";

import errorImage from "../assets/404 Error.png";

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="error-img-container">
        <img src={errorImage} alt="404 Not found" className="img" />
      </div>
      <div>
        <h1>Ops!</h1>
        <h2>Something went wrong</h2>
        <Link to='/register' className="btn error-page-btn ">Back</Link>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
 
  .error-img-container {
    width: 90%;
  }

  div{
    h1,h2{
      color: var(--gray-700);
    }
  }
  
  .error-page-btn{
    padding: .3125rem 1.375rem;
  }

  @media ( min-width:767px)  {
    .error-img-container{
      width: 60%;
    }

    div{
      h1,h2{
        font-size: 2rem;
      }
    }


  }

  @media  ( min-width:1100px ) {
    .error-img-container{
      width: 28%;
    }
  }

`;
