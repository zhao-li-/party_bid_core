function Bidding(sms_json) {
    var phone = sms_json.messages[0].phone;
    var name = Bidding.get_sms_name(phone);
    var price = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.name = name;
    this.phone = phone;
    this.price = price;
}
Bidding.get_sms_name = function (phone) {
    var sign_up = _.find(Activity.get_active_activity().sign_ups, function (sign_up) {
        return sign_up.phone == phone
    })
    return sign_up.name;
}
Bidding.prototype.save_bidding = function () {
    var bidding = this;
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        if (activity.name == Activity.get_active_activity_name()) {
            _.map(activity.bids, function (bid) {
                if (bid.name == Bid.get_current_bid()) {
                    bid.biddings.push(bidding)
                }
            })
        }
    })
    localStorage.setItem("activities", JSON.stringify(activities));
}
Bidding.not_on_bidding = function () {
    var is_bidding = localStorage.is_bidding;
    if (is_bidding == "false" || is_bidding == "" || !is_bidding) {
        return true;
    }
}
Bidding.has_bid = function (sms_json) {
    var bids = _.find(Activity.get_active_activity().bids, function (bid) {
        return bid.name == Bid.get_current_bid();
    })
    if (_.find(bids.biddings, function (bidding) {
        return bidding.phone == sms_json.messages[0].phone;
    })) {
        return true;
    }
}
Bidding.process_bidding_sms = function (sms_json) {
    if (Bidding.not_on_bidding()) {
        return;
    }
    if (!SignUp.has_signed(sms_json)) {
        return;
    }
    if (Bidding.has_bid(sms_json)) {
        return;
    }
    var bidding = new Bidding(sms_json);
    bidding.save_bidding();
}