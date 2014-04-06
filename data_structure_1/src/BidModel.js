function Bid(activity_name) {
    var id = Activity.get_this_activity(activity_name).bids.length + 1;
    var name = "竞价" + id;
    this.name = name;
    this.biddings = [];
}
Bid.prototype.create_new_bid = function (activity_name) {
    var bid = this;
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        if (activity.name == Activity.get_this_activity(activity_name).name) {
            activity.bids.unshift(bid);
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities));
}
Bid.get_current_bid = function () {
    return localStorage.current_bid;
}
function transform_bids_to_view_model(activity_name) {
    return Activity.get_this_activity(activity_name).bids;
}
function transform_biddings_to_view_model(activity_name, bid_name) {
    var bid = _.find(transform_bids_to_view_model(activity_name), function (bid) {
        return bid.name == bid_name
    })
    var winner = _.chain(bid.biddings)
        .groupBy(function (biddings) {
            return parseInt(biddings.price)
        })
        .map(function (value, key) {
            return {"price": key, "count": value.length}
        })
        .find(function (biddings) {
            return biddings.count == 1
        })
        .value();
    return _.filter(bid.biddings, function (bidding) {
        return bidding.price == winner.price
    })
}