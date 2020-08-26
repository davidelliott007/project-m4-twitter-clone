const data = require("../data");

// HARDCODED CURRENT USER.
const CURRENT_USER_HANDLE = "treasurymog";

const MAX_DELAY = 2000;
const FAILURE_ODDS = 0.05;
// const FAILURE_ODDS = 1;

// Our server is very lean and quick, given that it doens't actually connect
// to a database or deal with any sort of scale!
// We want to provide a more realistic experience, so we'll do 2 things for
// all responses:
// - Add an arbitrary delay of 0-2 seconds
// - Add a 5% chance of a 500 error
const simulateProblems = (res, data) => {
  const delay = Math.random() * MAX_DELAY;

  setTimeout(() => {
    const shouldError = Math.random() <= FAILURE_ODDS;

    if (shouldError) {
      res.sendStatus(500);
      return;
    }

    res.json(data);
  }, delay);
};

const getUser = (handle) => {
  return data.users[handle.toLowerCase()];
};
const getUserProfile = (handle) => {
  const user = getUser(handle);

  if (!user) {
    throw new Error("user-not-found");
  }

  const currentUser = data.users[CURRENT_USER_HANDLE];

  const mutableUser = { ...user };

  delete mutableUser.followingIds;
  delete mutableUser.followerIds;
  delete mutableUser.likeIds;

  mutableUser.numFollowing = user.followingIds.length;
  mutableUser.numFollowers = user.followerIds.length;
  mutableUser.numLikes = user.likeIds.length;
  mutableUser.isFollowingYou = user.followingIds.includes(currentUser.handle);
  mutableUser.isBeingFollowedByYou = currentUser.followingIds.includes(
    user.handle
  );

  return mutableUser;
};

const resolveRetweet = (tweet) => {
  if (!tweet.retweetOf) {
    return tweet;
  }

  const originalTweet = data.tweets[tweet.retweetOf];

  return {
    ...originalTweet,
    id: tweet.id,
    retweetFrom: getUserProfile(tweet.authorHandle),
    sortedTimestamp: tweet.timestamp,
    likedBy: tweet.likedBy,
    retweetedBy: tweet.retweetedBy,
  };
};

const denormalizeTweet = (tweet) => {
  const tweetCopy = { ...tweet };

  console.log("1==========++++++____---__+");

  console.log(CURRENT_USER_HANDLE);
  console.log(tweetCopy);
  console.log(tweet);
  console.log("2==========++++++____---__+");

  delete tweetCopy.authorHandle;

  tweetCopy.author = getUserProfile(tweet.authorHandle);

  delete tweetCopy.likedBy;
  delete tweetCopy.retweetedBy;
  console.log("3==========++++++____---__+");

  console.log(CURRENT_USER_HANDLE);
  console.log(tweetCopy);
  console.log(tweet);
  console.log("4==========++++++____---__+");

  tweetCopy.isLiked = tweet.likedBy.includes(CURRENT_USER_HANDLE);
  tweetCopy.isRetweeted = tweet.retweetedBy.includes(CURRENT_USER_HANDLE);
  tweetCopy.numLikes = tweet.likedBy.length;
  tweetCopy.numRetweets = tweet.retweetedBy.length;

  return tweetCopy;
};

const getTweetsFromUser = (userId) => {
  console.log("1iiiiiiii");

  console.log("getTweetsFromUser");
  console.log(Object.values(data.tweets));
  let debug_value = Object.values(data.tweets).filter(
    (tweet) => tweet.authorHandle.toLowerCase() === userId.toLowerCase()
  );
  console.log("2iiiiiiii");

  console.log(debug_value);
  console.log("2iiiiiiii");

  return Object.values(data.tweets)
    .filter(
      (tweet) => tweet.authorHandle.toLowerCase() === userId.toLowerCase()
    )
    .map(resolveRetweet)
    .map(denormalizeTweet);
};

const duplicateTweetReducer = (acc, tweet, index, allTweets) => {
  // If the user is following Profile A and Profile B, and Profile B
  // retweets the tweet of Profile A, we only want to show whichever
  // copy is newest, not both.
  for (let i = 0; i < index; i++) {
    let iteratedTweet = allTweets[i];

    if (
      iteratedTweet.id === tweet.retweetOf ||
      tweet.id === iteratedTweet.retweetOf
    ) {
      return acc;
    }
  }

  return [...acc, tweet];
};

const getTweetsForUser = (userId) => {
  const user = data.users[userId];

  return Object.values(data.tweets)
    .filter(
      (tweet) =>
        user.followingIds.includes(tweet.authorHandle.toLowerCase()) ||
        tweet.authorHandle.toLowerCase() === CURRENT_USER_HANDLE.toLowerCase()
    )
    .reduce(duplicateTweetReducer, [])
    .map(resolveRetweet)
    .map(denormalizeTweet);
};

module.exports = {
  CURRENT_USER_HANDLE,
  simulateProblems,
  getUser,
  getUserProfile,
  resolveRetweet,
  denormalizeTweet,
  getTweetsFromUser,
  getTweetsForUser,
};
