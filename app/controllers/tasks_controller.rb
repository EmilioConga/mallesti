class TasksController < ApplicationController
  respond_to :json

  def show
    @task = Task.find(params[:id])
    respond_with @task
  end

  def index
    @tasks = Project.find(params[:project_id]).tasks
    respond_with @tasks
  end

  def create
    @task = Project.find(params[:project_id]).tasks.create(task_params)
    respond_with @task
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(task_params)
    respond_with @task
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    respond_with @task
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :tag, :estimation)
  end
end
