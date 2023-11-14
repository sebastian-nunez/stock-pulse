import GitHubStrategy from "passport-github2";

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
};

const verify = async (accessToken, refreshToken, profile, callback) => {
  const {
    _json: { id, login, avatar_url }
  } = profile;

  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken
  };

  try {
    // check if user exists
    const results = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [userData.username]
    );
    let user = results.rows[0];

    // if user doesn't exist, create one
    if (!user) {
      const results = await pool.query(
        `
          INSERT INTO users (githubid, username, avatarurl, accesstoken)
          VALUES($1, $2, $3, $4)
          RETURNING *
        `,
        [userData.githubId, userData.username, userData.avatarUrl, accessToken]
      );

      // set user to new user
      user = results.rows[0];
    }

    // return new user
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

export const GitHubStrategy = new GitHubStrategy(options, verify);
