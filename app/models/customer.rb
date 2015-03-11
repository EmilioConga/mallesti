class Customer
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,      type: String
  field :address,   type: String
  field :town,      type: String
  field :city,      type: String
  field :country,   type: String
  field :zip_code,  type: String
  field :cif,       type: String
  field :email,     type: String
  field :phone,     type: String

  belongs_to :user
  has_many   :projects

  validates :user,    presence: true
  validates :name,    presence: true
  validates :phone,   presence: true
  validates :address, presence: true
  validates :town,    presence: true
  validates :city,    presence: true
  validates :country, presence: true
  validates :cif,     presence: true, uniqueness: {case_sensitive: false, scope: :user}
  validates :email,   presence: true, uniqueness: {case_sensitive: false, scope: :user},
    format: Devise.email_regexp
end
