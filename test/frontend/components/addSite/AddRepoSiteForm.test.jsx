import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import ReduxFormAddRepoSiteForm, { AddRepoSiteForm } from '../../../../frontend/components/AddSite/AddRepoSiteForm';

describe('ReduxForm-enhanced <AddRepoSiteForm />', () => {
  it('exports a Connect\'d ReduxForm-enhanced component', () => {
    const props = {
      showAddNewSiteFields: false,
      onSubmit: spy(),
    };
    const wrapper = shallow(<ReduxFormAddRepoSiteForm {...props} />);
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.find('Connect(Form(AddRepoSiteForm))')).to.have.length(1);
  });
});

describe('<AddRepoSiteForm />', () => {
  it('renders', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: () => {},
      pristine: true,
    };

    const wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper).to.be.defined;
    expect(wrapper.find('GitHubRepoUrlField[name="repoUrl"]')).to.have.length(1);
  });

  it('renders additional fields when showAddNewSiteFields is true', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: () => {},
      pristine: true,
    };

    let wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('Field[name="engine"]')).to.have.length(0);
    expect(wrapper.find('Field[name="defaultBranch"]')).to.have.length(0);

    props.showAddNewSiteFields = true;
    wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('Field[name="engine"]')).to.have.length(1);
    expect(wrapper.find('BranchField').props().required).to.be.true;
  });

  it('makes GitHubRepoUrlField readOnly when showAddNewSiteFields is true', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: () => {},
      pristine: true,
    };

    let wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('GitHubRepoUrlField[name="repoUrl"]').props().readOnly).to.be.false;

    props.showAddNewSiteFields = true;
    wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('GitHubRepoUrlField[name="repoUrl"]').props().readOnly).to.be.true;
  });

  it('disables submit when pristine is true', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: () => {},
      pristine: true,
    };

    let wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('button[type="submit"]').props().disabled).to.be.true;

    props.pristine = false;
    wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('button[type="submit"]').props().disabled).to.be.false;
  });

  it('calls handleSubmit when submitted', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: spy(),
      pristine: false,
    };

    const wrapper = shallow(<AddRepoSiteForm {...props} />);
    wrapper.find('form').simulate('submit');
    expect(props.handleSubmit.calledOnce).to.be.true;
  });

  it('links back to /sites from the Cancel button', () => {
    const props = {
      showAddNewSiteFields: false,
      initialValues: { engine: 'jekyll' },
      handleSubmit: () => {},
      pristine: true,
    };

    const wrapper = shallow(<AddRepoSiteForm {...props} />);
    expect(wrapper.find('Link.usa-button-secondary[to="/sites"]')).to.have.length(1);
  });
});
