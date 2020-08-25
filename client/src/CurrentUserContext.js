import React, { createContext } from "react";
export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  let profileObject;
  let maxCharCount = 280;

  const getMyProfilePromise = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/me/profile";
      fetch(apiUrl)
        .then((response) => {
          if (response.status === 500) {
            console.log("error 500 ");
            resolve("error 500");
          } else {
            let data = response.json();
            console.log("getMyProfilePromise returned this is your data", data);
            profileObject = data;

            resolve(data);
          }
        })
        .catch((error) => {
          console.log("erorrrrrr");
          console.log(error.status);

          resolve({ error });
        });
    });
    return myPromise;
  };

  const getMeowByIDPromise = (itemId) => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:3000/api/tweet/" + itemId;
      fetch(apiUrl)
        .then((response) => {
          if (response.status === 500) {
            console.log("error 500 ");
            resolve("error 500");
          } else {
            let data = response.json();
            console.log("getMeowByIDPromise returned this is your data", data);
            resolve(data);
          }
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

          let sorted_tweets = Object.values(data.tweetsById).sort((a, b) =>
            a.timestamp > b.timestamp ? -1 : b.timestamp > a.timestamp ? 1 : 0
          );
          console.log("sorted_tweets ", sorted_tweets);
          sorted_tweets = sorted_tweets.map((element, i) => {
            let test_obj = { isHighlighted: false };
            return { ...element, ...test_obj };
          });

          data.tweetsById = {};
          data.tweetsById = sorted_tweets;

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
        .then((response) => {
          if (response.status === 500) {
            console.log("error 500 ");
            resolve("error 500");
          } else {
            let data = response.json();
            console.log(
              "getProfileByHandlePromise returned this is your data",
              data
            );
            resolve(data);
          }
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

  const putRetweetByID = (tweetId, isRetweeted) => {
    let myPromise = new Promise((resolve, reject) => {
      const likedata = { retweet: !isRetweeted };
      const apiUrl = "http://localhost:3000/api/tweet/" + tweetId + "/retweet";
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

  const postTweet = (postText, lastTweet, profileData) => {
    let myPromise = new Promise((resolve, reject) => {
      const statusText = { status: postText };
      const apiUrl = "http://localhost:3000/api/tweet/";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusText),
      })
        .then((response) => response.json())
        .then((data) => {
          //let getFeedByHandlePromise

          // console.log("------------------");

          // console.log("profileData");

          // console.log(profileData);

          // let feed = getFeedByHandlePromise(profileData.profile.handle);
          // console.log(feed);

          // var new_tweet = lastTweet;

          // new_tweet.numLikes = 0;
          // new_tweet.numRetweets = 0;
          // new_tweet.retweetFrom = {};
          // new_tweet.status = data.tweet.status;
          // new_tweet.id = data.tweet.id;
          // new_tweet.timestamp = data.tweet.timestamp;
          // new_tweet.media = data.tweet.media;

          // console.log("data");

          // console.log(data);
          // console.log("------------------");

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
        putRetweetByID,
        pullUserAndReturn,
        pullUser,
        postTweet,
        maxCharCount,
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
