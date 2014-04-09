function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
}
Bidding.not_on_bidding = function () {
    var is_bidding = localStorage.is_bidding;
    if (is_bidding == "false" || is_bidding == "" || !is_bidding) {
        return true;
    }
}
Bidding.prototype.has_bid = function () {
    var phone = this.phone;
    if (_.find(Bid.get_current_biddings(), function (bidding) {
        return bidding.phone == phone;
    })) {
        return true;
    }
}
Bidding.process_bidding_sms = function (sms_json) {
    var bidding = new Bidding(sms_json);
    if (Bidding.not_on_bidding()) {
        return true;
    }
    if (!SignUp.has_signed(sms_json)) {
        return;
    }
    if (bidding.has_bid()) {
        return;
    }
    var bids = Bid.get_bids();
    _.map(bids, function (bid) {
        if (bid.activity_id == Activity.get_current_activity_id() && bid.name == Bid.get_current_bid()) {
            bid.biddings.push(bidding);
        }
    })
    localStorage.setItem("bids", JSON.stringify(bids));
}
Bidding.get_winner_bidding = function(activity_id,bid_name){
    var bid = _.find(Bid.get_bids(), function (bid) {
        return bid.activity_id == activity_id && bid.name == bid_name;
    })
    var bid_price = _.chain(bid.biddings)
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
    return _.find(bid.biddings, function (bidding) {
        return bidding.price == bid_price.price
    })
}
Bidding.render_biddings = function (activity_id, bid_name) {
    var winner_bidding=Bidding.get_winner_bidding(activity_id,bid_name)
    var sign_up = _.find(SignUp.get_sign_ups(), function (sign_up) {
        return sign_up.phone == winner_bidding.phone && sign_up.activity_id == activity_id;
    })
    var winner_infos = [];
    var winner_info = {"name": sign_up.name, "phone": winner_bidding.phone, "price": winner_bidding.price}
    winner_infos.push(winner_info);
    return winner_infos;
}