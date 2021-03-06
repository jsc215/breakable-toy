require 'rails_helper'

def stub_omniauth
  # first, set OmniAuth to run in test mode
  OmniAuth.config.test_mode = true
  # then, provide a set of fake oauth data that
  # omniauth will use when a user tries to authenticate:
  OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
    provider: 'google',
    uid: '12345678910',
    info: {
      email: 'jesse@mountainmantechnologies.com',
      first_name: 'Jesse',
      last_name: 'Spevack'
    },
    credentials: {
      token: 'abcdefg12345',
      refresh_token: '12345abcdefg',
      expires_at: DateTime.now
    }
  })
end

RSpec.feature 'user logs out' do
  scenario 'using google oauth2' do
    stub_omniauth
    visit root_path
    expect(page).to have_link('Sign in with Google')
    click_link 'Sign in with Google'
    expect(page).to have_content('Jesse Spevack')
    expect(page).to have_link('Logout')
    click_link 'Logout'
    expect(page).to have_content('Sign in with Google')
    expect(page).to have_link('Sign in with Google')
  end
end
