import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, removeToken } from "./store/reducers/auth";
import { FaUserCircle } from "react-icons/fa";
import { googleSignOut } from "./services/auth";
import { useNavigate } from "react-router-dom";
import { getMovies, imgUrl } from "./services/movies";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
// import {
//   selectUserName,
//   selectUserPhoto,
//   setUserLoginDetails,
//   setSignOutState,
// } from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const [movieSearch, setMovieSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [viewMenu, setViewMenu] = useState(false);

  const searchMovies = async () => {
    const {
      data: { results },
    } = await getMovies(`/search/movie?query=${movieSearch}`);
    setSearchResults(results);
  };

  function toggleAuth() {
    dispatch(toggleLogin());
  }

  function logOut() {
    googleSignOut();
    dispatch(removeToken());
    nav("/auth");
  }

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!user?.token ? (
        !user?.viewLogin ? (
          <Login onClick={toggleAuth}>Login</Login>
        ) : (
          <Login onClick={toggleAuth}>Register</Login>
        )
      ) : (
        <>
          <NavMenu>
            <a href="/">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <SearchDiv>
              <input
                value={movieSearch}
                onChange={(e) => setMovieSearch(e.target.value)}
                type="text"
                placeholder="Search..."
              />
              <img
                onClick={() => {
                  searchMovies();
                }}
                src="/images/search-icon.svg"
                alt="SEARCH"
              />
            </SearchDiv>
            {searchResults.length > 0 && (
              <div
                style={{
                  position: "fixed",
                  zIndex: 2,
                  inset: 0,
                  background: "rgba(0,0,0,0.2)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchResults([]);
                  setMovieSearch("");
                }}
              >
                <ResultDiv>
                  {searchResults &&
                    searchResults.map((result, index) => (
                      <div
                        onClick={() => {
                          nav(`/details/${result.id}`);
                          setSearchResults([]);
                          setMovieSearch("");
                        }}
                      >
                        <img src={imgUrl + result?.poster_path} alt="" />
                        <div>
                          <h1>{result.title || result.original_title}</h1>
                          <p>
                            {result.overview.split(" ").slice(0, 25).join(" ")}
                            {result.overview.split(" ").length > 25
                              ? "..."
                              : ""}
                          </p>
                          <h1>
                            Year : {new Date(result.release_date).getFullYear()}
                          </h1>
                        </div>
                      </div>
                    ))}
                </ResultDiv>
              </div>
            )}
            <a href="/history">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHHISTORY</span>
            </a>
          </NavMenu>
          <CiMenuBurger
            onClick={() => {
              console.log("yes");
              setViewMenu(true);
            }}
            className="ham_icon"
          />

          <SignOut>
            {user.pic ? <UserImg src={""} alt={""} /> : <FaUserCircle />}
            <DropDown>
              <span onClick={logOut}>Sign out</span>
            </DropDown>
          </SignOut>
          {viewMenu ? (
            <MobileMenu
              onClick={(e) => {
                e.stopPropagation();
                setViewMenu(false);
              }}
            >
              <div>
                <a href="/">
                  <img src="/images/home-icon.svg" alt="HOME" />
                  <span>HOME</span>
                </a>
                <SearchDiv>
                  <input
                    value={movieSearch}
                    onChange={(e) => setMovieSearch(e.target.value)}
                    type="text"
                    placeholder="Search..."
                  />
                  <img
                    onClick={() => {
                      searchMovies();
                    }}
                    src="/images/search-icon.svg"
                    alt="SEARCH"
                  />
                </SearchDiv>
                {searchResults.length > 0 && (
                  <div
                    style={{
                      position: "fixed",
                      zIndex: 2,
                      inset: 0,
                      background: "rgba(0,0,0,0.2)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchResults([]);
                      setMovieSearch("");
                    }}
                  >
                    <ResultDiv>
                      {searchResults &&
                        searchResults.map((result, index) => (
                          <div
                            onClick={() => {
                              nav(`/details/${result.id}`);
                              setSearchResults([]);
                              setMovieSearch("");
                            }}
                          >
                            <img src={imgUrl + result?.poster_path} alt="" />
                            <div>
                              <h1>{result.title || result.original_title}</h1>
                              <p>
                                {result.overview
                                  .split(" ")
                                  .slice(0, 25)
                                  .join(" ")}
                                {result.overview.split(" ").length > 25
                                  ? "..."
                                  : ""}
                              </p>
                              <h1>
                                Year :{" "}
                                {new Date(result.release_date).getFullYear()}
                              </h1>
                            </div>
                          </div>
                        ))}
                    </ResultDiv>
                  </div>
                )}
                <a href="/history">
                  <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                  <span>WATCH HISTORY</span>
                </a>
                <div className="mobile_user">
                  {user.pic ? <UserImg src={""} alt={""} /> : <FaUserCircle />}

                  <span onClick={logOut}>Sign out</span>
                </div>
              </div>
            </MobileMenu>
          ) : null}
        </>
      )}
    </Nav>
  );
};

const MobileMenu = styled.nav`
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  z-index: 8;
  > div {
    padding: 8px;
    background-color: black;
    height: 100%;
    gap: 20px;
    flex-direction: column;
    display: flex;
    width: 350px;
    padding-top: 20px;
  }
  a {
    display: flex;
    gap: 8px;
    width: 100%;
    span {
      line-height: 20px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .mobile_user {
    span {
      margin-left: 16px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 8px 16px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 1px solid #f9f9f9;
      border-radius: 4px;
      transition: all 0.2s ease 0s;

      &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
      }
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  border: 1px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
  background-color: transparent;
  align-items: center;
  input {
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
    background-color: transparent;
    color: white;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const ResultDiv = styled.div`
  max-width: 500px;
  width: 100%;
  min-height: 100px;
  max-height: 250px;
  background-color: #090b13;
  border-radius: 10px;
  position: absolute;
  top: 85px;
  left: 175px;
  padding: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  div {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid white;
    display: flex;
    justify-content: space-between;
    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      border-bottom: none;
      h1 {
        font-size: 12px !important;
        letter-spacing: 0px !important;
      }
      p {
        letter-spacing: 0px !important;
        font-size: 8px !important;
        text-decoration: none !important;
      }
      & > h1:last-child {
        font-size: 8px !important;
      }
    }
    img {
      width: 50px;
      height: 60px;
    }
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  .ham_icon {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .ham_icon {
      display: none;
    }
  }
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
