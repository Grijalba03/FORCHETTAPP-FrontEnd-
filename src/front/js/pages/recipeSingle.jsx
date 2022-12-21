import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recipes.css";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PocketShareButton,
  PocketIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

export const Recipesingle = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [single, setSingle] = useState("");
  const [userInfo, setuserInfo] = useState([]);

  useEffect(() => {
    async function fetchsingleRecipe() {
      let response = await actions.fetchGenerico(`/recipes/${params.theid}`);
      if (response.status == 200) {
        response = await response.json();
        setSingle(response);
        console.log("ressss", response);
      } else {
        response = await response.json();
        console.log(response);
      }
    }
    fetchsingleRecipe();

    async function fetchUserInfo() {
      let userInfo = await actions.fetchProtegido(`/profile/` + store.username);
      if (userInfo.status == 200) {
        userInfo = await userInfo.json();
        console.log("prueba", userInfo);
        setuserInfo(userInfo);
        store.userDetails = userInfo;

        return userInfo;
      } else {
        userInfo = await userInfo.json();
        console.log("si funco", userInfo);
      }
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    document.title = single.title;
  }, [single.title]);

  return (
    <>
      <div className="container">
        {single ? (
          <div className="d-flex flex-row">
            <div className="d-flex flex-column mx-5">
              {" "}
              {/* Columna 1*/}
              {/* Título 1*/}
              <div>
                <Link to={`/categories/${single.category}`}>
                  <p className="btn btn-outline-info categoryname">
                    {single.category_name}
                  </p>
                </Link>
              </div>
              <div>
                <h1 className="recipetitle">{single.title}</h1>
              </div>
              <div>{single.rating}</div>
              <div className="d-flex flex-row justify-content-evenly">
                {/* Nutritional Facts 1*/}
                <div className="rounded facts d-flex flex-column p-3">
                  <h1>NURITIONAL FACTS</h1>
                  <div className="d-flex flex-row justify-content-between">
                    <p>PROTEIN</p>
                    <p>{single.protein}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>FAT</p>
                    <p>{single.fat}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>CARB</p>
                    <p>{single.carbs}</p>
                  </div>
                </div>

                {/* Nutritional Facts 1*/}
                <div className="rounded information d-flex flex-column p-3">
                  <h1>INFORMATION (?)</h1>
                  <div className="d-flex flex-row justify-content-between">
                    <p>SERVINGS</p>
                    <p>{single.servings}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>PREP</p>
                    <p>{single.prep}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>BAKE</p>
                    <p>{single.bake}</p>
                  </div>
                </div>
              </div>
              {/* Preparation 1*/}
              <div className="shadow p-3 mb-5 bg-white rounded my-5">
                <h1>PREPARATION</h1>
                <p>{single.preparation}</p>
              </div>
              <div className="shadow p-3 mb-5 bg-white rounded my-5">
                <h1>RELATED VIDEOS</h1>
                <div className="related1 rounded"></div>
                <div className="d-flex flex-row justify-content-evenly rounded">
                  <div className="related2 rounded my-4 first"></div>
                  <div className="related2 rounded my-4"></div>
                  <div className="related2 rounded my-4"></div>
                  <div className="related2 rounded my-4 last"></div>
                </div>
              </div>
              <div className="shadow p-3 mb-5 bg-white rounded my-3">
                <h1>REVIEW {single.title}</h1>
                <div>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <div className="write rounded my-3">
                  <p className="mx-2">Write your experience</p>
                </div>
                <div className="row align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-info categoryname submit my-2"
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <p>
                    By submitting this review, you agree to accept our Privacy
                    Policy and our Terms & Conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna 2*/}
            <div className="d-flex flex-column mx-5">
              {/* Recipe Image*/}
              <div className="container spacing">
                <div>
                  <div className="d-flex mt-3 mb-3">
                    <img
                      src={single.image}
                      className="img-fluid card-img-top rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column">
                {/* Username box*/}
                <div className="d-flex flex-column">
                  {store.username ? ( // User Account
                    <div className="btn btn-outline-info usernamebox rounded my-3 d-flex flex-row justify-content-middle">
                      <div className="usercircle p-5 rounded-circle">
                        <img src={userInfo.image} />
                      </div>
                      <div className="usernameinfo">
                        <p>
                          {userInfo.username}
                          <br></br>
                          {userInfo.dietaryPreferences}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {/* Favorites box*/}
                <div className="d-flex flex-column">
                  {store.username ? ( // User Account
                    <div className="d-flex flex-column">
                      <div
                        className="btn btn-outline-info my-2 favorite"
                        onClick={(e) => {
                          actions.addFav(
                            "/user/favorites",
                            {
                              recipe_id: single.id,
                              // user_id: user.id
                            },
                            "POST"
                          );
                        }}
                      >
                        FAVORITE
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column">
                {/* Social media share box*/}
                <h2>SHARE</h2>
                {/* <div className="btn btn-outline-info my-2 favorite">SHARE</div> */}
                <FacebookShareButton
                  url={window.location.href}
                  quote={document.title}
                  hashtag={"#Forchett.app"}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <PinterestShareButton
                  url={window.location.href}
                  media={document.title}
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <RedditShareButton
                  url={window.location.href}
                  title={document.title}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <TelegramShareButton
                  url={window.location.href}
                  title={document.title}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TumblrShareButton
                  url={window.location.href}
                  title={document.title}
                >
                  <TumblrIcon size={32} round />
                </TumblrShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={document.title}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  title={document.title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <PocketShareButton
                  url={window.location.href}
                  title={"Next Share"}
                >
                  <PocketIcon size={32} round />
                </PocketShareButton>
              </div>
              <EmailShareButton
                url={window.location.href}
                subject={"Recipe from Forchett.App"}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              {/* Ingredients box*/}
              <div className="shadow p-3 mb-5 bg-white rounded my-5 sidebox">
                <h1>Ingredients List</h1>
                <p>{single.ingredients}</p>
              </div>

              {/* Free of box*/}
              <div className="shadow p-3 mb-5 bg-white rounded my-5 sidebox">
                <h1>FREE OF</h1>
                <p>{single.free_of}</p>
              </div>

              {/* Adds box*/}
              <div className="shadow p-3 mb-5 bg-white rounded my-5 sidebox">
                <h1 className="my-3">PROMOTED</h1>
                <div className="rounded promoted my-3"></div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center">No recipes available</h1>
        )}

        <div className="row justify-content-center">
          <div className="col"></div>
          <div className="col mx-auto align-items-middle">
            <Link to="/">
              {" "}
              <button
                className="btn btn-outline-info categoryname home my-5"
                role="button"
              >
                Return to Home
              </button>
            </Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};
