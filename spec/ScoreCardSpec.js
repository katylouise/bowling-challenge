describe("ScoreCard", function() {
  var scorecard;

  beforeEach(function() {
    scorecard = new ScoreCard();
  });

  it("should keep track of the frame", function() {
    expect(scorecard.frame).toEqual(1);
  });

  it("should know there are 10 bowling pins at the start", function() {
    expect(scorecard.pins).toEqual(10);
  });

  it("can return the total for each roll", function() {
    expect(scorecard.scoreForRoll(5)).toEqual(5);
  });

  it("can move to the next frame", function() {
    scorecard.nextFrame();
    expect(scorecard.frame).toEqual(2);
  });

  it("is limited to 10 frames", function() {
    for(var i = 0; i < 10; i++) {
      scorecard.nextFrame();
    }
    expect(scorecard.nextFrame()).toEqual("End of game!");
  });

  it("can move to the next roll", function() {
    scorecard.nextRoll();
    expect(scorecard.roll).toEqual(2);
  });

  it("can return the points for a frame", function() {
    scorecard.scoreForRoll(4);
    scorecard.scoreForRoll(3);
    expect(scorecard.scoreForFrame(1)).toEqual(7);
  });

  it("adds points to scores each roll", function() {
    scorecard.scoreForRoll(4);
    scorecard.scoreForRoll(5);
    expect(scorecard.scores[1]).toEqual([4, 5]);
  });

  it("moves straight to next roll after a strike", function() {
    scorecard.scoreForRoll(10);
    expect(scorecard.roll).toEqual(2);
  });

  it("adds 10 to the scores object after a strike", function() {
    scorecard.scoreForRoll(10);
    expect(scorecard.scores[1]).toEqual([10]);
  });

  it("adds next frame's points as bonus after a strike", function() {
    scorecard.scoreForRoll(10);
    scorecard.nextFrame();
    scorecard.scoreForRoll(3);
    scorecard.scoreForRoll(2);
    scorecard.bonusForStrike();
    expect(scorecard.scores[1]).toEqual([10, 5]);
  });

  it("adds bonus points from next round after a spare", function() {
    scorecard.scoreForRoll(2);
    scorecard.scoreForRoll(8);
    scorecard.nextFrame();
    scorecard.scoreForRoll(5);
    scorecard.bonusForSpare();
    expect(scorecard.scores[1]).toEqual([2, 8, 5]);
  });

  it("adds scores to the running total", function() {
    scorecard.scoreForRoll(3);
    scorecard.scoreForRoll(5);
    scorecard.nextFrame();
    scorecard.scoreForRoll(2);
    scorecard.scoreForRoll(4);
    expect(scorecard.grandTotal()).toEqual(14);
  });

  it("should know how many pins are left to be knocked down", function() {
    scorecard.scoreForRoll(3);
    expect(scorecard.pinsLeft(3)).toEqual(7);
  });

  it("can reset the number of pins", function() {
    scorecard.pinsLeft(4);
    scorecard.resetPins();
    expect(scorecard.pins).toEqual(10);
  });

  it("can tell if previous frame was a strike", function() {
    scorecard.scoreForRoll(10);
    scorecard.nextFrame();
    expect(scorecard.isPreviousFrameStrike()).toBe(true);
  });

  it("can tell if previous frame was a spare", function() {
    scorecard.scoreForRoll(6);
    scorecard.scoreForRoll(4);
    scorecard.nextFrame();
    expect(scorecard.isPreviousFrameSpare()).toBe(true);
  })
});