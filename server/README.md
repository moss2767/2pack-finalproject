# Heroku
Push to Heroku
```
git subtree push --prefix server heroku master
```

Enable session affinity after publishing
```
heroku features:enable http-session-affinity
```