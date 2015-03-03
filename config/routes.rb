Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'sessions', registrations: 'users'
  }
  devise_scope :user do
    post "/session" => "sessions#create"
  end

  root to: 'main#main'

  # Rutas para los recursos relacionados con Customer
  resources :customers, except: [:new, :edit] do
  # Rutas para los recursos relacionados con Project
    resources :projects, only: [:index, :create]
  end

  resources :projects, only: [:show, :update, :destroy] do
    resources :tasks, only: [:index, :create]
  end

  # Rutas para los recursos relacionados con Task
  resources :tasks, only: [:show, :update, :destroy]
end
