const expect = require('chai').expect;
const factory = require('../../support/factory');
const { audit, error } = require('../../../../api/services/EventCreator');

describe('EventCreateor', () => {
  
  it('.audit', (done) => {
    factory.user()
      .then(user => audit('authentication', user, { hi: 'bye' })
        .then((event) => {
          expect(event.type).to.equal('audit');
          expect(event.label).to.equal('authentication');
          expect(event.model).to.equal('User');
          expect(event.modelId).to.equal(user.id);
          expect(event.body.hi).to.equal('bye');
          done();
        }));  
  });

  it('.error', (done) => {
    error('timing', { bye: 'hi' })
      .then((event) => {
        expect(event.type).to.equal('error');
        expect(event.label).to.equal('timing');
        expect(event.model).to.be.null;
        expect(event.modelId).to.be.null;
        expect(event.body.bye).to.equal('hi');
        done();
      });
  });
});
