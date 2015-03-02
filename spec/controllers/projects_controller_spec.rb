require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  set_content_type 'application/json'

  options = [:show, :index, :create, :update, :destroy]
  json_attributes = FactoryGirl.attributes_for(:project).keys

  before :all do
    @user = FactoryGirl.create(:user)
    @model = Project

    # Mis proyectos necesitan un cliente
    customer = FactoryGirl.create(:customer, user: @user)

    # Para el test de show
    @resource = FactoryGirl.create(:project, customer: customer)

    # Para el test de create
    @create_params = {customer_id: customer.id.to_s}

    # Para el test de create y destroy
    @parameters = FactoryGirl.attributes_for(:project, customer_id: customer.id.to_s)

    # Para los test de index
    ## Opciones necesarias para crear la lista de proyectos en el test de index
    @list_options = {customer: customer}
    ## Parámetros que se envían al get :index
    @index_params = {customer_id: customer.id.to_s}
    @first_page_resources = customer.projects

    # Para el test de update
    @update_params = FactoryGirl.attributes_for(:project_update)
  end

  before do
    sign_in @user
  end

  it_behaves_like "a REST controller", options, json_attributes

  context "special feature" do
    let(:customer1){ FactoryGirl.create(:customer, user: @user) }
    let(:customer2){ FactoryGirl.create(:customer, user: @user) }

    context "GET #index" do
      it "returns the correct tasks" do
        projects = FactoryGirl.create_list(:project, 2, customer: customer1)
        FactoryGirl.create_list(:project, 2, customer: customer2)

        get :index, customer_id: customer1.id.to_s
        # Sólo quiero los proyectos de customer1
        expect(assigns(:projects).to_a).to match_array projects
      end
    end

    context "PUT #update" do
      it "should not update #customer_id" do
        project = FactoryGirl.create(:project, customer: customer1)

        put :update, id: project.id, project: { customer_id: customer2.id.to_s }
        project.reload

        expect(project.customer_id).to eql customer1.id
      end
    end
  end
end
