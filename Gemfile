source 'https://rubygems.org'

gem 'rails',   '4.2.0'

# Convertir datos mongoDB en objetos de Ruby
gem 'mongoid', '~> 4.0.1'

# Autenticar usuarios (login, registro, recordar contraseña, confirmar cuenta,
# bloquear cuenta, seguimiento...)
gem 'devise',  '~> 3.4.1'

# Convierte objetos de nuestros modelos en json
gem 'active_model_serializers'

gem 'rack-cors'

# Assets gems
gem 'bootstrap-sass' 
gem 'angular-rails-templates'
source 'https://rails-assets.org' do
  gem 'rails-assets-angular'
  gem 'rails-assets-angular-ui-router'
end

# Estas gemas sólo se usan en el entorno de desarrollo (development)
group :development do
  # Consola para trabajar en el entorno de desarrollo (development) más bonita
  gem 'pry-rails'

  # Precarga rails y hace que los tests tarden menos en empezar
  gem 'spring'
  gem 'spring-commands-rspec'
end

# Estas gemas sólo se usan en el entorno de test
group :test do
  # Framework de testeo para hacer tests de nuestros modelos y controladores
  gem 'rspec-rails'

  # Nos da métodos para ayudarnos a testear los modelos hechos con mongoid
  gem 'mongoid-rspec', '~> 2.1.0'

  # Crear datos de ejemplo en la base de datos
  gem 'factory_girl_rails', group: :development
  # Genera datos falsos que nos van a sevir en nuestras factorías
  gem 'faker',              group: :development
  # Al terminar de pasarse los tests borra la base de datos
  gem 'database_cleaner', '1.3.0'
end
