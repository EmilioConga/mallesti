require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  set_content_type 'application/json'

  options = [:show, :index, :create, :update, :destroy]
  json_attributes = FactoryGirl.attributes_for(:task).keys

  before :all do
    @user = FactoryGirl.create(:user)
    @model = Task


    # Mis tareas necesitan un proyecto
    @customer = FactoryGirl.create(:customer, user: @user)
    project = FactoryGirl.create(:project, customer: @customer)
    # Para el test de show
    @resource = FactoryGirl.create(:task, project: project)

    # Para el test de create
    @create_params = {project_id: project.id.to_s}

    # Para el test de index
    ## Opciones necesarias para crear la lista de tasks en el test de index
    @list_options = {project: project}
    ## Parámetros que se envían al get :index
    @index_params = {project_id: project.id.to_s}
    @first_page_resources = project.tasks

    # Para el test de create y destroy
    @parameters = FactoryGirl.attributes_for(:task, project_id: project.id.to_s)

    # Para el test de update
    @update_params = FactoryGirl.attributes_for(:task_update)
  end

  before do
    sign_in @user
  end

  it_behaves_like "a REST controller", options, json_attributes

  context "special feature" do
    let(:project1){ FactoryGirl.create(:project, customer: @customer) }
    let(:project2){ FactoryGirl.create(:project, customer: @customer) }

    context "GET #index" do
      it "returns the correct tasks" do
        tasks = FactoryGirl.create_list(:task, 2, project: project1)
        FactoryGirl.create_list(:task, 2, project: project2)

        get :index, project_id: project1.id.to_s
        expect(assigns(:tasks).to_a).to match_array tasks
      end
    end

    context "PUT #update" do
      it "should not update #project_id" do
        task = FactoryGirl.create(:task, project: project1)

        put :update, id: task.id, task: { project_id: project2.id.to_s }
        task.reload

        expect(task.project_id).to eql project1.id
      end
    end
  end
end
