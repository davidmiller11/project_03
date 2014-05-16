class ChallengesController < ApplicationController

  def index
    @challenges = Challenge.order(score_avg: :desc).limit(10)
  end

  def create
    @challenge = Challenge.new(challenge_params)

    respond_to do |format|
      if @challenge.save
        format.html { redirect_to @challenge, notice: 'Challenge was successfully created.' }
        format.json { render :show, status: :created, location: @challenge }
      else
        format.html { render :new }
        format.json { render json: @challenge.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def challenge_params
      params.require(:challenge).permit(:player_name, :hood_name, :place_type, :score_avg)
    end
end