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
describe('Video CRUD tests', function () {

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

  it('should not be able to save an video if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/videos')
          .send(video)
          .expect(403)
          .end(function (videoSaveErr, videoSaveRes) {
            // Call the assertion callback
            done(videoSaveErr);
          });

      });
  });

  it('should not be able to save an video if not logged in', function (done) {
    agent.post('/api/videos')
      .send(video)
      .expect(403)
      .end(function (videoSaveErr, videoSaveRes) {
        // Call the assertion callback
        done(videoSaveErr);
      });
  });

  it('should not be able to update an video if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/videos')
          .send(video)
          .expect(403)
          .end(function (videoSaveErr, videoSaveRes) {
            // Call the assertion callback
            done(videoSaveErr);
          });
      });
  });

  it('should be able to get a list of videos if not signed in', function (done) {
    // Create new video model instance
    var videoObj = new Video(video);

    // Save the video
    videoObj.save(function () {
      // Request videos
      request(app).get('/api/videos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single video if not signed in', function (done) {
    // Create new video model instance
    var videoObj = new Video(video);

    // Save the video
    videoObj.save(function () {
      request(app).get('/api/videos/' + videoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', video.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single video with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/videos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Video is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single video which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent video
    request(app).get('/api/videos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No video with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an video if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/videos')
          .send(video)
          .expect(403)
          .end(function (videoSaveErr, videoSaveRes) {
            // Call the assertion callback
            done(videoSaveErr);
          });
      });
  });

  it('should not be able to delete an video if not signed in', function (done) {
    // Set video user
    video.user = user;

    // Create new video model instance
    var videoObj = new Video(video);

    // Save the video
    videoObj.save(function () {
      // Try deleting video
      request(app).delete('/api/videos/' + videoObj._id)
        .expect(403)
        .end(function (videoDeleteErr, videoDeleteRes) {
          // Set message assertion
          (videoDeleteRes.body.message).should.match('User is not authorized');

          // Handle video error error
          done(videoDeleteErr);
        });

    });
  });

  it('should be able to get a single video that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new video
          agent.post('/api/videos')
            .send(video)
            .expect(200)
            .end(function (videoSaveErr, videoSaveRes) {
              // Handle video save error
              if (videoSaveErr) {
                return done(videoSaveErr);
              }

              // Set assertions on new video
              (videoSaveRes.body.title).should.equal(video.title);
              should.exist(videoSaveRes.body.user);
              should.equal(videoSaveRes.body.user._id, orphanId);

              // force the video to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
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
                        should.equal(videoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single video if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new video model instance
    var videoObj = new Video(video);

    // Save the video
    videoObj.save(function () {
      request(app).get('/api/videos/' + videoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', video.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single video, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'videoowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Video
    var _videoOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _videoOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Video
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new video
          agent.post('/api/videos')
            .send(video)
            .expect(200)
            .end(function (videoSaveErr, videoSaveRes) {
              // Handle video save error
              if (videoSaveErr) {
                return done(videoSaveErr);
              }

              // Set assertions on new video
              (videoSaveRes.body.title).should.equal(video.title);
              should.exist(videoSaveRes.body.user);
              should.equal(videoSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
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
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (videoInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
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
