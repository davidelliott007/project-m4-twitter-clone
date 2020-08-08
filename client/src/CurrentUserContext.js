import React, { createContext, useState } from "react";
export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const getMyProfilePromise = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/me/profile";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("Promise returned this is your data", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  };

  const getMeowByIDPromise = (itemId) => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/tweet/" + itemId;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("getMeowByIDPromise returned this is your data", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  };

  const getFeedByHandlePromise = (feedhandle) => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/" + feedhandle + "/feed";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(
            "getFeedByHandlePromise returned this is your data",
            data
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  };

  const getProfileByHandlePromise = (handle) => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/" + handle + "/profile";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(
            "getProfileByHandlePromise returned this is your data",
            data
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  };
  const putLikeTweetByID = (tweetId, isLiked) => {
    let myPromise = new Promise((resolve, reject) => {
      const likedata = { like: !isLiked };
      const apiUrl = "http://localhost:3000/api/tweet/" + tweetId + "/like";
      fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likedata),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return myPromise;
  };

  const pullUser = () => {
    const apiUrl = "http://localhost:3000/api/me/profile";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.profile.handle);

        console.log("This is your data", data);
        return data.profile.handle;
      });
  };

  const pullUserAndReturn = () => {
    const apiUrl = "http://localhost:3000/api/me/profile";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.profile.handle;
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        getMyProfilePromise,
        getMeowByIDPromise,
        getFeedByHandlePromise,
        getProfileByHandlePromise,
        putLikeTweetByID,
        pullUserAndReturn,
        pullUser,
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
