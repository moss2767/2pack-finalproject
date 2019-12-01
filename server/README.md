# Heroku
Push to Heroku
```
git subtree push --prefix server heroku master
```

Enable session affinity after publishing
```
heroku features:enable http-session-affinity
```

Have to set the .env variables as well
https://devcenter.heroku.com/articles/config-vars
