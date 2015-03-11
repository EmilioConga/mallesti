class MainController < ApplicationController   
	skip_before_action :authenticate_user_from_token!
	skip_before_action :authenticate_user!
  def main
    render text: '', layout: 'application'
  end
end
