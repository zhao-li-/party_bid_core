function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}
Activity.get_activities = function () {
    return JSON.parse(localStorage.getItem("activities")) || {};
}
Activity.get_activity_ids = function () {
    return JSON.parse(localStorage.activity_ids) || [];
}
Activity.get_activity_id_generator = function () {
    return parseInt(localStorage.activity_id_generator);
}
Activity.prototype.create = function () {
    var activities = Activity.get_activities();
    var count = Activity.get_activity_id_generator();
    activities[count] = this;
    localStorage.setItem("activities", JSON.stringify(activities));
    var activity_ids = Activity.get_activity_ids();
    activity_ids.push(count.toString());
    localStorage.setItem("activity_ids", JSON.stringify(activity_ids));
    localStorage.current_activity = count;
    localStorage.activity_id_generator = count + 1;
}
Activity.get_fore_two_string = function (sms_json) {
    return sms_json.messages[0].message.replace(/\s/g, "").substring(0, 2).toUpperCase();
}
Activity.get_current_activity = function () {
    return localStorage.current_activity;
}
Activity.get_this_activity = function (activity_name) {
    var activities = Activity.get_activities();
    return activities[activity_name];
}
Activity.get_current_bid = function () {
    return localStorage.current_bid;
}
Activity.get_current_biddings_in_activity = function () {
    var bid = Activity.get_current_bid();
    return Activity.get_this_activity(Activity.get_current_activity()).biddings[bid];
}
function transform_bids_to_view_model(activity_name) {
    return Activity.get_this_activity(activity_name).bids;
}
function find_winner_bidding(activity_id, bid_name) {
    var biddings = Activity.get_this_activity(activity_id).biddings;
    var bid_price = _.chain(biddings[bid_name])
        .groupBy(function (bidding) {
            return parseInt(bidding.price)
        })
        .map(function (value, key) {
            return{"price": key, "count": value.length}
        })
        .find(function (bidding) {
            return bidding.count == 1;
        })
        .value();
    return _.find(biddings[bid_name], function (bidding) {
        return bidding.price == bid_price.price
    })
}
function transform_biddings_to_view_model(activity_id, bid_name) {
    var winner_bidding = find_winner_bidding(activity_id, bid_name)
    var sign_up = _.find(Activity.get_this_activity(activity_id).sign_ups, function (sign_up) {
        return sign_up.phone == winner_bidding.phone;
    })
    var winner_infos = [];
    var winner_info = {"name": sign_up.name, "phone": winner_bidding.phone, "price": winner_bidding.price}
    winner_infos.push(winner_info);
    return winner_infos;
}