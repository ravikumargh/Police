'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Video = mongoose.model('Video'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  video;

/**
 * Video routes tests
 */
describe('Video Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new video
    user.save(function () {
      video = {
        title: 'Video Title',
        link: 'Video Link'
      };

      done();
    });
  });

  it('should be able to save an video if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new video
        agent.post('/api/videos')
          .send(video)
          .expect(200)
          .end(function (videoSaveErr, videoSaveRes) {
            // Handle video save error
            if (videoSaveErr) {
              return done(videoSaveErr);
            }

            // Get a list of videos
            agent.get('/api/videos')
              .end(function (videosGetErr, videosGetRes) {
                // Handle video save error
                if (videosGetErr) {
                  return done(videosGetErr);
                }

                // Get videos list
                var videos = videosGetRes.body;

                // Set assertions
                (videos[0].user._id).should.equal(userId);
                (videos[0].title).should.match('Video Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an video if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new video
        agent.post('/api/videos')
          .send(video)
          .expect(200)
          .end(function (videoSaveErr, videoSaveRes) {
            // Handle video save error
            if (videoSaveErr) {
              return done(videoSaveErr);
            }

            // Update video title
            video.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing video
            agent.put('/api/videos/' + videoSaveRes.body._id)
              .send(video)
              .expect(200)
              .end(function (videoUpdateErr, videoUpdateRes) {
                // Handle video update error
                if (videoUpdateErr) {
                  return done(videoUpdateErr);
                }

                // Set assertions
                (videoUpdateRes.body._id).should.equal(videoSaveRes.body._id);
                (videoUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an video if no title is provided', function (done) {
    // Invalidate title field
    video.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new video
        agent.post('/api/videos')
          .send(video)
          .expect(422)
          .end(function (videoSaveErr, videoSaveRes) {
            // Set message assertion
            (videoSaveRes.body.message).should.match('Title cannot be blank');

            // Handle video save error
            done(videoSaveErr);
          });
      });
  });

  it('should be able to delete an video if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new video
        agent.post('/api/videos')
          .send(video)
          .expect(200)
          .end(function (videoSaveErr, videoSaveRes) {
            // Handle video save error
            if (videoSaveErr) {
              return done(videoSaveErr);
            }

            // Delete an existing video
            agent.delete('/api/videos/' + videoSaveRes.body._id)
              .send(video)
              .expect(200)
              .end(function (videoDeleteErr, videoDeleteRes) {
                // Handle video error error
                if (videoDeleteErr) {
                  return done(videoDeleteErr);
                }

                // Set assertions
                (videoDeleteRes.body._id).should.equal(videoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single video if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new video model instance
    video.user = user;
    var videoObj = new Video(video);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new video
        agent.post('/api/videos')
          .send(video)
          .expect(200)
          .end(function (videoSaveErr, videoSaveRes) {
            // Handle video save error
            if (videoSaveErr) {
              return done(videoSaveErr);
            }

            // Get the video
            agent.get('/api/videos/' + videoSaveRes.body._id)
              .expect(200)
              .end(function (videoInfoErr, videoInfoRes) {
                // Handle video error
                if (videoInfoErr) {
                  return done(videoInfoErr);
                }

                // Set assertions
                (videoInfoRes.body._id).should.equal(videoSaveRes.body._id);
                (videoInfoRes.body.title).should.equal(video.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (videoInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Video.remove().exec(done);
    });
  });
});
